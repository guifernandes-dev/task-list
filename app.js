const formulario = document.querySelector('#form-tarefa');
const campo = document.querySelector('#nova-tarefa');
const lista = document.querySelector('#lista-tarefas');
const contador = document.querySelector('#contador');

const atualizarContador = (tarefas) => {  
  const pendentes = tarefas.length;
  contador.textContent = pendentes === 0
    ? 'Nenhuma tarefa pendente'
    : `Tarefas pendentes: ${pendentes}`
}

const carregarTarefas = () => {
  lista.replaceChildren();
  const tarefas = JSON.parse(localStorage.getItem('tarefas') || '[]');

  tarefas.forEach((tarefa) => {
    const item = document.createElement('li');
    item.classList.add('tarefa');
    item.textContent = tarefa.descricao;
    item.classList.add(tarefa.status);
    lista.appendChild(item);
  });

  atualizarContador(tarefas);
};

function adicionarTarefa(event) {
  event.preventDefault();

  const texto = campo.value.trim();
  const tarefas = JSON.parse(localStorage.getItem('tarefas') || '[]');

  if (texto === '') {
    campo.value = ''
    alert('⚠️ Campo vazio! ⚠️');
    return;
  };

  tarefas.push({
    descricao: texto,
    status: 'aberto'
  })
  localStorage.setItem('tarefas',JSON.stringify(tarefas));
  carregarTarefas();

  campo.value = '';
  campo.focus();
}

carregarTarefas();

// formulario.addEventListener("submit", adicionarTarefa);