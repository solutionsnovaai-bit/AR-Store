export type Categoria = 'Colares' | 'Pulseiras' | 'Brincos' | 'Anéis' | 'Embalagem' | 'Aline'

export interface Foto { id: number; titulo: string; categoria: Categoria; alt: string; src: string; w: number; h: number }

/** Fotos enviadas pela loja (WebP). */
export const fotos: Foto[] = [
  { id: 1, titulo: 'Colar Coração Cristal', categoria: 'Colares', alt: 'Colar de corrente veneziana com pingente de coração em cristal', src: '/fotos/01-colar-coracao-cristal.webp', w: 936, h: 1038 },
  { id: 2, titulo: 'Pulseira Coração Cristal', categoria: 'Pulseiras', alt: 'Pulseira ajustável com coração cravejado de cristais', src: '/fotos/02-pulseira-coracao-cristal.webp', w: 899, h: 995 },
  { id: 3, titulo: 'Pulseira Pedra Pink', categoria: 'Pulseiras', alt: 'Pulseira ajustável com pedra oval pink', src: '/fotos/03-pulseira-pedra-pink.webp', w: 943, h: 1040 },
  { id: 4, titulo: 'Pulseira Trevos', categoria: 'Pulseiras', alt: 'Pulseira ajustável com três trevos sobre porta-joias rosa', src: '/fotos/04-pulseira-trevos.webp', w: 922, h: 1000 },
  { id: 5, titulo: 'Bracelete Corações', categoria: 'Pulseiras', alt: 'Bracelete aberto com dois corações de cristal em veludo', src: '/fotos/05-bracelete-coracoes.webp', w: 883, h: 1019 },
  { id: 6, titulo: 'Argolas Coração Azul', categoria: 'Brincos', alt: 'Brincos de argola cravejada com coração azul-água', src: '/fotos/06-brincos-coracao-azul.webp', w: 887, h: 1020 },
  { id: 7, titulo: 'Argolinhas Coração', categoria: 'Brincos', alt: 'Argolinhas cravejadas com pingente de coração em cristal', src: '/fotos/07-argolas-coracao.webp', w: 911, h: 1017 },
  { id: 8, titulo: 'Anel Gota', categoria: 'Anéis', alt: 'Anel de bolinhas com pedra em gota sobre caixinha rosa', src: '/fotos/08-anel-gota.webp', w: 885, h: 846 },
  { id: 9, titulo: 'Cada pedido embalado com excelência', categoria: 'Embalagem', alt: 'Sacola, caixa e saquinho personalizados da AR Store', src: '/fotos/09-embalagem-ar-store.webp', w: 1200, h: 1200 },
  { id: 10, titulo: 'Aline Ribeiro', categoria: 'Aline', alt: 'Aline Ribeiro, da AR Store, sorrindo de camisa branca', src: '/fotos/10-aline-ribeiro.webp', w: 900, h: 1200 },
]

export const foto = (id: number) => fotos.find(f => f.id === id)!

/** Peças da coleção (sem a embalagem e a foto da Aline). */
export const trabalhos = fotos.filter(f => f.categoria !== 'Embalagem' && f.categoria !== 'Aline')

export const categorias = ['Todas', 'Colares', 'Pulseiras', 'Brincos', 'Anéis'] as const
export type Filtro = (typeof categorias)[number]
