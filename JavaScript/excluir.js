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
function salvarListaDeDados(lista) {
    var listaJSON = JSON.stringify(lista);
    localStorage.setItem("listaDeDados", listaJSON);
}

// Função para popular a lista de seleção de cursos
function popularListaDeCursos() {
    var selectElement = document.getElementById("select-curso");
    selectElement.innerHTML = ""; // Limpar o conteúdo existente
    
    // Obter a lista de dados do armazenamento local
    var listaDeDados = obterListaDeDados();
    
    // Iterar sobre a lista de cursos e criar opções para cada curso
    for (var i = 0; i < listaDeDados.length; i++) {
        var curso = listaDeDados[i];
        var option = document.createElement("option");
        option.value = i;
        option.textContent = curso.nome;
        selectElement.appendChild(option);
    }
}

// Função para excluir um curso selecionado
function excluirCurso() {
    var selectElement = document.getElementById("select-curso");
    var cursoIndex = selectElement.value;
    
    if (cursoIndex !== "") {
        // Obter a lista de dados do armazenamento local
        var listaDeDados = obterListaDeDados();
        
        // Remover o curso selecionado da lista
        listaDeDados.splice(cursoIndex, 1);
        
        // Salvar a lista atualizada no armazenamento local
        salvarListaDeDados(listaDeDados);
        
        // Atualizar a lista de seleção de cursos
        popularListaDeCursos();
        
        // Exibir uma mensagem de sucesso
        alert("Curso excluído com sucesso!");
    } else {
        // Exibir uma mensagem de erro se nenhum curso for selecionado
        alert("Selecione um curso para excluí-lo.");
    }
}

// Carrega os cursos salvos (se existirem) ao carregar a página
window.addEventListener("load", function() {
    popularListaDeCursos();
});
