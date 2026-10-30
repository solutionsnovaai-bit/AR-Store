import { useLayoutEffect, useRef } from 'react'
import { animate, stagger } from 'motion/react'
import { Brilho, Marca } from '../ui/Pecas'
import { foto } from '../../conteudo/fotos'

/** Toda carga da página roda a abertura inteira. Com movimento reduzido, a mesma sequência vem calma (sem voo). */
export type ModoAbertura = 'completa' | 'calma'

export function modoAbertura(reduzido: boolean): ModoAbertura {
  return reduzido ? 'calma' : 'completa'
}

const espera = (s: number) => new Promise<void>(r => window.setTimeout(r, s * 1000))
export const LOGO = '/marca/logo-ar.webp'
/* Posição da estrelinha do logo (fração da imagem): de onde a luz se espalha. */
const ESTRELA = { x: .717, y: .035 }

type Props = { modo: ModoAbertura; onSaida: () => void; onFim: () => void }

/*
  Abertura "o logo se formando" (~4,5 s, em toda carga da página).
  1. Sobre o rosa da marca, a silhueta do logo aparece apagada.
  2. O logo rose gold se forma da esquerda para a direita conforme o site carrega (é a barra de carregamento de verdade).
  3. Um reflexo passa pelo metal, a estrelinha acende e a luz dela cobre a tela.
  4. O nome aparece; a cortina sobe e o nome voa até o topo do site.
*/
export default function Abertura({ modo, onSaida, onFim }: Props) {
  const raiz = useRef<HTMLDivElement>(null)
  const palco = useRef<HTMLDivElement>(null)
  const logo = useRef<HTMLDivElement>(null)
  const luz = useRef<HTMLSpanElement>(null)
  const estrela = useRef<HTMLSpanElement>(null)
  const contador = useRef<HTMLSpanElement>(null)
  const cortina = useRef<HTMLDivElement>(null)
  const voo = useRef<HTMLDivElement>(null)
  const marca = useRef<HTMLDivElement>(null)
  const pular = useRef<() => void>(() => {})

  useLayoutEffect(() => {
    const completa = modo === 'completa'
    let cancelado = false
    let terminou = false
    const E = [0.16, 1, 0.3, 1] as const

    const encerrar = () => {
      if (terminou) return
      terminou = true
      onSaida()
      onFim()
    }
    pular.current = () => { cancelado = true; encerrar() }

    /* Carregamento real: fontes, o logo e a foto do topo. */
    const img = (src: string) => { const i = new Image(); i.src = src; return i.decode().catch(() => undefined) }
    const tarefas: Promise<unknown>[] = [
      document.fonts?.load('500 64px "Bodoni Moda"') ?? Promise.resolve(),
      document.fonts?.load('italic 400 64px "Bodoni Moda"') ?? Promise.resolve(),
      document.fonts?.load('600 16px Manrope') ?? Promise.resolve(),
      img(LOGO),
      img(foto(10).src),
    ]
    let feitas = 0
    let progresso = 0
    let formando = false
    const mostrar = (v: number) => { if (contador.current) contador.current.textContent = String(Math.round(v)).padStart(3, '0') }
    const desenhar = (v: number) => {
      const l = logo.current
      if (!l) return
      l.style.setProperty('--rev', `${(-14 + v * 1.28).toFixed(2)}%`)
      l.style.setProperty('--desfoque', `${((1 - v / 100) * 6).toFixed(2)}px`)
    }
    const nivel = (alvo: number, dur = .9) => {
      if (!formando) return
      const de = progresso
      progresso = alvo
      animate(de * 100, alvo * 100, { duration: dur, ease: [0.3, 0, 0.2, 1], onUpdate: v => { mostrar(v); desenhar(v) } })
    }
    const carregado = Promise.race([
      Promise.all(tarefas.map(t => Promise.resolve(t).catch(() => undefined).then(() => { feitas++; nivel(Math.max(.18, feitas / tarefas.length) * .86) }))),
      espera(6),
    ])
    desenhar(0)

    const medirVoo = () => {
      const v = voo.current, m = marca.current
      const alvo = document.querySelector<HTMLElement>('[data-alvo-marca] .marca')
      if (!v || !m || !alvo) return null
      const W = m.offsetWidth, H = m.offsetHeight
      const R = alvo.getBoundingClientRect()
      const x0 = (innerWidth - W) / 2, y0 = (innerHeight - H) / 2
      v.style.transform = `translate(${x0}px, ${y0}px)`
      return { x0, y0, x1: R.left, y1: R.top + (R.height - H * (R.width / W)) / 2, s1: R.width / W }
    }

    /* Se a página abriu numa aba em segundo plano, a abertura espera a pessoa chegar para começar. */
    const visivel = () => document.hidden
      ? new Promise<void>(r => { const f = () => { if (!document.hidden) { document.removeEventListener('visibilitychange', f); r() } }; document.addEventListener('visibilitychange', f) })
      : Promise.resolve()

    const roda = async () => {
      const letras = marca.current?.querySelectorAll('.marca-l') ?? []
      await visivel()
      if (cancelado) return
      {
        /* 1. A silhueta do logo aparece. */
        animate(logo.current!, { opacity: [0, 1], scale: [.94, 1] }, { duration: 1.1, ease: E })
        animate(palco.current!.querySelectorAll('.ab-texto'), { opacity: [0, 1], y: [10, 0] }, { duration: .8, delay: stagger(.1, { startDelay: .35 }), ease: E })
        /* 2. O logo se forma conforme o site carrega. */
        await espera(.5)
        if (cancelado) return
        formando = true
        nivel(Math.max(.18, feitas / tarefas.length) * .86, 1.1)
        await Promise.all([espera(1.3), carregado])
        if (cancelado) return
        nivel(1, .6)
        await espera(.65)
        if (cancelado) return
        /* 3. O reflexo passa pelo metal e a estrelinha acende. */
        animate(luz.current!, { x: ['-130%', '230%'] }, { duration: .9, ease: [0.6, 0, 0.3, 1] })
        animate(estrela.current!, { scale: [0, 1.6, 1], rotate: [0, 90, 135], opacity: [0, 1, 1] }, { duration: .8, delay: .25, ease: E })
        await espera(.8)
        if (cancelado) return
        cortina.current!.style.visibility = 'visible'
        if (completa) {
          const r = estrela.current!.getBoundingClientRect()
          const cx = r.left + r.width / 2, cy = r.top + r.height / 2
          const raioFinal = Math.hypot(Math.max(cx, innerWidth - cx), Math.max(cy, innerHeight - cy)) + 40
          animate(cortina.current!, { clipPath: [`circle(0px at ${cx}px ${cy}px)`, `circle(${raioFinal}px at ${cx}px ${cy}px)`] }, { duration: 1.05, ease: [0.7, 0, 0.2, 1] })
          animate(palco.current!, { scale: [1, .9], opacity: [1, 0] }, { duration: .7, delay: .25, ease: [0.5, 0, 0.75, 0] })
        } else {
          animate(cortina.current!, { opacity: [0, 1] }, { duration: .7, ease: 'easeOut' })
          animate(palco.current!, { opacity: [1, 0] }, { duration: .6, ease: 'easeOut' })
        }
        await espera(.55)
      }
      if (cancelado) return

      /* 4. O nome aparece sobre a luz. */
      let medida = medirVoo()
      voo.current!.style.visibility = 'visible'
      await (completa
        ? animate(letras, { y: ['0.6em', '0em'], opacity: [0, 1], filter: ['blur(10px)', 'blur(0px)'] }, { duration: .9, delay: stagger(.03), ease: E })
        : animate(letras, { opacity: [0, 1] }, { duration: .7, delay: stagger(.02), ease: 'easeOut' })).finished
      if (cancelado) return
      await espera(.4)
      if (cancelado) return

      if (!completa) {
        onSaida()
        raiz.current?.classList.add('is-saindo')
        await animate(raiz.current!, { opacity: [1, 0] }, { duration: .7, ease: 'easeOut' }).finished
        if (!cancelado) encerrar()
        return
      }

      /* 5. A cortina sobe e o nome voa até o topo. */
      medida = medirVoo() ?? medida
      onSaida()
      raiz.current?.classList.add('is-saindo')
      const dur = 1.2
      animate(cortina.current!, { y: ['0%', '-115%'] }, { duration: dur, ease: [0.76, 0, 0.24, 1] })
      if (medida) {
        const { x0, y0, x1, y1, s1 } = medida
        animate(voo.current!, { x: [x0, x1] }, { duration: dur, ease: [0.72, 0, 0.22, 1] })
        animate(voo.current!, { y: [y0, y1] }, { duration: dur, ease: [0.5, 0, 0.18, 1] })
        animate(marca.current!, { scale: [1, s1], color: ['#fff7f5', '#3b2226'] }, { duration: dur, ease: [0.62, 0, 0.2, 1] })
        animate(marca.current!.querySelector('.marca-e')!, { color: ['#fff7f5', '#b2675a'] }, { duration: dur, ease: [0.62, 0, 0.2, 1] })
      }
      await espera(dur)
      if (!cancelado) encerrar()
    }

    roda().catch(() => encerrar())
    return () => { cancelado = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div ref={raiz} className="abertura">
    <div className="ab-fundo" aria-hidden="true" />
    <div ref={palco} className="ab-palco" aria-hidden="true">
      <div ref={logo} className="ab-logo" style={{ opacity: 0 }}>
        <img className="ab-logo-sombra" src={LOGO} alt="" width={1046} height={734} />
        <div className="ab-logo-forma">
          <img src={LOGO} alt="" width={1046} height={734} />
          <span ref={luz} className="ab-luz" />
        </div>
        <span ref={estrela} className="ab-estrela" style={{ left: `${ESTRELA.x * 100}%`, top: `${ESTRELA.y * 100}%` }}><Brilho /></span>
      </div>
      <p className="ab-texto ab-contador"><span ref={contador}>000</span><small>%</small></p>
      <p className="ab-texto ab-legenda">preparando o seu brilho</p>
    </div>

    <div ref={cortina} className="ab-cortina" aria-hidden="true" style={{ visibility: 'hidden' }} />

    <div ref={voo} className="ab-voo" aria-hidden="true" style={{ visibility: 'hidden' }}>
      <div ref={marca} className="ab-marca"><Marca letras /></div>
    </div>

    <button className="ab-pular" type="button" onClick={() => pular.current()}>Pular abertura</button>
  </div>
}
