// Função para obter a lista de dados do armazenamento local
function obterListaDeDados() {
    var listaJSON = localStorage.getItem("listaDeDados");
    if (listaJSON) {
        return JSON.parse(listaJSON);
    } else {
        return [];
    }
}



function obterListaDeAlunos() {
    var listaJSON = localStorage.getItem("listaDeAlunos");
    if (listaJSON) {
      return JSON.parse(listaJSON);
    } else {
      return [];
    }
}


  
  // Função para salvar a lista de alunos no armazenamento local
function salvarListaDeAlunos(lista) {
    var listaJSON = JSON.stringify(lista);
    localStorage.setItem("listaDeAlunos", listaJSON);
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

// Função para excluir um curso selecionado
// Função para excluir um curso selecionado
function excluirCurso() {
  var selectElement = document.getElementById("select-curso");
  var cursoIndex = selectElement.value;

  if (cursoIndex !== "") {
    // Obter a lista de dados do armazenamento local
    var listaDeDados = obterListaDeDados();

    // Obter o curso selecionado
    var cursoSelecionado = listaDeDados[cursoIndex].nome;

    // Remover o curso selecionado da lista
    listaDeDados.splice(cursoIndex, 1);

    // Obter a lista de alunos do armazenamento local
    var listaDeAlunos = obterListaDeAlunos();

    // Percorrer a lista de alunos e remover os alunos associados ao curso selecionado
    for (var i = listaDeAlunos.length - 1; i >= 0; i--) {
      var aluno = listaDeAlunos[i];
      if (aluno.curso && aluno.curso.nome === cursoSelecionado) {
        listaDeAlunos.splice(i, 1);
      }
    }

    // Salvar as listas atualizadas no armazenamento local
    salvarListaDeDados(listaDeDados);
    salvarListaDeAlunos(listaDeAlunos);

    // Atualizar a lista de seleção de cursos
    popularListaDeCursos();

    console.log(listaDeAlunos);

    // Exibir uma mensagem de sucesso
    alert("Curso excluído e alunos associados removidos com sucesso!");
  } else {
    // Exibir uma mensagem de erro se nenhum curso for selecionado
    alert("Selecione um curso para excluí-lo.");
  }
}





// Carrega os cursos salvos (se existirem) ao carregar a página
window.addEventListener("load", function() {
    popularListaDeCursos();
});
