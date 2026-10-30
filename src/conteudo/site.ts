/*
  Contatos da AR Store.

  WhatsApp: país + DDD + número, só dígitos. Para trocar, edite NUMERO_WHATSAPP
  (ou defina VITE_WHATSAPP_NUMBER na Vercel). Se ficar vazio, os botões levam ao Instagram.
*/
const NUMERO_WHATSAPP = '5511937377348'

const numero = (NUMERO_WHATSAPP || import.meta.env.VITE_WHATSAPP_NUMBER || '').replace(/\D/g, '')

export const site = {
  nome: 'AR Store',
  nomeCompleto: 'AR | Aline Ribeiro Store',
  instagram: 'https://www.instagram.com/arstore.alineribeiro_/',
  arroba: '@arstore.alineribeiro_',
  whatsapp: numero,
  horario: 'Segunda a sexta, das 9h às 17h',
} as const

export const temWhatsApp = /^\d{10,15}$/.test(site.whatsapp)

export const mensagens = {
  geral: 'Oi! Vim pelo site da AR Store e queria conhecer as peças ✨',
  servico: (item: string) => `Oi! Vim pelo site e queria saber mais sobre: ${item}.`,
  inspiracao: (titulo: string) => `Oi! Vi a peça "${titulo}" no site da AR Store. Ainda tem disponível?`,
  cor: (estilo: string) => `Oi! Hoje eu quero um brilho ${estilo} ✨ Quais peças vocês têm?`,
} as const

/** Link de conversa: WhatsApp quando o número existe; senão, o Instagram. */
export function linkConversa(texto: string = mensagens.geral) {
  return temWhatsApp ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(texto)}` : site.instagram
}

/** Número para exibir: (11) 93737-7348. */
export const telefoneVisivel = temWhatsApp
  ? site.whatsapp.replace(/^55/, '').replace(/^(\d{2})(\d{4,5})(\d{4})$/, '($1) $2-$3')
  : ''

export const canalConversa = temWhatsApp ? 'WhatsApp' : 'Instagram'
