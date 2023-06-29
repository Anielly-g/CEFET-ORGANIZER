// Função para obter a lista de dados do armazenamento local
function obterListaDeDados() {
    var listaJSON = localStorage.getItem("listaDeDados");
    if (listaJSON) {
        return JSON.parse(listaJSON);
    } else {
        return [];
    }
}
// Função para excluir alunos manualmente
/*function excluirAlunosManualmente() {
    // Obter a lista de alunos do armazenamento local
    var listaDeAlunos = obterListaDeAlunos();
  
    // Excluir todos os alunos da lista
    listaDeAlunos = [];
  
    // Salvar a lista vazia no armazenamento local
    salvarListaDeAlunos(listaDeAlunos);
  
    alert("Alunos excluídos com sucesso!");
  }*/
  
// Função para obter a lista de alunos do armazenamento local
function obterListaDeAlunos() {
    var listaJSON = localStorage.getItem("listaDeAlunos");
    if (listaJSON) {
        return JSON.parse(listaJSON);
    } else {
        return [];
    }
}

// Função para salvar a lista de alunos no armazenamento local
function salvarListaDeAlunos(listaDeAlunos) {
    var listaJSON = JSON.stringify(listaDeAlunos);
    localStorage.setItem("listaDeAlunos", listaJSON);
}

// Função para popular a lista de cursos disponíveis no campo de seleção
function popularListaDeCursos() {
    var selectElement = document.getElementById("select-curso");
    selectElement.innerHTML = "";

    // Obter a lista de dados do armazenamento local
    var listaDeDados = obterListaDeDados();

    // Iterar sobre a lista de cursos e criar opções para cada curso
    for (var i = 0; i < listaDeDados.length; i++) {
        var curso = listaDeDados[i];
        var option = document.createElement("option");
        option.value = curso.nome;
        option.textContent = curso.nome;
        selectElement.appendChild(option);
    }
}

// Função para lidar com o envio do formulário
function enviarFormulario() {
    var nome = document.getElementById("nome").value;
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;
    var cursoNome = document.getElementById("select-curso").value;



    if (nome === "" || email === "" || senha === "" || cursoNome === "") {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    var listaDeDados = obterListaDeDados();
    var listaDeAlunos = obterListaDeAlunos();

    

    // Localizar o curso na lista de dados
    var curso = listaDeDados.find(function(curso) {
        return curso.nome === cursoNome;
    });

    if (!curso) {
        alert("Curso não encontrado na lista de dados.");
        return;
    }

    var aluno = {
        nome: nome,
        email: email,
        senha: senha,
        curso: curso // Associando o objeto do curso ao aluno
    };

    listaDeAlunos.push(aluno); // Adicionando o aluno à lista de alunos

    salvarListaDeAlunos(listaDeAlunos);

    document.getElementById("cadastroForm").reset();

    alert("Cadastro realizado com sucesso!");

    console.log(listaDeAlunos);
}

// Carrega os cursos salvos (se existirem) ao carregar a página
window.addEventListener("load", function() {
    popularListaDeCursos();
});

function redirecionarParaCadastro() {
    window.location.href = "cadastro.html"; // Substitua "cadastro.html" pelo caminho da página para a qual deseja redirecionar
  }
  