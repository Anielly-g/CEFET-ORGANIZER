// Obtém o valor do parâmetro "aluno" da URL
const urlParams = new URLSearchParams(window.location.search);
const alunoParam = urlParams.get('aluno');

console.log(alunoParam);

// Desserializa o objeto aluno
const aluno = JSON.parse(decodeURIComponent(alunoParam));

console.log(aluno);

// Verifica se já existe um objeto aluno no Local Storage
const alunoExistente = localStorage.getItem('aluno');

if (alunoExistente) {
  // Se já existe um objeto aluno no Local Storage, usa o valor existente
  const alunoArmazenado = JSON.parse(alunoExistente);
  localStorage.setItem('aluno', JSON.stringify(alunoArmazenado));
} else {
  // Se não existe um objeto aluno no Local Storage, armazena o novo valor
  localStorage.setItem('aluno', JSON.stringify(aluno));
}
