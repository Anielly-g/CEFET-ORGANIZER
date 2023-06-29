// Função para popular a lista de seleção de cursos
function popularListaDeCursos() {
  var selectElement = document.getElementById("select-curso");
  selectElement.innerHTML = "";

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

// Função para selecionar um curso da lista
function selecionarCurso() {
  var selectCursoElement = document.getElementById("select-curso");
  var selectCategoriaElement = document.getElementById("select-categoria");
  var cursoIndex = selectCursoElement.value;

  if (cursoIndex !== "") {
    // Obter a lista de dados do armazenamento local
    var listaDeDados = obterListaDeDados();

    // Obter o curso selecionado
    var curso = listaDeDados[parseInt(cursoIndex)];

    // Armazenar o índice do curso selecionado para referência posterior
    localStorage.setItem("cursoSelecionado", cursoIndex);

    // Atualizar o curso selecionado exibido
    var cursoSelecionado = curso.nome;
    document.getElementById("curso-selecionado").textContent = cursoSelecionado;

    // Limpar as opções de categorias
    selectCategoriaElement.innerHTML = "";

    // Iterar sobre as categorias do curso e criar opções para cada categoria
    if (curso.hasOwnProperty('categorias')) {
      for (var i = 0; i < curso.categorias.length; i++) {
        var categoria = curso.categorias[i];
        var option = document.createElement("option");
        option.value = i;
        option.textContent = categoria.nome;
        selectCategoriaElement.appendChild(option);
      }
    }
  }
}

// Função para excluir a categoria do curso selecionado
function excluirCategoriaDoCurso() {
  var cursoIndex = localStorage.getItem("cursoSelecionado");
  var categoriaIndex = document.getElementById("select-categoria").value;

  if (cursoIndex !== "" && categoriaIndex !== "") {
    // Obter a lista de dados do armazenamento local
    var listaDeDados = obterListaDeDados();

    // Obter o curso selecionado
    var curso = listaDeDados[parseInt(cursoIndex)];

    // Remover a categoria do curso
    curso.categorias.splice(parseInt(categoriaIndex), 1);

    // Salvar a lista de dados atualizada no armazenamento local
    salvarListaDeDados(listaDeDados);

    // Limpar a seleção da categoria
    document.getElementById("select-categoria").selectedIndex = 0;

    // Atualizar a seleção das categorias
    selecionarCurso();
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
