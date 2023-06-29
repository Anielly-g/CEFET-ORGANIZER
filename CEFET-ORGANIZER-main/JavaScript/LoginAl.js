// Função para obter a lista de alunos do armazenamento local
function obterListaDeAlunos() {
    var listaJSON = localStorage.getItem("listaDeAlunos");
    if (listaJSON) {
        return JSON.parse(listaJSON);
    } else {
        return [];
    }
}
// Função para verificar o login
function fazerLogin() {
    var email = document.getElementById("email-login").value;
    var senha = document.getElementById("senha-login").value;

    if (email === "" || senha === "") {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    var listaDeAlunos = obterListaDeAlunos();


    // Verifica se há um aluno com o email e senha fornecidos
    var alunoEncontrado = listaDeAlunos.find(function(aluno) {
        return aluno.email === email && aluno.senha === senha;
    });

    

    if (alunoEncontrado) {
        
        window.location.href = "aluno.html?aluno=" + encodeURIComponent(JSON.stringify(alunoEncontrado));
      

    } else {
        alert("Email ou senha incorretos.");
    }
}