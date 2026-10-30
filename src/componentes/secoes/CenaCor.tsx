import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { cores } from '../../conteudo/textos'
import { foto } from '../../conteudo/fotos'
import { linkConversa, mensagens } from '../../conteudo/site'
import { useMovimento } from '../../hooks/useMovimento'
import { ease } from '../../lib/ease'
import { Joia } from '../ui/Joia'
import { Brilho, reflexo } from '../ui/Pecas'

const H = cores.humores
/* Onde cada brilho assume a tela (fração da rolagem da cena). */
const TROCA = [[.58, .62], [.70, .74], [.82, .86]] as const
const faixas = [0, TROCA[0][0], TROCA[0][1], TROCA[1][0], TROCA[1][1], TROCA[2][0], TROCA[2][1], 1]
const serie = (k: 'fundo' | 'tinta' | 'pedra'): string[] => [H[0][k], H[0][k], H[1][k], H[1][k], H[2][k], H[2][k], H[3][k], H[3][k]]
const limpa = (p: string) => p.replace('.', '')

/** Versão sem animação: os quatro brilhos lado a lado. */
function Estatica() {
  return <section id="brilho" className="secao cor-estatica escuro" aria-labelledby="cores-titulo">
    <div className="conteiner">
      <p className="selo-texto">{cores.selo}</p>
      <h2 id="cores-titulo" className="titulo">{cores.frase} {cores.frase2}…</h2>
      <ul className="cor-estatica-lista">
        {H.map(h => { const f = foto(h.foto); return <li key={h.palavra} style={{ background: h.fundo, color: h.tinta }}>
          <img src={f.src} alt={f.alt} width={f.w} height={f.h} loading="lazy" />
          <div><em>{h.palavra}</em><p>{h.nome} · {h.nota}</p>
            <a className="link-seta" href={linkConversa(mensagens.cor(limpa(h.palavra)))} target="_blank" rel="noopener noreferrer">{cores.cta}<ArrowUpRight aria-hidden="true" /></a></div>
        </li> })}
      </ul>
    </div>
  </section>
}

