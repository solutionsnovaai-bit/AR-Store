# AR Store — AR | Aline Ribeiro

Site de uma página da AR Store: semijoias banhadas a prata.

React 19, TypeScript, Vite 6, Motion 12 e Lenis. Fontes (Bodoni Moda e Manrope), logo e fotos servidos pelo próprio site.

## Rodar

```bash
npm ci
npm run dev      # desenvolvimento
npm run build    # versão final em dist/
```

## O que tem no site

- **Abertura "o logo se formando"**: sobre o rosa da marca, a silhueta do logo aparece e o logo rose gold se forma conforme o site carrega de verdade (fontes, logo e foto do topo); um reflexo passa pelo metal, a estrelinha acende, a luz cobre a tela, o nome aparece e voa até o topo.
- **Hero editorial** com a peça principal num arco com reflexo, minifotos com profundidade e selo girando.
- **Faixas cruzadas** com as categorias, **Vitrine** (carrossel com arrastar e lupa) e **Manifesto** que acende palavra por palavra.
- **Cena do brilho** (rolagem presa à tela): o pingente de coração desce na corrente, balança, gira, cintila e a luz da pedra toma a tela; depois quatro brilhos (delicado, intenso, único, romântico) trocam a cor da tela, da pedra e da foto.
- **Qualidade**: banho de prata por milésimos (70, 50 e 30) e verniz alemão.
- **Coleção** com filtros e foto grande, **Quem cuida do seu pedido**, **Como comprar**, **Pedido** (monta a mensagem para o WhatsApp), **Instagram** e rodapé.

## Contato

- WhatsApp: (11) 93737-7348 — edite `NUMERO_WHATSAPP` em `src/conteudo/site.ts` (ou `VITE_WHATSAPP_NUMBER` na Vercel).
- Instagram: https://www.instagram.com/arstore.alineribeiro_/
- Atendimento: segunda a sexta, das 9h às 17h.

## Textos e fotos

- Textos: `src/conteudo/textos.ts`. Fotos: `public/fotos/` listadas em `src/conteudo/fotos.ts`. Logo: `public/marca/`.
- Imagem de compartilhamento: `public/og.jpg`.

## Deploy na Vercel

Importe o repositório, branch `main`, raiz do repositório. O `vercel.json` já define Vite, `npm ci`, `npm run build` e a pasta `dist`. Para domínio próprio, defina `VITE_SITE_URL=https://seu-dominio.com.br`.

Licenças de terceiros: `docs/LICENCAS.md`.
