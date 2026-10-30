/* Todos os textos do site num lugar só. Nada de preço, endereço ou avaliação inventados. */

export const navegacao = [
  { href: '#essencia', rotulo: 'Essência' },
  { href: '#qualidade', rotulo: 'Qualidade' },
  { href: '#brilho', rotulo: 'Brilho' },
  { href: '#pecas', rotulo: 'Peças' },
  { href: '#pedido', rotulo: 'Pedido' },
] as const

export const hero = {
  selo: 'Semijoias banhadas a prata',
  linhas: ['Brilho em', 'todos os'],
  destaque: 'momentos.',
  texto: 'Peças delicadas, com banho de prata e verniz alemão, embaladas com carinho e enviadas para todo o Brasil.',
  cta: 'Quero minha peça',
  secundario: 'Ver as peças',
  chips: ['Banho de prata', 'Verniz alemão', 'Envio para todo o Brasil'],
  legenda: 'Brilho e essência',
  legenda2: 'em cada detalhe.',
  anel: 'AR STORE ✦ SEMIJOIAS BANHADAS A PRATA ✦ ',
}

export const faixa = {
  laca: ['Colares', 'Pulseiras', 'Brincos', 'Anéis', 'Berloques', 'Tornozeleiras', 'Piercings fake'],
  noite: ['Banho de prata', 'Verniz alemão', 'Livre de níquel', 'Envio para todo o Brasil'],
}

export const vitrine = {
  selo: 'Delicadeza que acompanha você',
  titulo: 'Peças que brilham',
  destaque: 'com você.',
  texto: 'Arraste para o lado, passe o mouse para ver de perto e toque na foto para ampliar.',
}

export const manifesto = {
  selo: 'Nossa essência',
  texto: 'Aqui, cada detalhe importa. Cada peça é preparada com muito carinho, cuidado e atenção, para que você receba não apenas uma semijoia, mas toda a experiência especial que merece.',
  destaques: 4,
  assinatura: 'AR | Aline Ribeiro Store',
}

export const cores = {
  selo: 'Escolha o seu brilho',
  frase: 'Hoje eu quero',
  frase2: 'um brilho',
  dica: 'Role para fazer a joia brilhar',
  cta: 'Quero esse brilho',
  humores: [
    { palavra: 'delicado.', nome: 'Coração cristal', nota: 'O clássico que combina com tudo: corrente fina e um coração de luz.', foto: 1, fundo: '#f6dcdc', tinta: '#3b2226', pedra: '#eef3f8' },
    { palavra: 'intenso.', nome: 'Pedra pink', nota: 'Um toque de cor que não passa despercebido.', foto: 3, fundo: '#a3174f', tinta: '#fff4f6', pedra: '#e3196f' },
    { palavra: 'único.', nome: 'Coração azul', nota: 'Argolas cravejadas com um coração azul-água.', foto: 6, fundo: '#2d7f88', tinta: '#effbfb', pedra: '#8fdce0' },
    { palavra: 'romântico.', nome: 'Corações em par', nota: 'Bracelete aberto com dois corações, leve e cheio de sentido.', foto: 5, fundo: '#6b2a40', tinta: '#fdeef3', pedra: '#f6d7e1' },
  ],
} as const

export const cuidados = {
  selo: 'Nosso banho de prata',
  titulo: 'Qualidade que',
  destaque: 'você sente.',
  texto: 'Nossas peças são produzidas com materiais metálicos, como o latão, e passam pela galvanoplastia, onde recebem uma camada de prata. A quantidade varia de acordo com o tipo de peça e o seu uso.',
  agendar: 'Quero conhecer as peças',
  itens: [
    { numero: '70', titulo: 'Pulseiras para berloques', texto: '70 milésimos de prata. Os milésimos são a quantidade de metal precioso depositada na superfície da semijoia, um dos fatores da qualidade e da durabilidade do banho.', tags: ['70 milésimos'], foto: 4 },
    { numero: '50', titulo: 'Colares, pulseiras e anéis', texto: '50 milésimos de prata em pulseiras, colares, tornozeleiras, berloques e anéis.', tags: ['50 milésimos'], foto: 1 },
    { numero: '30', titulo: 'Brincos e piercings fake', texto: '30 milésimos de prata em brincos e piercings fake.', tags: ['30 milésimos'], foto: 7 },
    { numero: '✦', titulo: 'Verniz alemão', texto: 'Depois do banho, as peças recebem uma camada de verniz alemão, que dá brilho e protege o acabamento. É hipoalergênico e livre de níquel, conforme as especificações do fabricante.', tags: ['Hipoalergênico', 'Livre de níquel'], foto: 8 },
  ],
} as const

