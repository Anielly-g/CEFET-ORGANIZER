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
    }
  }
  
  // Função para adicionar uma categoria ao curso selecionado
  function adicionarCategoriaAoCurso() {
    var cursoIndex = localStorage.getItem("cursoSelecionado");
    var categoria = document.getElementById("categoria").value;
    var horas = document.getElementById("horas").value;
  
    if (cursoIndex !== "" && categoria !== "" && horas !== "") {
      // Obter a lista de dados do armazenamento local
      var listaDeDados = obterListaDeDados();
  
      // Obter o curso selecionado
      var curso = listaDeDados[parseInt(cursoIndex)];
  
      // Verificar se a propriedade 'categorias' existe e criar uma matriz vazia se não existir
      if (!curso.hasOwnProperty('categorias')) {
        curso.categorias = [];
      }
  
      // Adicionar a nova categoria ao curso com as horas informadas
      curso.categorias.push({
        nome: categoria,
        horas: horas
      });
  
      // Salvar a lista de dados atualizada no armazenamento local
      salvarListaDeDados(listaDeDados);
  
      // Limpar os campos de categoria e horas
      document.getElementById("categoria").value = "";
      document.getElementById("horas").value = "";
  
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
  