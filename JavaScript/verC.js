// Função para limpar o gráfico de pizza
function limparGraficoPizza() {
    var chartElement = document.getElementById("grafico-pizza");
  
    if (chartElement) {
      chartElement.innerHTML = "";
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
  
  // Função para criar o gráfico de pizza com base nas horas feitas de cada categoria
  function criarGraficoPizza(horasFeitas, horasTotais) {
    var options = {
      chart: {
        type: 'pie',
        height: 400
      },
      series: [horasFeitas, horasTotais - horasFeitas],
      labels: ['Horas Feitas', 'Horas Restantes'],
      colors: ['#008FFB', '#ECECEC'],
      tooltip: {
        y: {
          formatter: function (value) {
            return value + " horas";
          }
        }
      }
    };
  
    var chartElement = document.getElementById("grafico-pizza");
  
    if (chartElement) {
      limparGraficoPizza();
      var chart = new ApexCharts(chartElement, options);
      chart.render();
    }
  }
  
  // Função para atualizar o gráfico de pizza com base no curso selecionado
  function selecionarCurso() {
    var selectCursoElement = document.getElementById("select-curso");
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
  
      // Calcular as horas feitas de todas as categorias do curso
      var horasFeitasTotal = 0;
      for (var i = 0; i < curso.categorias.length; i++) {
        var categoria = curso.categorias[i];
        if (categoria.hasOwnProperty("horasFeitas")) {
          horasFeitasTotal += categoria.horasFeitas;
        }
      }
  
      // Criar o gráfico de pizza com base nas horas feitas e horas totais
      criarGraficoPizza(horasFeitasTotal, curso.horas);
    }
  }
  
  // Carrega os cursos salvos (se existirem) ao carregar a página
  window.addEventListener("load", function () {
    popularListaDeCursos();
  });
  