// Função para verificar o email e a senha
function verificarLogin() {
    // Obtém os valores digitados pelo usuário
    var email = document.getElementById('username').value;
    var senha = document.getElementById('password').value;
  
    // Verifica se o email e a senha correspondem aos valores desejados
    if (email === 'adm@cefet.com' && senha === 'cefet2023') {
      // Redireciona para a página "adm.html"
      window.location.href = 'adm.html';
    } else {
      // Exibe uma mensagem de erro
      alert('Email ou senha incorretos. Por favor, tente novamente.');
    }
  }