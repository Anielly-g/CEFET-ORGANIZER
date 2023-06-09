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
function salvarListaDeDados(lista) {
    var listaJSON = JSON.stringify(lista);
    localStorage.setItem("listaDeDados", listaJSON);
}

// Função para lidar com o envio do formulário
function enviarFormulario() {
    // Obter os valores dos campos de entrada
    var nome = document.getElementById("nome").value;
    var horas = document.getElementById("horas").value;
    
    // Verificar se os campos estão vazios ou se o formato das horas é inválido
    if (nome === "" || horas === "" || !/^\d+$/.test(horas)) {
        alert("Por favor, preencha o campo de horas com um número válido.");
        return; // Retorna para evitar o envio do formulário
    }
    
    // Converter o valor de horas para um número inteiro
    horas = parseInt(horas);
    
    // Obter a lista de dados do armazenamento local
    var listaDeDados = obterListaDeDados();
    
    // Criar um objeto com os dados do formulário
    var dados = {
        nome: nome,
        horas: horas
    };
    
    // Armazenar o objeto de dados na lista
    listaDeDados.push(dados);
    
    // Salvar a lista atualizada no armazenamento local
    salvarListaDeDados(listaDeDados);
    
    // Limpar os campos de entrada
    document.getElementById("nome").value = "";
    document.getElementById("horas").value = "";
    
    // Exibir uma mensagem de sucesso
    alert("Dados enviados com sucesso!");
    
    // Exibir os dados no console
    console.log(listaDeDados);
}