export const galeria = {
  selo: 'A coleção',
  titulo: 'Escolha a sua',
  destaque: 'próxima peça.',
  texto: 'Gostou de alguma? Toque na foto e chame no WhatsApp para saber a disponibilidade.',
  contagem: 'peças da coleção',
  mais: 'Ver todas as peças',
  menos: 'Mostrar menos',
  pedir: 'Quero esta peça',
}

export const equipe = {
  selo: 'Quem cuida do seu pedido',
  titulo: 'Feito com',
  destaque: 'carinho.',
  texto: 'Por trás da AR Store está a Aline Ribeiro. Cada pedido é separado, conferido e embalado com atenção, para chegar até você do jeito que você merece.',
  palavra: 'Aline',
  valores: [
    { titulo: 'Embalagem personalizada', texto: 'Sacola, caixinha e saquinho com a marca AR | Aline Ribeiro Store.' },
    { titulo: 'Mais proteção', texto: 'A sua semijoia viaja bem guardada e chega protegida.' },
    { titulo: 'Amor e cuidado', texto: 'Cada pedido é preparado com muito carinho, do primeiro detalhe ao laço.' },
  ],
}

export const passos = {
  selo: 'Como comprar',
  titulo: 'Do primeiro oi',
  destaque: 'até a sua casa.',
  itens: [
    { titulo: 'Escolha a peça', texto: 'Navegue pela coleção e separe as que mais combinam com você.' },
    { titulo: 'Chame no WhatsApp', texto: 'Tire suas dúvidas e consulte frete, prazos e entrega.' },
    { titulo: 'Receba o seu brilho', texto: 'Enviamos para todo o Brasil, com embalagem personalizada.' },
  ],
}

export const agendar = {
  selo: 'Seu pedido começa aqui',
  titulo: 'Monte o seu',
  destaque: 'pedido.',
  texto: 'Escolha o que você procura. A mensagem fica pronta para você enviar e a gente responde com as peças, o frete e o prazo.',
  campos: {
    nome: 'Como podemos te chamar?',
    nomeDica: 'Seu nome',
    servicos: 'O que você procura?',
    cor: 'Estilo de pedra',
    periodo: 'É para quem?',
    dia: 'Sua cidade',
    diaDica: 'Para consultar o frete',
    obs: 'Quer contar mais alguma coisa?',
    obsDica: 'Ex.: vi a pulseira de coração no site',
  },
  servicos: ['Colares', 'Pulseiras', 'Brincos', 'Anéis', 'Berloques', 'Tornozeleiras', 'Piercings fake'],
  cores: [
    { nome: 'Cristal', hex: 'linear-gradient(135deg, #ffffff, #dfe7f0 55%, #ffffff)' },
    { nome: 'Pink', hex: '#e3196f' },
    { nome: 'Azul', hex: '#8fdce0' },
    { nome: 'Rosé', hex: '#f3b9c6' },
    { nome: 'Só prata', hex: 'linear-gradient(135deg, #f4f4f4, #b9bcc2 50%, #f4f4f4)' },
    { nome: 'Surpresa', hex: 'conic-gradient(#e3196f, #8fdce0, #f3b9c6, #ffffff, #e3196f)' },
  ],
  periodos: ['Para mim', 'Presente'],
  previa: 'Sua mensagem',
  previaVazia: 'Escolha um tipo de peça para montar a mensagem.',
  enviarWhats: 'Enviar no WhatsApp',
  enviarInsta: 'Copiar e abrir o Instagram',
  copiado: 'Mensagem copiada! Cole no Direct.',
  nota: 'Atendimento de segunda a sexta, das 9h às 17h. Nada é enviado sem você revisar.',
}

export const instagram = {
  selo: 'O brilho continua por lá',
  titulo: 'Novidades no feed.',
  destaque: 'Brilho no seu dia.',
  cta: 'Seguir no Instagram',
  fotos: [6, 3, 9, 4, 1],
}

export const rodape = {
  chamada: 'Você merece',
  destaque: 'brilhar.',
  cta: 'Quero minha peça',
  assinatura: 'Brilho.',
  frase: 'Porque você merece brilho em todos os momentos.',
  movimento: 'Reduzir animações',
  movimentoAtivo: 'Ativar animações',
}
