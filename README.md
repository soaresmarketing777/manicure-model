# 🚀 Manicure Model - Site Profissional (v4.0)

Site estático de alto desempenho, otimizado para SEO local, conversão (Growth) e 100% compatível com a LGPD.

## 📋 Pré-Requisitos
- Nenhum backend necessário.
- Hospedagem estática recomendada: Vercel, Netlify, GitHub Pages ou Hostgator (plano básico).

## ⚙️ Instruções de Configuração (Checklist Obrigatório)

1. **Substituir Placeholders:**
   - Abra `index.html` e use "Localizar e Substituir" para trocar:
     - `[INSIRA SEU GA4 ID AQUI]` (Ex: G-XXXXXXXXXX)
     - `[INSIRA SEU ADS ID AQUI]` (Ex: AW-XXXXXXXXX)
     - `[INSIRA SEU GTM ID AQUI]` (Ex: GTM-XXXXXXX)
     - `[INSIRA SEU META PIXEL ID AQUI]` (Ex: 1234567890)
     - `[INSIRA SEU CNPJ AQUI]` e dados de endereço/telefone.

2. **Configurar WhatsApp:**
   - No arquivo `script.js`, altere a variável `whatsappNumber` para o número real (formato: 5511999998888, sem espaços ou traços).

3. **Imagens:**
   - As imagens atuais são placeholders do Unsplash. Para produção, substitua os `src` por fotos reais do salão (comprimidas em formato WebP para melhor performance).

4. **Links Sociais:**
   - Atualize os links do Instagram/Facebook no rodapé do `index.html`.

## 🚀 Checklist de Pré-Lançamento
- [ ] Validar todos os links (especialmente Política de Privacidade e Código de Ética).
- [ ] Testar o formulário de contato (deve abrir o WhatsApp com a mensagem formatada).
- [ ] Verificar o contraste de cores no Modo Escuro.
- [ ] Testar a responsividade no celular (a barra fixa inferior deve aparecer apenas no mobile).
- [ ] Validar o banner de cookies (deve reaparecer se o localStorage for limpo).

## 🛡️ Conformidade LGPD
O site já inclui:
- Banner de consentimento de cookies com opções de Aceitar/Rejeitar.
- Bloqueio lógico de eventos de rastreamento (`trackEvent`) até o consentimento.
- Páginas dedicadas de Política de Privacidade e Código de Ética adaptadas para salões de beleza.