/**
  Cena do brilho (rolagem presa à tela):
  o pingente desce na corrente, balança, gira, a pedra cintila e a luz dela toma a tela.
  Depois, quatro brilhos trocam a cor da tela, da pedra e da foto.
*/
export function CenaCor() {
  const { reduzido } = useMovimento()
  const cena = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: cena, offset: ['start start', 'end end'] })
  const p = useSpring(scrollYProgress, { stiffness: 150, damping: 30, mass: .4 })

  const yJoia = useTransform(p, [0, .12], ['-75%', '0%'])
  const balanco = useTransform(p, [0, .12, .18, .24, .3, .4, 1], [-14, 8, -5, 3, 0, 0, 2])
  const giro = useTransform(p, [.27, .3, .33, .36, .39], [1, .06, 1, .06, 1])
  const cintila = useTransform(p, [.36, .41, .45, .5], [0, 1.25, .8, 0])
  const enche = useTransform(p, [.4, .53], [0, 165])
  const clipPath = useTransform(enche, v => `circle(${v.toFixed(2)}% at var(--cx) var(--cy))`)
  const fundo = useTransform(p, faixas, serie('fundo'))
  const tinta = useTransform(p, faixas, serie('tinta'))
  const pedra = useTransform(p, faixas, serie('pedra'))
  const dicaOp = useTransform(p, [0, .08, .2, .26], [0, 1, 1, 0])
  const barra = useTransform(p, [.5, .95], [0, 1])

  const [i, setI] = useState(0)
  const [coberta, setCoberta] = useState(false)
  useMotionValueEvent(p, 'change', v => {
    setI(v < TROCA[0][0] + .02 ? 0 : v < TROCA[1][0] + .02 ? 1 : v < TROCA[2][0] + .02 ? 2 : 3)
    setCoberta(v > .47)
  })

  if (reduzido) return <Estatica />
  const h = H[i]
  const f = foto(h.foto)

  return <section id="brilho" className="cor" aria-labelledby="cores-rotulo">
    <h2 id="cores-rotulo" className="visualmente-oculto">{cores.frase} {cores.frase2}: {H.map(x => x.palavra).join(' ')}</h2>
    <div ref={cena} className="cor-cena">
      <div className="cor-palco">
        <div className="conteiner cor-grade cor-base">
          <div className="cor-letreiro">
            <p className="selo-texto">{cores.selo}</p>
            <p className="cor-frase" aria-hidden="true">
              <span>{cores.frase}</span><span>{cores.frase2}</span>
              <span className="cor-palavra-caixa"><em>{H[0].palavra}</em></span>
            </p>
          </div>
          <motion.p className="cor-dica" style={{ opacity: dicaOp }}><i aria-hidden="true" />{cores.dica}</motion.p>
        </div>

        <motion.div className="cor-enchente" style={{ clipPath, backgroundColor: fundo, color: tinta }}>
          <div className="conteiner cor-grade">
            <div className="cor-letreiro">
              <p className="selo-texto">{cores.selo}</p>
              <p className="cor-frase" aria-hidden="true">
                <span>{cores.frase}</span><span>{cores.frase2}</span>
                <span className="cor-palavra-caixa">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.em key={h.palavra} initial={{ y: '100%', opacity: 0, rotate: 4 }} animate={{ y: '0%', opacity: 1, rotate: 0 }}
                      exit={{ y: '-100%', opacity: 0, rotate: -4 }} transition={{ duration: .8, ease: ease.expo }}>{h.palavra}</motion.em>
                  </AnimatePresence>
                </span>
              </p>
              <motion.div className="cor-detalhe" animate={{ opacity: coberta ? 1 : 0, y: coberta ? 0 : 16 }} transition={{ duration: .8, ease: ease.expo }}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p key={h.nome} className="cor-nota" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .4 }}>
                    <strong>{h.nome}</strong> {h.nota}
                  </motion.p>
                </AnimatePresence>
                <a className="cor-cta" href={linkConversa(mensagens.cor(limpa(h.palavra)))} target="_blank" rel="noopener noreferrer" tabIndex={coberta ? 0 : -1}>
                  {cores.cta}<ArrowUpRight aria-hidden="true" />
                </a>
                <div className="cor-marcador" aria-hidden="true">
                  {H.map((x, k) => <span key={x.palavra} className={k === i ? 'is-ativo' : ''} style={{ background: x.pedra }} />)}
                  <small>{String(i + 1).padStart(2, '0')} / 04</small>
                </div>
              </motion.div>
            </div>

            <motion.div className="cor-foto" animate={{ opacity: coberta ? 1 : 0, scale: coberta ? 1 : .85, rotate: coberta ? -4 : -12 }}
              transition={{ duration: 1.1, ease: ease.expo }}>
              <AnimatePresence initial={false}>
                <motion.div key={f.id} className="arco cor-arco" onPointerMove={reflexo}
                  initial={{ clipPath: 'inset(0% 0% 100% 0%)' }} animate={{ clipPath: 'inset(0% 0% 0% 0%)' }} exit={{ opacity: 0 }}
                  transition={{ duration: .9, ease: ease.quint }}>
                  <img src={f.src} alt={f.alt} width={f.w} height={f.h} decoding="async" />
                </motion.div>
              </AnimatePresence>
              <Brilho className="cor-foto-brilho anima" />
            </motion.div>
          </div>
          <motion.span className="cor-barra" style={{ scaleX: barra, backgroundColor: tinta }} aria-hidden="true" />
        </motion.div>

        <motion.div className="cor-joia" style={{ y: yJoia, rotate: balanco }} aria-hidden="true">
          <Joia pedra={pedra} giro={giro} cintila={cintila} />
        </motion.div>
      </div>
    </div>
  </section>
}
