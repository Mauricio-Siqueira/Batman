function pesquisar() {
    // Obtém a seção onde os resultados serão exibidos
    let section = document.getElementById("resultados-pesquisa");
   
    let campoPesquisa = document.getElementById("campo-pesquisa").value;

    // Se campoPesquisa for uma String sem nada
    if (campoPesquisa == "") {
        section.innerHTML = "<p class=\"mensagem-sem-resultados\">Nada foi encontrado. Sem informações em busca</p>";
        return;   
    }

    if (campoPesquisa == " ") {
        section.innerHTML = "<p class=\"mensagem-sem-resultados\">Nada foi encontrado. Sem informações em busca</p>";
        return;   
    }

    campoPesquisa = campoPesquisa.toLowerCase();

    // Inicializa uma string vazia para armazenar os resultados da pesquisa
    let resultados = "";
    let titulo = "";
    let descricao = "";

    // Itera sobre cada item de dados e constrói o HTML para cada resultado
    for (let dado of dados) {
        titulo = dado.titulo.toLowerCase();
        descricao = dado.descricao.toLowerCase();
        let genero = dado.genero.toLowerCase();
        let diretor = dado.diretor.toLowerCase();
        let elenco = dado.elenco.toLowerCase();
        let ano = dado.ano.toLowerCase();

        // Pega a posição (número) deste filme na lista
        let indice = dados.indexOf(dado);

        // Usuário digitou estiver no título, descrição, diretor.
        if (titulo.includes(campoPesquisa) || 
            descricao.includes(campoPesquisa) ||
            genero.includes(campoPesquisa) ||
            diretor.includes(campoPesquisa) ||
            elenco.includes(campoPesquisa) ||
            ano.includes(campoPesquisa)) {
            
            // Ccard do filme na tela )
            resultados += `
            <div class="item-resultado">
                <img src="${dado.imagem}" alt="Pôster de ${dado.titulo}" class="poster-filme">
                <div class="info-filme">  
                    <h2>
                        <!-- Ao clicar no título, chama a função de abrir o modal -->
                        <a href="javascript:void(0)" onclick="abrirModal(${indice})">${dado.titulo}</a>
                    </h2>
                    <p><strong>Ano:</strong> ${dado.ano}</p>
                    <p><strong>Diretor:</strong> ${dado.diretor}</p>
                    <p><strong>Elenco:</strong> ${dado.elenco}</p>
                    <p><strong>Gênero:</strong> ${dado.genero}</p>
                    <div class="links-card">
                        <!-- Ao clicar em Mais Informações, também abre o modal -->
                        <a href="javascript:void(0)" onclick="abrirModal(${indice})" class="link-mais-info">Mais informações</a>
                        <a href="${dado.trailer}" target="_blank" class="botao-trailer">▶ Assistir Trailer</a>
                    </div>
                </div>
            </div>
            `;
        }
    }

    if (!resultados) {
        resultados = "<p class=\"mensagem-sem-resultados\">Nada foi encontrado. Certifique-se de que o campo de pesquisa está preenchido corretamente</p>";
    }

    // Atribui o HTML gerado para o conteúdo da seção
    section.innerHTML = resultados;
}

// ==========================================
// FUNÇÕES DO MODAL (JANELA POP-UP)
// ==========================================

// Função que abre a janela com os detalhes do filme clicado
function abrirModal(indice) {
    let filme = dados[indice]; // Pega exatamente o filme clicado
    let modalCorpo = document.getElementById("modal-corpo");
    let modal = document.getElementById("modal-detalhes");

    // Monta o visual de dentro da janela com as informações completas
    modalCorpo.innerHTML = `
        <div class="modal-detalhes-grid">
            <img src="${filme.imagem}" alt="Pôster de ${filme.titulo}" class="modal-poster">
            <div class="modal-info">
                <h2>${filme.titulo}</h2>
                <p><strong>Ano de Lançamento:</strong> ${filme.ano}</p>
                <p><strong>Diretor:</strong> ${filme.diretor}</p>
                <p><strong>Gênero:</strong> ${filme.genero}</p>
                <p><strong>Elenco:</strong> ${filme.elenco}</p>
                <p><strong>Sinopse Completa:</strong> ${filme.descricao}</p>
                <div style="margin-top: 1.5rem;">
                    <a href="${filme.trailer}" target="_blank" class="botao-trailer">▶ Assistir Trailer Oficial</a>
                </div>
            </div>
        </div>
    `;

    // Remove a classe "escondido", fazendo a janela APARECER na tela!
    modal.classList.remove("escondido");
}

// Função que fecha a janela
function fecharModal() {
    let modal = document.getElementById("modal-detalhes");
    // Adiciona a classe "escondido" de volta, fazendo a janela SUMIR
    modal.classList.add("escondido");
}

// ==========================================
// OUVINTES DE EVENTOS (LISTENERS)
// ==========================================

// Faz a pesquisa quando o botão for clicado
document.getElementById("botao-pesquisa").addEventListener("click", pesquisar);

// Faz a pesquisa quando o usuário pressionar "Enter" no campo
document.getElementById("campo-pesquisa").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        pesquisar();
    }
});

// Fecha a janela quando clicar no botão "X"
document.getElementById("modal-fechar").addEventListener("click", fecharModal);

// Fecha a janela se a pessoa clicar no fundo preto (do lado de fora da caixa)
document.getElementById("modal-detalhes").addEventListener("click", function(event) {
    if (event.target === this) {
        fecharModal();
    }
});

// Fecha a janela se a pessoa apertar a tecla ESC do teclado
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        fecharModal();
    }
});
