// Função para limpar o gráfico de pizza
function limparGraficoPizza() {
  var chartElement = document.getElementById("grafico-pizza");

  if (chartElement) {
    chartElement.innerHTML = "";
  }
}


// Recupera o objeto aluno do Local Storage
const alunoString = localStorage.getItem('aluno');
const aluno = alunoString ? JSON.parse(alunoString) : null;


function popularListaDeCursos() {
  var selectElement = document.getElementById("select-curso");
  selectElement.innerHTML = "";

  var option2 = document.createElement("option");
  option2.textContent = "Selecione o curso";
  option2.selected="selected";
  option2.setAttribute('disabled','');
  selectElement.appendChild(option2);


  // Criar uma única opção com o nome do curso do aluno
  var option = document.createElement("option");
  option.value = 0;
  option.textContent = aluno.curso.nome;
  selectElement.appendChild(option);

  // Verificar se a propriedade 'categorias' existe e criar uma matriz vazia se não existir
  if (!aluno.curso.hasOwnProperty("categorias")) {
    aluno.curso.categorias = [];
  }
}

function selecionarCurso() {
  var selectCursoElement = document.getElementById("select-curso");
  var cursoIndex = selectCursoElement.value;

  if (cursoIndex !== "") {
    
    var curso=aluno.curso;

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

window.addEventListener("load", function () {
  popularListaDeCursos();
})

function salvarAluno() {
  localStorage.setItem('aluno', JSON.stringify(aluno));
}

// Registrar o evento 'beforeunload' para chamar a função 'salvarAluno' antes de sair da página
window.addEventListener('beforeunload', function(event) {
  salvarAluno();
});