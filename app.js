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



const criarElementos = (tarefas) => {
  tarefas.forEach((tarefa) => {
    const item = document.createElement('li');
    item.classList.add('tarefa');
    item.textContent = tarefa.descricao;
    item.classList.add(tarefa.status);
    lista.appendChild(item);

    if (tarefa.status !== 'concluida') {
      if (tarefa.status === 'aberta') {
        const botao = document.createElement('button');
        botao.type = 'button';
        botao.textContent = '🚀';
        botao.title = 'Iniciar tarefa';
        botao.classList.add('botao-iniciar');
        lista.appendChild(botao);
      } else {
        const botao = document.createElement('button');
        botao.type = 'button';
        botao.textContent = '✅';
        botao.title = 'Concluir tarefa';
        botao.classList.add('botao-concluir');
        lista.appendChild(botao);
      }
      const botao = document.createElement('button');
      botao.type = 'button';
      botao.textContent = '🗑️';
      botao.title = 'Excluir tarefa';
      botao.classList.add('botao-excluir');
      lista.appendChild(botao);
    }
  });
};

const carregarTarefas = () => {
  lista.replaceChildren();
  const tarefas = JSON.parse(localStorage.getItem('tarefas') || '[]');

  criarElementos(tarefas);

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
    status: 'aberta'
  })
  localStorage.setItem('tarefas',JSON.stringify(tarefas));
  carregarTarefas();

  campo.value = '';
  campo.focus();
}

carregarTarefas();

// formulario.addEventListener("submit", adicionarTarefa);