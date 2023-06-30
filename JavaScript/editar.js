// Função para popular a lista de seleção de cursos
function popularListaDeCursos() {
    var selectElement = document.getElementById("select-curso");
    selectElement.innerHTML = ""; // Limpar o conteúdo existente

    // Obter a lista de dados do armazenamento local
    var listaDeDados = obterListaDeDados();

    var option2 = document.createElement("option");
    option2.textContent = "Selecione o curso";
    option2.selected="selected";
    option2.setAttribute('disabled','');
    selectElement.appendChild(option2);


    // Iterar sobre a lista de cursos e criar opções para cada curso
    for (var i = 0; i < listaDeDados.length; i++) {
        var curso = listaDeDados[i];
        var option = document.createElement("option");
        option.value = i;
        option.textContent = curso.nome;
        selectElement.appendChild(option);
    }
}

// Função para selecionar um curso da lista
function selecionarCurso() {
    var selectElement = document.getElementById("select-curso");
    var horasAntigasElement = document.getElementById("horas-antigas");

    var cursoIndex = selectElement.value;

    if (cursoIndex !== "") {
        // Obter a lista de dados do armazenamento local
        var listaDeDados = obterListaDeDados();

        // Obter o curso selecionado
        var curso = listaDeDados[parseInt(cursoIndex)];

        // Preencher o campo de horas antigas com as horas do curso selecionado
        horasAntigasElement.value = curso.horas;
    } else {
        // Limpar o campo de horas antigas
        horasAntigasElement.value = "";
    }
}

// Função para alterar as horas de um curso
function alterarHoras() {
    var selectElement = document.getElementById("select-curso");
    var novasHorasElement = document.getElementById("novas-horas");

    var cursoIndex = selectElement.value;

    if (cursoIndex !== "") {
        // Obter a lista de dados do armazenamento local
        var listaDeDados = obterListaDeDados();

        // Obter o curso selecionado
        var curso = listaDeDados[parseInt(cursoIndex)];

        // Converter as horas para um número inteiro
        var novasHoras = parseInt(novasHorasElement.value);

        // Verificar se o valor é um número válido
        if (!isNaN(novasHoras)) {
            // Atualizar as horas do curso
            curso.horas = novasHoras.toString();

            // Salvar a lista atualizada no armazenamento local
            salvarListaDeDados(listaDeDados);

            // Exibir uma mensagem de sucesso
            alert("Horas do curso alteradas com sucesso!");

            // Limpar o campo de novas horas
            novasHorasElement.value = "";
        } else {
            // Exibir uma mensagem de erro se o valor não for um número válido
            alert("Por favor, insira um valor numérico válido para as novas horas.");
        }
    } else {
        // Exibir uma mensagem de erro se nenhum curso for selecionado
        alert("Selecione um curso para alterar as horas.");
    }
}

// Função para obter a lista de dados do armazenamento local
function obterListaDeDados() {
    var listaJSON = localStorage.getItem("listaDeDados");
    if (listaJSON) {
        return JSON.parse(listaJSON);
    } else {
        return [];
    }
}

// Função para salvar a lista de dados no armazenamento local
function salvarListaDeDados(listaDeDados) {
    var listaJSON = JSON.stringify(listaDeDados);
    localStorage.setItem("listaDeDados", listaJSON);
}

// Carrega os cursos salvos (se existirem) ao carregar a página
window.addEventListener("load", function() {
    popularListaDeCursos();
});
