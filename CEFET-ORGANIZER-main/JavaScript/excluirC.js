// Recupera o objeto aluno do Local Storage
const alunoString = localStorage.getItem('aluno');
const aluno = alunoString ? JSON.parse(alunoString) : null;

// Função para popular a lista de seleção de cursos
function popularListaDeCursos() {
  var selectElement = document.getElementById("select-curso");
  selectElement.innerHTML = "";

  // Criar uma única opção com o nome do curso do aluno
  var option = document.createElement("option");
  option.value = 0;
  option.textContent = aluno.curso.nome;
  selectElement.appendChild(option);

  if (!aluno.curso.hasOwnProperty("categorias")) {
    aluno.curso.categorias = [];
  }

  // Limpar as opções de categorias
  var selectCategoriaElement = document.getElementById("select-categoria");
  selectCategoriaElement.innerHTML = "";

  // Adicionar as opções de categorias apenas se existirem
  if (aluno.curso.categorias.length > 0) {
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
    // Atualizar as opções de categorias
    var curso = aluno.curso;
    var categorias = curso.categorias;

    selectCategoriaElement.innerHTML = "";

    for (var i = 0; i < categorias.length; i++) {
      var categoria = categorias[i];
      var option = document.createElement("option");
      option.value = i;
      option.textContent = categoria.nome;
      selectCategoriaElement.appendChild(option);
    }

    // Atualizar as horas feitas e faltantes
    var categoriaSelecionada = categorias[selectCategoriaElement.value];
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
    // Obter a categoria selecionada
    var categoria = aluno.curso.categorias[parseInt(categoriaIndex)];

    // Atualizar as horas feitas e faltantes
    horasFeitasElement.textContent = categoria.horasFeitas || 0;
    horasFaltantesElement.textContent = categoria.horas - (categoria.horasFeitas || 0);
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
    // Obter a categoria selecionada
    var categoria = aluno.curso.categorias[parseInt(categoriaIndex)];

    // Verificar se a categoria já possui horas feitas
    if (categoria.hasOwnProperty("horasFeitas")) {
      var horasFeitasAtual = categoria.horasFeitas;

      // Verificar se a quantidade de horas a serem excluídas é válida
      if (horas > horasFeitasAtual) {
        alert("A quantidade de horas a excluir é maior do que as horas feitas!");
        return;
      }

      categoria.horasFeitas -= horas;
    }

    // Calcular as horas faltantes
    categoria.horasFaltantes = Math.max(0, categoria.horas - categoria.horasFeitas);

    // Atualizar as horas feitas e faltantes
    horasFeitasElement.textContent = categoria.horasFeitas || 0;
    horasFaltantesElement.textContent = categoria.horasFaltantes;

    // Limpar o campo de horas
    horasInput.value = "";

    // Salvar o objeto aluno atualizado no Local Storage
    localStorage.setItem('aluno', JSON.stringify(aluno));
  }
}

// Carrega os cursos salvos (se existirem) ao carregar a página
window.addEventListener("load", function () {
  popularListaDeCursos();
});

function salvarAluno() {
  localStorage.setItem('aluno', JSON.stringify(aluno));
}

// Registrar o evento 'beforeunload' para chamar a função 'salvarAluno' antes de sair da página
window.addEventListener('beforeunload', function(event) {
  salvarAluno();
});
