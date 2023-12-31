const { SlashCommandBuilder } = require("discord.js");

const frasesAleatorias = [
  {
    frase:
      "Atualmente o Rei Macaco está de férias. Vai caçar o que fazer fexo!!!", //
    imagem:
      "https://ogimg.infoglobo.com.br/economia/13519928-9af-bfc/FT1086A/0temp.jpg", //
  },
  {
    frase: "Outra frase aleatória aqui!",
    imagem: "https://ogimg.infoglobo.com.br/economia/13519928-9af-bfc/FT1086A/0temp.jpg",
  },
  {
    frase: "Você já abraçou seu bot hoje?",
    imagem: "https://t.ctcdn.com.br/8bRkqaf2Y8FW_Kl5FQyKTSCpvp4=/i360793.png", //
  },
  {
    frase: "Só os fortes entendem a referência.",
    imagem: "https://t.ctcdn.com.br/q8TGiUxgs0GmsbcpEMLAQIQcusQ=/1024x0/smart/i360797.png", //
  },
  {
    frase: "A vida é como programar em Python: cheia de indentação.",
    imagem: "https://ogimg.infoglobo.com.br/economia/13519928-9af-bfc/FT1086A/0temp.jpg",
  },
  {
    frase: "Que a força esteja com você, jovem padawan.",
    imagem: "https://files.tecnoblog.net/wp-content/uploads/2021/01/ceia-do-covid.jpg", //
  },
  {
    frase: "O tempo voa, mas os bugs permanecem.",
    imagem: "https://t.ctcdn.com.br/RXx6_SJ1v9-w_E2UlD3a528OyIE=/i360801.png", //
  },
  {
    frase: "Sabe qual é o animal mais antigo? A zebra, porque está em preto e branco desde sempre.",
    imagem: "https://t.ctcdn.com.br/seDphdsp_SRZw0Lr9vgsWBLmPcI=/1024x0/smart/i360796.jpeg", //
  },
  {
    frase: "Se a vida te der limões, talvez você esteja programando em Java.",
    imagem: "https://ogimg.infoglobo.com.br/economia/13519928-9af-bfc/FT1086A/0temp.jpg",
  },
  {
    frase: "Programador é igual café, só funciona depois de um `if (cafe === true) { code(); }`",
    imagem: "https://ogimg.infoglobo.com.br/economia/13519928-9af-bfc/FT1086A/0temp.jpg",
  },
  {
    frase: "Eu não sou preguiçoso, estou em modo de economia de energia.",
    imagem: "https://t.ctcdn.com.br/GR014wWXkOpIOo0kpxSfSRnk_Jk=/959x539/smart/i598772.jpeg", //
  },
  {
    frase: "Cuidado com o JavaScript, ele tem o poder de transformar callback em callbackhell.",
    imagem: "https://t.ctcdn.com.br/p-ZZCy7XocLQ1Z9NfU93NXOBvWM=/i360798.jpeg", //
  },
  {
    frase: "Eu não erro, apenas descubro novas formas de não fazer as coisas.",
    imagem: "https://t.ctcdn.com.br/rTsTunFRaftA5snsjXpGPBA7Us0=/660x0/smart/i360803.jpeg", //
  },
  {
    frase: "Um byte pergunta para o outro: Você está bem? Não, estou um pouco quebrado.",
    imagem: "https://t.ctcdn.com.br/qvzcG4GmiFbIs6resWNAJtdkZEM=/i360795.gif", //
  },
  {
    frase: "Eu queria trocar minha vida por um upgrade, mas acho que o suporte já expirou.",
    imagem: "https://pbs.twimg.com/media/EbblG-_UEAEshLU?format=jpg&name=900x900", //
  },
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rollingdice")
    .setDescription("Responde com uma mensagem aleatória ao usuário"),

  async execute(interaction) {
    // Escolha aleatoriamente uma frase e imagem
    const indiceAleatorio = Math.floor(Math.random() * frasesAleatorias.length);
    const fraseAleatoria = frasesAleatorias[indiceAleatorio];

    // Menção ao usuário que usou o comando
    const mention = `<@${interaction.user.id}>`;

    await interaction.reply({
      content: `${mention}, ${fraseAleatoria.frase}`,
      files: [fraseAleatoria.imagem],
    });
  },
};

