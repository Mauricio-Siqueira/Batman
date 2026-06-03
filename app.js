function pesquisar() {
    // Obtém a seção onde os resultados serão exibidos
    let section = document.getElementById("resultados-pesquisa");
   
let campoPesquisa = document.getElementById
("campo-pesquisa").value

// Se campoPesquisa for uma String sem nada
if (campoPesquisa == "") {
  section.innerHTML = "<p>Nada foi encontrado. Sem informações em busca</p>"  
  return   
}

if (campoPesquisa == " ") {
  section.innerHTML = "<p>Nada foi encontrado. Sem informações em busca</p>"  
  return   
}

campoPesquisa = campoPesquisa.toLowerCase()


    // Inicializa uma string vazia para armazenar os resultados da pesquisa
    let resultados = "";
    let titulo = "";
    let descricao = "";
    // Itera sobre cada item de dados e constrói o HTML para cada resultado
    for (let dado of dados) {
      titulo = dado.titulo.toLowerCase()
      descricao = dado.descricao.toLowerCase()
      let genero = dado.genero.toLowerCase();
      let diretor = dado.diretor.toLowerCase();
      let elenco = dado.elenco.toLowerCase();
      let ano = dado.ano.toLowerCase();
      // Se titulo includes campoPesquisa
      if (titulo.includes(campoPesquisa) || 
          descricao.includes(campoPesquisa) ||
          genero.includes(campoPesquisa) ||
          diretor.includes(campoPesquisa) ||
          elenco.includes(campoPesquisa)||
          ano.includes(campoPesquisa))
          {
        // Cria um novo elemento
        resultados += `
        <div class="item-resultado">
          <h2>
            <a href="${dado.link}" target="_blank">${dado.titulo}</a>
          </h2>
          <p class="descricao-meta">${dado.descricao}</p>
          <p> Ano de lançamento ${dado.ano}</p>
          <p> Diretor: ${dado.diretor}</p>
          <p> Elenco: ${dado.elenco}</p>
          <p> Genero: ${dado.genero}</p>
          <a href=${dado.link} target="_blank">Mais informações sobre o filme</a>
        </div>
      `;
      }
    }

    if (!resultados) {
        resultados = "<p>Nada Foi encontrado</p>"
    }
    // Atribui o HTML gerado para o conteúdo da seção
    section.innerHTML = resultados;
}

// Faz a pesquisa quando o botão for clicado
document.getElementById("botao-pesquisa").addEventListener("click", pesquisar);

// Faz a pesquisa quando o usuário pressionar "Enter" dentro do campo de input
document.getElementById("campo-pesquisa").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        pesquisar();
    }
});