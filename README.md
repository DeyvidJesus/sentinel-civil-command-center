# 🛡️ SentinelCivil - Command Center

O **Command Center** é o painel de controle central e painel de operações da plataforma **SentinelCivil**, desenvolvido especificamente para apoiar as operações e tomadas de decisão da Defesa Civil.

A aplicação oferece um monitoramento de dados denso e em tempo real através de uma interface de tema escuro (Dark Mode) de nível empresarial, garantindo consciência situacional para o gerenciamento de incidentes como incêndios, inundações e outras emergências ambientais.

## 🌟 Principais Funcionalidades

- **Dashboard Executivo:** Visualização rápida de métricas operacionais reais e KPIs.
- **Feed de Incidentes em Tempo Real:** Conectado nativamente ao Firestore, o feed exibe e atualiza ocorrências instantaneamente via WebSockets.
- **Mapa Interativo (GIS):** Visualização geoespacial com camadas dinâmicas, incluindo satélites da NASA (FIRMS) para focos de calor e overlay de ocorrências do Firebase.
- **Intelligence Engine:** Um motor de análise heurística que consome dados climáticos (OpenWeather), de satélite (NASA) e ocorrências locais para calcular o **Índice Nacional de Risco** e disparar recomendações de protocolo em tempo real.
- **Tour Guiado:** Integração e treinamento rápidos para novos operadores do painel utilizando ferramentas de walkthrough passo a passo.

## 💻 Stack Tecnológica

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Gestão de Estado & APIs:** [Axios](https://axios-http.com/) + [React Query (@tanstack/react-query)](https://tanstack.com/query/latest)
- **Backend as a Service (BaaS):** [Firebase](https://firebase.google.com/) (Firestore Real-time, Authentication)
- **Integrações de Dados:** OpenWeather API, NASA FIRMS API (com Proxy interno em Next.js Route Handlers para contornar CORS).

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 20+) e Yarn/NPM.
- Configuração do Firebase e chaves das APIs externas.

### 1. Configurando Variáveis de Ambiente
Crie um arquivo `.env` (ou `.env.local`) na raiz da pasta `command-center` com as seguintes chaves:

```env
# NASA FIRMS (Map Key) - Gerada em: firms.modaps.eosdis.nasa.gov/api/map_key
NEXT_PUBLIC_FIRMS_MAP_KEY=sua_chave_nasa_aqui

# OpenWeather API
NEXT_PUBLIC_OPENWEATHER_API_KEY=sua_chave_openweather_aqui

# Firebase Config (Gerado no Console do Firebase > Project Settings > Web App)
NEXT_PUBLIC_FIREBASE_API_KEY=sua_chave_aqui
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=sentinel-civil.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=sentinel-civil
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=sentinel-civil.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=seu_app_id_web
```
*Atenção: A chave da NASA FIRMS deve ser gerada no painel específico do FIRMS, não no painel geral da NASA (api.nasa.gov).*

### 2. Instalação e Execução
```bash
git clone git@github.com:DeyvidJesus/sentinel-civil-command-center.git
cd command-center
yarn install
yarn dev
```
Acesse [http://localhost:3000](http://localhost:3000).

## 🐳 Executando e Publicando com Docker (GCP Cloud Run)

O projeto possui um `Dockerfile` preparado para receber as variáveis de ambiente no momento do build (necessário para o Next.js exportar variáveis `NEXT_PUBLIC_`):

1. **Construa a imagem passando as chaves (Build Args):**
   ```bash
   docker build \
     --build-arg NEXT_PUBLIC_FIRMS_MAP_KEY="sua_chave" \
     --build-arg NEXT_PUBLIC_OPENWEATHER_API_KEY="sua_chave" \
     --build-arg NEXT_PUBLIC_FIREBASE_API_KEY="sua_chave" \
     -t sentinel-command-center .
   ```

2. **Execute o container:**
   ```bash
   docker run -p 8080:8080 sentinel-command-center
   ```
   A aplicação estará disponível em `http://localhost:8080`. Se estiver usando o **Google Cloud Build**, configure estas variáveis em "Substitution Variables".

## 📄 Licença
Este projeto faz parte do ecossistema privado da plataforma **SentinelCivil**. Todos os direitos reservados.
