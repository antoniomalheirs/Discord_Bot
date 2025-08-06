# Bot para Discord com Node.js, YouTube e Twitch

![Discord.js](https://img.shields.io/badge/Discord.js-v14.14.1-7289DA?style=for-the-badge&logo=discord&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-16.x+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-7.5.3-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

Um bot para Discord multifuncional desenvolvido para ser um ponto de partida sólido para seus próprios projetos. Inclui funcionalidades prontas para uso, como notificações de novos vídeos do YouTube, alertas de streams da Twitch, estatísticas de usuários e muito mais, tudo integrado com um banco de dados MongoDB.

## ✨ Índice

- [🚀 Funcionalidades](#-funcionalidades)
- [💻 Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [🖼️ Demonstração](#️-demonstração)
- [📋 Pré-requisitos](#-pré-requisitos)
- [⚙️ Instalação e Configuração](#️-instalação-e-configuração)
- [▶️ Executando o Bot](#️-executando-o-bot)
- [🤝 Como Contribuir](#-como-contribuir)
- [📝 Licença](#-licença)

---

## 🚀 Funcionalidades

- **Notificações do YouTube:** Monitore canais do YouTube e envie notificações customizadas para um canal de texto quando um novo vídeo for postado.
- **Alertas da Twitch:** Avise seus membros quando um streamer que você segue começar uma transmissão ao vivo.
- **Estatísticas de Usuário:** Comandos para exibir informações e estatísticas sobre os membros do servidor.
- **Estrutura Modular:** Código organizado para facilitar a adição de novos comandos e funcionalidades.
- **Base de Dados Persistente:** Utiliza o MongoDB para armazenar configurações, lista de canais, e outras informações importantes.

## 💻 Tecnologias Utilizadas

- **Backend:** [Node.js](https://nodejs.org/)
- **Biblioteca para Discord:** [Discord.js](https://discord.js.org/)
- **Banco de Dados:** [MongoDB](https://www.mongodb.com/) com o ODM [Mongoose](https://mongoosejs.com/)
- **APIs Externas:**
  - [Google APIs (YouTube Data API v3)](https://developers.google.com/youtube/v3)
  - [Twitch API](https://dev.twitch.tv/docs/api/)
- **Gerenciamento de Ambiente:** [Dotenv](https://www.npmjs.com/package/dotenv)

## 🖼️ Demonstração

| Bot Online | Funções Principais | Exemplos de Comandos |
| :---: | :---: | :---: |
| ![BOT](https://github.com/antoniomalheirs/Discord_Bot/assets/79883711/2d867a7b-a74d-4eec-bf62-15eb584b96e4) | ![FUNCTIONS](https://github.com/antoniomalheirs/Discord_Bot/assets/79883711/9049a3b4-61a7-4ce8-b44a-1f83f5f6e124) | ![COMMANDS](https://github.com/antoniomalheirs/Discord_Bot/assets/79883711/19c1df6e-58bd-4a43-9e6a-5a6c20a7c0bb) |

---

## 📋 Pré-requisitos

Antes de começar, você precisará ter as seguintes ferramentas e contas configuradas:

- [Node.js](https://nodejs.org/) (versão 16.9.0 ou superior)
- [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
- Uma conta no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) (ou uma instância local do MongoDB)
- Um Bot registrado no [Portal de Desenvolvedores do Discord](https://discord.com/developers/applications)
- Credenciais da API do Google (para o YouTube) e da Twitch.

## ⚙️ Instalação e Configuração

Siga estes passos para configurar e executar o projeto em sua máquina local.

**1. Clone o repositório:**
```bash
git clone [https://github.com/antoniomalheirs/Discord_Bot.git](https://github.com/antoniomalheirs/Discord_Bot.git)
cd Discord_Bot
```
**2. Instale as dependências:**
Este comando instalará todos os pacotes listados no arquivo `package.json`.
```bash
npm install
```
**3. Configure as variáveis de ambiente:**
Crie um arquivo chamado .env na raiz do projeto. Você pode copiar o arquivo de exemplo .env.example (se houver) ou criar um do zero. Adicione as seguintes chaves e preencha com suas credenciais:
```bash
# Credenciais do seu Bot no Discord
DISCORD_TOKEN=SEU_TOKEN_DO_DISCORD_AQUI

# String de conexão do seu banco de dados MongoDB
MONGODB_URI=SUA_URI_DE_CONEXAO_DO_MONGODB_AQUI

# Credenciais da API do Google para notificações do YouTube
YOUTUBE_API_KEY=SUA_CHAVE_DE_API_DO_YOUTUBE_AQUI

# Credenciais da API da Twitch
TWITCH_CLIENT_ID=SEU_CLIENT_ID_DA_TWITCH_AQUI
TWITCH_CLIENT_SECRET=SEU_CLIENT_SECRET_DA_TWITCH_AQUI
```
- `DISCORD_TOKEN`: Encontrado no seu aplicativo no [Portal de Desenvolvedores do Discord](https://discord.com/developers/applications), na seção "Bot".
- `MONGODB_URI`: Obtida ao criar um cluster no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
- `YOUTUBE_API_KEY`: Gerada no [Google Cloud Console](https://console.cloud.google.com/apis/credentials).
- `TWITCH_CLIENT_ID` e `TWITCH_CLIENT_SECRET`: Obtidos ao registrar uma nova aplicação no [Console de Desenvolvedores da Twitch](https://dev.twitch.tv/console/apps).

## ▶️ Executando o Bot
Após a instalação e configuração, certifique-se de que você está no diretório raiz do projeto (./) e execute o seguinte comando no seu terminal:
```bash
node .
```
- Dica: Para um desenvolvimento mais fluido, considere usar o nodemon para reiniciar o bot automaticamente sempre que um arquivo for alterado.

## 🤝 Como Contribuir
Contribuições são o que tornam a comunidade de código aberto um lugar incrível para aprender, inspirar e criar. Qualquer contribuição que você fizer será muito apreciada.

 1º Faça um Fork do projeto.

 2º Crie uma nova Branch (git checkout -b feature/sua-feature-incrivel).

 3º Faça o Commit de suas alterações (git commit -m 'Adiciona sua-feature-incrivel').

 4º Faça o Push para a Branch (git push origin feature/sua-feature-incrivel).

 5º Abra um Pull Request.

## 📝 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
