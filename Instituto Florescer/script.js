// Número do WhatsApp do instituto (código do país + DDD + número, sem espaços). TROQUE PELO NÚMERO REAL.
const WHATSAPP = "5591981901986";

// Lista das oficinas oferecidas (edite à vontade). O campo "imagem" aparece no lugar do link "Agendar"
const oficinas = [
  { nome: "Roda de gestantes", info: "Semanal · 2h", texto: "Troca de experiências com outras mamães e orientação de profissionais.", imagem: "imagens/Roda-de-gestantes.jpeg"},
  { nome: "Oficina de preparação para o parto", info: "Semanal · 3h", texto: "Tipos de parto, plano de parto, sinais do trabalho de parto e direitos da gestante.", imagem: "imagens/Oficina-de-preparação-para-o-parto.jpeg" },
  { nome: "Treinamento para pais e acompanhantes", info: "Semanal · 2h", texto: "Como apoiar a gestante e participar dos cuidados com o bebê.", imagem: "imagens/Treinamento-para-pais-e-acompanhantes.jpeg" },
  { nome: "Oficina de amamentação", info: "Semanal · 2h", texto: "Pega correta, posições, desafios comuns e como pedir ajuda.", imagem: "imagens/Oficina-de-amamentação.jpeg" }
];

// Lista dos minicursos oferecidos (edite à vontade)
const minicursos = [
  { nome: "Primeiros socorros para bebês", info: "Disponível semanalmente", texto: "Prevenção de acidentes, engasgo, reconhecimento de emergências e demonstração de manobras em manequins, com instrutor capacitado.", imagem: "imagens/Primeiros-socorros-para-bebês.png" },
  { nome: "Sinais de alerta na gestação", info: "Disponível semanalmente", texto: "Reconhecimento dos principais sinais de risco na gestação, como sangramentos, dores intensas, febre e diminuição dos movimentos do bebê, e orientações sobre quando procurar atendimento de saúde.", imagem: "imagens/Sinais de alerta na gestação.png" },
  { nome: "Saúde emocional no puerpério", info: "Disponível semanalmente", texto: "Mudanças emocionais após o parto, estratégias de autocuidado, fortalecimento da rede de apoio e identificação de sinais de alerta para a saúde mental materna.", imagem: "imagens/Saúde emocional no puerpério.png
" }
];

// Guarda o texto da mensagem para cada cartão, usado no link do WhatsApp
function linkWhats(mensagem) {
  // Monta o endereço do WhatsApp com a mensagem já codificada
  return "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(mensagem);
}

// Cria os cartões de uma lista dentro de um elemento da página
function montarCartoes(lista, idDoElemento) {
  // Procura o elemento onde os cartões serão colocados
  const destino = document.getElementById(idDoElemento);
  // Passa por cada item da lista
  lista.forEach(function (item) {
    // Cria a caixa do cartão
    const cartao = document.createElement("article");
    // Dá a ela a classe de estilo
    cartao.className = "cartao";
    // Começa sem imagem
    let imagem = "";
    // Se o item tem imagem, monta a tag da imagem
    if (item.imagem) {
      imagem = '<img loading="lazy" src="' + item.imagem + '" alt="' + item.nome + '">';
    }
    // O link de agendar aparece sempre, logo abaixo da imagem
    const link = '<a href="' + linkWhats("Olá! Gostaria de agendar: " + item.nome) + '" target="_blank" rel="noopener">Agendar →</a>';
    // Preenche o conteúdo do cartão
    cartao.innerHTML =
      "<h3>" + item.nome + "</h3>" +
      '<span class="pilula">' + item.info + "</span>" +
      "<p>" + item.texto + "</p>" +
      imagem + link;
    // Coloca o cartão na página
    destino.appendChild(cartao);
  });
}

// Define o link dos dois botões de WhatsApp (flutuante e rodapé)
const linkGeral = linkWhats("Olá! Gostaria de conversar com o Instituto Florescer.");
// Botão flutuante
document.getElementById("whatsFlutuante").href = linkGeral;
// Link do rodapé
document.getElementById("rodapeWhats").href = linkGeral;

// Chama a criação dos cartões das duas seções
montarCartoes(oficinas, "listaOficinas");
montarCartoes(minicursos, "listaMinicursos");

// Preenche a lista de interesses do formulário com oficinas e minicursos
const campoInteresse = document.getElementById("interesse");
// Junta as duas listas em uma só e cria uma opção para cada
oficinas.concat(minicursos).forEach(function (item) {
  // Cria a opção
  const opcao = document.createElement("option");
  // Define o texto exibido
  opcao.textContent = item.nome;
  // Adiciona na lista
  campoInteresse.appendChild(opcao);
});
// Adiciona "Agendar consulta" como primeira opção do formulário
campoInteresse.insertAdjacentHTML("afterbegin", "<option>Agendar consulta</option>");
// Deixa "Agendar consulta" selecionada por padrão ao abrir a página
campoInteresse.selectedIndex = 0;
// Adiciona uma opção para quem ainda não sabe o que escolher
campoInteresse.insertAdjacentHTML("beforeend", "<option>Ainda não sei, quero conversar</option>");

// Quando o formulário for enviado, abre o WhatsApp
document.getElementById("formAgenda").addEventListener("submit", function (evento) {
  // Impede a página de recarregar
  evento.preventDefault();
  // Lê o que a pessoa preencheu
  const nome = document.getElementById("nome").value.trim();
  const fase = document.getElementById("fase").value;
  const interesse = campoInteresse.value;
  // Monta a mensagem que chegará pronta no WhatsApp
  // Cada "\n" é uma quebra de linha, então cada frase fica embaixo da outra
  const mensagem = "Olá! Meu nome é " + nome + ".\n" +
                   "Sou: " + fase + ".\n" +
                   "Tenho interesse em: " + interesse + ".\n" +
                   "Gostaria de agendar.";
  // Abre o WhatsApp em uma nova aba
  window.open(linkWhats(mensagem), "_blank");
});

// Abre e fecha o menu no celular
const menu = document.getElementById("menu");
// Ao clicar no botão, alterna a classe "aberto"
document.getElementById("menuBotao").addEventListener("click", function () {
  menu.classList.toggle("aberto");
});
// Ao clicar em um link do menu, ele se fecha
menu.addEventListener("click", function () {
  menu.classList.remove("aberto");
});

// Escreve o ano atual no rodapé
document.getElementById("ano").textContent = new Date().getFullYear();
