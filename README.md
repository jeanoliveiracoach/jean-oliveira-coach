# Jean Oliveira Coach — Site v2.0

Site institucional de consultoria fitness online premium.
Stack: **HTML + CSS + JS** vanilla — zero dependências, zero build step.

---

## 📂 Estrutura

```
/
├─ index.html              ← página única (SPA estática)
├─ robots.txt              ← SEO / crawlers
├─ sitemap.xml             ← sitemap
├─ site.webmanifest        ← manifesto PWA
├─ README.md               ← este arquivo
└─ assets/
   ├─ css/style.css        ← estilo organizado por seções
   ├─ js/main.js           ← interações (nav, reveal, carrossel)
   └─ images/
      ├─ jean-oliveira.webp ← foto principal (já incluída)
      ├─ evo1.jpeg ... evo10.jpeg, evo6.png  ← evoluções de alunos
      └─ perf1.jpeg ... perf5.jpeg           ← atletas alta performance
```

---

## 🖼️ Imagens pendentes

Os seguintes arquivos precisam ser adicionados em `assets/images/`:

**Evoluções (carrossel principal):**
`evo1.jpeg`, `evo2.jpeg`, `evo3.jpeg`, `evo4.jpeg`, `evo5.jpeg`, `evo6.png`, `evo7.jpeg`, `evo8.jpeg`, `evo9.jpeg`, `evo10.jpeg`

**Alta performance:**
`perf1.jpeg`, `perf2.jpeg`, `perf3.jpeg`, `perf4.jpeg`, `perf5.jpeg`

**Recomendação:** converter para **WebP** (mantendo o mesmo nome, ex.: `evo1.webp`) reduz cerca de 30% do peso. Se fizer isso, atualize os `src` no `index.html` na seção `<!-- EVOLUÇÕES -->` e `<!-- ALTA PERFORMANCE -->`.

---

## ✨ O que foi feito nesta versão

### Visual / UX
- Atmosfera cinematográfica: grain SVG, vignettes radiais, glow vermelho controlado nos H1/CTAs.
- Nav inteligente que troca de estado ao rolar (transparente → opaco com border vermelha).
- Hover states refinados em cards (lift + glow vermelho/dourado).
- Hint "Role para descobrir" sutil no fim do hero.
- WhatsApp float com pulse animation.

### Animações
- **IntersectionObserver** revela seções no scroll (`.reveal` → `.is-visible`).
- Carrossel com auto-advance que pausa fora da viewport (performance) e ao interagir.
- Drag de mouse e touch suaves.
- Hover em cards aplica zoom sutil na imagem.
- Respeita `prefers-reduced-motion` em todas as animações.

### Código
- HTML semântico (`<main>`, `<section>`, `<article>`, `<nav>`, ARIA labels).
- Ícone SVG **definido uma vez** em `<symbol>` e reutilizado via `<use>` (HTML enxugou ~3 KB).
- Todos os estilos inline migrados para CSS com classes nomeadas.
- CSS organizado em 23 blocos numerados com TOC no topo.
- JS modular em IIFE com funções `initNav`, `initReveal`, `initCarousels`.

### SEO
- Meta tags completas: `description`, `keywords`, `author`, `canonical`.
- Open Graph + Twitter Cards.
- **JSON-LD** com `Person`, `Service`, `FAQPage` (rich snippets no Google).
- `robots.txt` + `sitemap.xml`.
- Estrutura semântica que ajuda crawlers.
- Favicon SVG inline.

### Performance
- Fontes com `preconnect` + `preload` + `display=swap`.
- Imagens com `loading="lazy"` + `decoding="async"`.
- JS com `defer`.
- Animações usam `transform`/`opacity` (GPU-aceleradas).
- Carrossel pausa fora da viewport.
- Scrollbar customizada slim.

### Acessibilidade
- `:focus-visible` com outline vermelho.
- ARIA labels em todos os blocos interativos e seções.
- Texto alternativo descritivo em imagens.
- `prefers-reduced-motion` desativa animações para quem precisa.
- Contraste mantido (texto claro sobre fundo escuro).

---

## 🚀 Deploy

Por ser estático, roda em qualquer host:

**Netlify** (recomendado — drag and drop)
1. Acesse [app.netlify.com/drop](https://app.netlify.com/drop)
2. Arraste a pasta inteira.
3. Configure o domínio.

**Vercel**
```bash
npx vercel --prod
```

**GitHub Pages**
1. `git init && git add . && git commit -m "site v2"`
2. Push para um repositório.
3. Settings → Pages → branch `main` → `/ (root)`.

**Cloudflare Pages / Hostinger / qualquer FTP**
Basta subir todos os arquivos para a raiz pública.

---

## 🔧 Ajustes rápidos

| O quê | Onde |
|---|---|
| Trocar telefone WhatsApp | buscar `5535997792109` no `index.html` |
| Trocar Instagram | buscar `jeanolliveira_` no `index.html` |
| Trocar preços dos planos | seção `<!-- PLANOS -->` no `index.html` |
| Trocar domínio canônico | tags `canonical`, `og:url`, `sitemap.xml` |
| Mudar tom de vermelho | variável `--red` em `assets/css/style.css` |
| Mudar duração do auto-scroll | constante `AUTO_INTERVAL` em `assets/js/main.js` |

---

**Versão:** 2.0
**Data:** Maio/2026
