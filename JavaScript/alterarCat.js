// Função para popular a lista de seleção de cursos
function popularListaDeCursos() {
  var selectElement = document.getElementById("select-curso");
  selectElement.innerHTML = "";

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

    // Limpar as opções de categorias
    selectCategoriaElement.innerHTML = "";

    var option2 = document.createElement("option");
    option2.textContent = "Selecione a categoria";
    option2.disabled = true;
    option2.selected = true;
    selectCategoriaElement.appendChild(option2);


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

// Função para selecionar uma categoria do curso
function selecionarCategoria() {
  var cursoIndex = localStorage.getItem("cursoSelecionado");
  var categoriaIndex = document.getElementById("select-categoria").value;

  if (cursoIndex !== "" && categoriaIndex !== "") {
    // Obter a lista de dados do armazenamento local
    var listaDeDados = obterListaDeDados();

    // Obter o curso selecionado
    var curso = listaDeDados[parseInt(cursoIndex)];

    // Obter a categoria selecionada
    var categoria = curso.categorias[parseInt(categoriaIndex)];

    // Exibir as horas antigas da categoria
    document.getElementById("horas-antigas").textContent = "Horas Antigas: " + categoria.horas;
  } else {
    // Limpar as horas antigas se nenhuma categoria estiver selecionada
    document.getElementById("horas-antigas").textContent = "";
  }
}

// Função para alterar as horas da categoria
function alterarHorasCategoria() {
  var cursoIndex = localStorage.getItem("cursoSelecionado");
  var categoriaIndex = document.getElementById("select-categoria").value;
  var novasHoras = document.getElementById("novas-horas").value;

  if (cursoIndex !== "" && categoriaIndex !== "" && novasHoras !== "") {
    // Obter a lista de dados do armazenamento local
    var listaDeDados = obterListaDeDados();

    // Obter o curso selecionado
    var curso = listaDeDados[parseInt(cursoIndex)];

    // Obter a categoria selecionada
    var categoria = curso.categorias[parseInt(categoriaIndex)];

    // Alterar as horas da categoria
    categoria.horas = novasHoras;

    // Salvar a lista de dados atualizada no armazenamento local
    salvarListaDeDados(listaDeDados);

    // Limpar o campo de novas horas
    document.getElementById("novas-horas").value = "";

    // Exibir as horas atualizadas da categoria
    document.getElementById("horas-antigas").textContent = "Horas Atualizadas: " + categoria.horas;
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
