# Flávio e Vorcaro

Site estático com a cronologia da relação entre Flávio Bolsonaro e Daniel Vorcaro no caso Banco Master. Cada episódio traz um resumo da reportagem, o status, a resposta do citado e os links das fontes.

Não tem build nem dependências: HTML, CSS e JavaScript (ES modules) puros.

## Estrutura

```
.
├── index.html              # marcação da página
├── data/
│   └── episodes.json       # conteúdo da linha do tempo
├── assets/
│   ├── css/
│   │   ├── tokens.css      # cores, fontes e temas claro/escuro
│   │   ├── base.css        # reset e estilos globais
│   │   ├── hero.css        # abertura e faixa de personagens
│   │   ├── money.css       # painel "O dinheiro do filme"
│   │   ├── timeline.css    # filtros, linha do tempo e cards
│   │   └── footer.css
│   ├── js/
│   │   ├── main.js         # ponto de entrada: carrega os dados
│   │   ├── timeline.js     # renderiza filtros e episódios
│   │   ├── config.js       # cores por tipo e rótulos de status
│   │   └── utils.js        # escape de HTML e formatação de datas
│   └── img/
│       └── favicon.svg
├── package.json            # só o script de servidor local
└── README.md
```

## Rodar localmente

Como o JavaScript usa módulos e `fetch`, a página precisa ser servida por HTTP (abrir o arquivo direto no navegador não funciona).

```bash
npm run dev            # usa npx serve na porta 3000
# ou
python3 -m http.server 3000
```

Abra http://localhost:3000.

## Editar o conteúdo

Tudo fica em `data/episodes.json`. Cada episódio:

```json
{
  "date": "2025-11-16",
  "type": "Mensagens",
  "status": "conf",
  "title": "Título curto",
  "text": "Resumo do que a reportagem relata.",
  "quote": "Trecho curto, opcional",
  "response": "Resposta do citado, opcional",
  "sources": [{ "name": "Veículo", "url": "https://..." }]
}
```

- `date`: `AAAA`, `AAAA-MM` ou `AAAA-MM-DD`. Mantenha a lista em ordem cronológica.
- `type`: um dos tipos em `assets/js/config.js` (`TYPE_COLORS`). Um tipo novo aparece como filtro automaticamente; adicione a cor dele lá.
- `status` (opcional): `conf`, `neg`, `inv` ou `none`.
- Atualize `updatedAt` no topo do arquivo a cada revisão.

## Publicar

Qualquer hospedagem estática serve. Suba a pasta inteira:

- **Netlify**: arraste a pasta em app.netlify.com/drop.
- **GitHub Pages**: Settings → Pages → branch `main`, pasta raiz.
- **Vercel / Cloudflare Pages**: importe o repositório, sem comando de build, diretório de saída `.`.
- **AWS S3 + CloudFront**: `aws s3 sync . s3://SEU-BUCKET --exclude ".git/*" --exclude "node_modules/*"`.

## Cuidados editoriais

- Toda afirmação precisa de fonte jornalística linkada.
- Use resumos próprios; não reproduza trechos longos das reportagens.
- Inclua a resposta do citado sempre que existir.
- Revise o conteúdo quando houver fato novo (denúncia, arquivamento, decisão judicial).
# bolsomaster
