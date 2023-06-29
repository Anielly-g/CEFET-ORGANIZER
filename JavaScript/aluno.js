// Obtém o valor do parâmetro "aluno" da URL
const urlParams = new URLSearchParams(window.location.search);
const alunoParam = urlParams.get('aluno');

console.log(alunoParam);
// Desserializa o objeto aluno
const aluno = JSON.parse(decodeURIComponent(alunoParam));

console.log(aluno);


// Armazena o objeto aluno no Local Storage
if (localStorage.getItem('aluno', JSON.stringify(aluno)) === null) localStorage.setItem('aluno', JSON.stringify(aluno));

// Função para salvar o objeto aluno no Local Storage
function salvarAluno() {
  localStorage.setItem('aluno', JSON.stringify(aluno));
}
