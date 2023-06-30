// Recupera o objeto aluno do Local Storage
const alunoString = localStorage.getItem('aluno');
const aluno = alunoString ? JSON.parse(alunoString) : null;

console.log(alunoString);

// Função para popular a lista de seleção de cursos
function popularListaDeCursos() {
  var selectElement = document.getElementById("select-curso");
  selectElement.innerHTML = "";

  // Verificar se o objeto aluno existe e possui a propriedade 'curso'
  if (aluno && aluno.curso) {
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

  // Limpar as opções de categorias
  var selectCategoriaElement = document.getElementById("select-categoria");
  selectCategoriaElement.innerHTML = "";

  // Adicionar as opções de categorias apenas se existirem
  if (aluno && aluno.curso && aluno.curso.categorias.length > 0) {
    for (var i = 0; i < aluno.curso.categorias.length; i++) {
      var categoria = aluno.curso.categorias[i];
      var optionCategoria = document.createElement("option");
      optionCategoria.value = i;
      optionCategoria.textContent = categoria.nome;
      selectCategoriaElement.appendChild(optionCategoria);
    }
  }

  // Atualizar as horas feitas e faltantes com base na categoria selecionada
  selecionarCategoria();
}

// Função para selecionar um curso da lista
function selecionarCurso() {
  var selectCursoElement = document.getElementById("select-curso");
  var selectCategoriaElement = document.getElementById("select-categoria");
  var horasFeitasElement = document.getElementById("horas-feitas");
  var horasFaltantesElement = document.getElementById("horas-faltantes");

  var cursoIndex = selectCursoElement.value;

  if (cursoIndex !== "") {
    // Obter o curso do aluno
    var curso = aluno.curso;

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
      horasFeitasElement.textContent = categoriaSelecionada.horasFeitas;
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
    // Obter o curso selecionado do aluno
    var curso = aluno.curso;

    // Obter a categoria selecionada
    var categoria = curso.categorias[parseInt(categoriaIndex)];

    // Atualizar as horas feitas e faltantes
    horasFeitasElement.textContent = categoria.horasFeitas || 0;
    horasFaltantesElement.textContent = categoria.horas - (categoria.horasFeitas || 0);

    // Atualizar as horas feitas no objeto aluno
    aluno.curso.categorias[parseInt(categoriaIndex)].horasFeitas = categoria.horasFeitas || 0;
  }
}

// Função para adicionar horas à categoria selecionada
function adicionarHoras() {
  var selectCursoElement = document.getElementById("select-curso");
  var selectCategoriaElement = document.getElementById("select-categoria");
  var horasInput = document.getElementById("horas-input");
  var horasFeitasElement = document.getElementById("horas-feitas");
  var horasFaltantesElement = document.getElementById("horas-faltantes");

  var cursoIndex = selectCursoElement.value;
  var categoriaIndex = selectCategoriaElement.value;
  var horas = parseInt(horasInput.value);

  if (cursoIndex !== "" && categoriaIndex !== "" && !isNaN(horas)) {
    // Obter o curso do aluno
    var curso = aluno.curso;

    // Obter a categoria selecionada
    var categoria = curso.categorias[parseInt(categoriaIndex)];

    // Verificar se a categoria já possui horas feitas
    if (categoria.hasOwnProperty("horasFeitas")) {
      var horasFeitasAtual = categoria.horasFeitas;
      var horasTotais = categoria.horas;

      // Verificar se a quantidade de horas a serem adicionadas ultrapassa as horas totais
      if (horasFeitasAtual + horas > horasTotais) {
        alert("A quantidade de horas adicionadas excede o total de horas necessárias!");
        return;
      }

      categoria.horasFeitas += horas;
    } else {
      categoria.horasFeitas = horas;
    }

    // Calcular as horas faltantes
    categoria.horasFaltantes = Math.max(0, categoria.horas - (categoria.horasFeitas || 0));

    // Atualizar as horas feitas e faltantes
    horasFeitasElement.textContent = categoria.horasFeitas || 0;
    horasFaltantesElement.textContent = categoria.horasFaltantes;

    // Limpar o campo de horas
    horasInput.value = "";
    

    // Salvar o objeto aluno atualizado no Local Storage
    localStorage.setItem('aluno', JSON.stringify(aluno));

    console.log(aluno);

  }
}

// Carrega os cursos salvos (se existirem) ao carregar a página
window.addEventListener("load", function () {
  popularListaDeCursos();
});


