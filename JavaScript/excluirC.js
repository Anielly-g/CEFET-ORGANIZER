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
    var horasFeitasElement = document.getElementById("horas-feitas");
    var horasFaltantesElement = document.getElementById("horas-faltantes");
  
    var cursoIndex = selectCursoElement.value;
  
    if (cursoIndex !== "") {
      // Obter a lista de dados do armazenamento local
      var listaDeDados = obterListaDeDados();
  
      // Obter o curso selecionado
      var curso = listaDeDados[parseInt(cursoIndex)];
  
      // Verificar se a propriedade 'categorias' existe e criar uma matriz vazia se não existir
      if (!curso.hasOwnProperty("categorias")) {
        curso.categorias = [];
      }
  
      // Limpar as opções de categorias
      selectCategoriaElement.innerHTML = "";
  
      // Iterar sobre as categorias do curso e criar opções para cada categoria
      for (var i = 0; i < curso.categorias.length; i++) {
        var categoria = curso.categorias[i];
        var option = document.createElement("option");
        option.value = i;
        option.textContent = categoria.nome;
        selectCategoriaElement.appendChild(option);
      }
  
      // Atualizar as horas feitas e faltantes
      var categoriaSelecionada = curso.categorias[selectCategoriaElement.value];
      if (categoriaSelecionada) {
        horasFeitasElement.textContent = categoriaSelecionada.horasFeitas || 0;
        horasFaltantesElement.textContent = categoriaSelecionada.horas;
      } else {
        horasFeitasElement.textContent = 0;
        horasFaltantesElement.textContent = 0;
      }
    }
  }
  
  // Função para selecionar uma categoria do curso
  function selecionarCategoria() {
    var selectCursoElement = document.getElementById("select-curso");
    var selectCategoriaElement = document.getElementById("select-categoria");
    var horasFeitasElement = document.getElementById("horas-feitas");
    var horasFaltantesElement = document.getElementById("horas-faltantes");
  
    var cursoIndex = selectCursoElement.value;
    var categoriaIndex = selectCategoriaElement.value;
  
    if (cursoIndex !== "" && categoriaIndex !== "") {
      // Obter a lista de dados do armazenamento local
      var listaDeDados = obterListaDeDados();
  
      // Obter o curso selecionado
      var curso = listaDeDados[parseInt(cursoIndex)];
  
      // Obter a categoria selecionada
      var categoria = curso.categorias[parseInt(categoriaIndex)];
  
      // Atualizar as horas feitas e faltantes
      horasFeitasElement.textContent = categoria.horasFeitas || 0;
      horasFaltantesElement.textContent = categoria.horas - categoria.horasFeitas;
    }
  }
  
  // Função para excluir horas da categoria selecionada
  function excluirHoras() {
    var selectCursoElement = document.getElementById("select-curso");
    var selectCategoriaElement = document.getElementById("select-categoria");
    var horasInput = document.getElementById("horas-input");
    var horasFeitasElement = document.getElementById("horas-feitas");
    var horasFaltantesElement = document.getElementById("horas-faltantes");
  
    var cursoIndex = selectCursoElement.value;
    var categoriaIndex = selectCategoriaElement.value;
    var horas = parseInt(horasInput.value);
  
    if (cursoIndex !== "" && categoriaIndex !== "" && !isNaN(horas)) {
      // Obter a lista de dados do armazenamento local
      var listaDeDados = obterListaDeDados();
  
      // Obter o curso selecionado
      var curso = listaDeDados[parseInt(cursoIndex)];
  
      // Obter a categoria selecionada
      var categoria = curso.categorias[parseInt(categoriaIndex)];
  
      // Verificar se a categoria já possui horas feitas
      if (categoria.hasOwnProperty("horasFeitas")) {
        var horasFeitasAtual = categoria.horasFeitas;
  
        // Verificar se a quantidade de horas a serem excluídas é maior do que as horas feitas
        if (horas > horasFeitasAtual) {
          alert("A quantidade de horas a excluir é maior do que as horas feitas!");
          return;
        }
  
        categoria.horasFeitas -= horas;
      }
  
      // Calcular as horas faltantes
      categoria.horasFaltantes = Math.max(0, categoria.horas - categoria.horasFeitas);
  
      // Atualizar as horas feitas e faltantes
      horasFeitasElement.textContent = categoria.horasFeitas;
      horasFaltantesElement.textContent = categoria.horasFaltantes;
  
      // Salvar a lista de dados atualizada no armazenamento local
      salvarListaDeDados(listaDeDados);
  
      // Limpar o campo de horas
      horasInput.value = "";
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
  window.addEventListener("load", function () {
    popularListaDeCursos();
  });