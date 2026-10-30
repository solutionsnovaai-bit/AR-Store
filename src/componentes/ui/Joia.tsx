import { useId } from 'react'
import { motion, type MotionValue } from 'motion/react'

/* Pingente de coração lapidado numa corrente veneziana (viewBox 0 0 240 440). A corrente sobe para fora da cena. */
const CORACAO = 'M120 372C60 330 40 292 48 258C56 226 92 212 120 244C148 212 184 226 192 258C200 292 180 330 120 372Z'
const CENTRO = { x: 120, y: 286 }
const BORDA: [number, number][] = [[48, 258], [58, 234], [82, 220], [106, 226], [120, 244], [134, 226], [158, 220], [182, 234], [192, 258], [187, 292], [168, 322], [145, 348], [120, 372], [95, 348], [72, 322], [53, 292]]
const TONS = ['rgb(255 255 255 / .55)', 'rgb(0 0 0 / .14)', 'rgb(255 255 255 / .18)', 'rgb(0 0 0 / .26)', 'rgb(255 255 255 / .38)', 'rgb(0 0 0 / .06)']
const FACETAS = BORDA.map(([x, y], i) => {
  const [x2, y2] = BORDA[(i + 1) % BORDA.length]
  return { d: `M${CENTRO.x} ${CENTRO.y}L${x} ${y}L${x2} ${y2}Z`, fill: TONS[i % TONS.length] }
})
const MESA = 'M120 322C96 306 88 292 91 279C94 267 108 262 120 274C132 262 146 267 149 279C152 292 144 306 120 322Z'
const ELOS = Array.from({ length: 64 }, (_, i) => 214 - i * 14)

type Props = {
  pedra: MotionValue<string> | string
  /** Escala horizontal do pingente: simula o giro (1 = de frente). */
  giro?: MotionValue<number>
  /** 0 → 1: o brilho acende na pedra. */
  cintila?: MotionValue<number>
  className?: string
}

export const JOIA = { w: 240, h: 440, centro: CENTRO } as const

export function Joia({ pedra, giro, cintila, className = '' }: Props) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '')
  return <svg className={`joia ${className}`} viewBox="0 0 240 440" aria-hidden="true" focusable="false" overflow="visible">
    <defs>
      <clipPath id={`${id}c`}><path d={CORACAO} /></clipPath>
      <linearGradient id={`${id}p`} x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stopColor="#ffffff" /><stop offset=".35" stopColor="#c9cdd3" /><stop offset=".6" stopColor="#f7f8fa" /><stop offset="1" stopColor="#9da2aa" />
      </linearGradient>
      <radialGradient id={`${id}l`} cx=".35" cy=".3" r=".8">
        <stop offset="0" stopColor="#fff" stopOpacity=".7" /><stop offset=".5" stopColor="#fff" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* corrente veneziana */}
    <g className="joia-corrente">
      {ELOS.map(y => <rect key={y} x="117.5" y={y - 5} width="5" height="9" rx="1.2" />)}
    </g>
    <circle cx="120" cy="226" r="9" fill="none" stroke={`url(#${id}p)`} strokeWidth="4" />

    <motion.g style={{ scaleX: giro, originX: '120px', originY: '290px' }}>
      {/* pedra lapidada */}
      <g clipPath={`url(#${id}c)`}>
        <motion.path d={CORACAO} style={{ fill: pedra }} />
        {FACETAS.map((f, i) => <path key={i} d={f.d} fill={f.fill} />)}
        <path d={MESA} fill="rgb(255 255 255 / .22)" stroke="rgb(255 255 255 / .6)" strokeWidth="1" />
        <path d={CORACAO} fill={`url(#${id}l)`} />
      </g>
      {/* aro e garras de prata */}
      <path d={CORACAO} fill="none" stroke={`url(#${id}p)`} strokeWidth="5" strokeLinejoin="round" />
      <path d={CORACAO} fill="none" stroke="rgb(0 0 0 / .18)" strokeWidth="1" transform="translate(0 1.5)" />
      {[[56, 244], [184, 244], [120, 366], [120, 250]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="5.5" fill={`url(#${id}p)`} />)}
    </motion.g>

    {/* cintilância */}
    {cintila && <motion.g style={{ scale: cintila, opacity: cintila, originX: '150px', originY: '262px' }}>
      <path className="joia-estrela" d="M150 222C152 252 158 258 190 262C158 266 152 272 150 302C148 272 142 266 110 262C142 258 148 252 150 222Z" />
    </motion.g>}
  </svg>
}
