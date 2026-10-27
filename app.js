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

const alterarStatusTarefa = (item,status) => {
  const listaId = item.id.split('-');
  const tarefas = JSON.parse(localStorage.getItem('tarefas') || '[]');
  if(status !== 'excluida') {
    tarefas[Number(listaId[1])] = {
      ...tarefas[Number(listaId[1])],
      status
    };
  } else {
    tarefas.splice(Number(listaId[1]), 1);
  }
  localStorage.setItem('tarefas',JSON.stringify(tarefas));
  carregarTarefas();
}

const criarElementos = (tarefas) => {
  tarefas.forEach((tarefa) => {
    const {id, descricao, status} = tarefa
    const item = document.createElement('li');
    item.classList.add('tarefa')
    const texto = document.createElement('span');
    texto.id = `tarefa-${id}`;
    texto.textContent = `${id+1}. ${descricao}`;
    item.classList.add(status);
    item.appendChild(texto);

    if (status !== 'concluida') {
      if (status === 'andamento') {
        const botao = document.createElement('button');
        botao.type = 'button';
        botao.textContent = '⏸️';
        botao.title = 'Pausar tarefa';
        botao.onclick = () => alterarStatusTarefa(texto,'pausada');
        botao.classList.add('botao-pausar');
        botao.id = `botao-pausar-${id}`;
        item.appendChild(botao);
      }
      if (['aberta','pausada'].includes(status)) {
        const botao = document.createElement('button');
        botao.type = 'button';
        botao.textContent = '▶️';
        botao.title = 'Iniciar tarefa';
        botao.onclick = () => alterarStatusTarefa(texto,'andamento');
        botao.classList.add('botao-iniciar');
        botao.id = `botao-iniciar-${id}`;
        item.appendChild(botao);
      } else {
        const botao = document.createElement('button');
        botao.type = 'button';
        botao.textContent = '✅';
        botao.title = 'Concluir tarefa';
        botao.onclick = () => alterarStatusTarefa(texto,'concluida');
        botao.classList.add('botao-concluir');
        botao.id = `botao-concluir-${id}`;
        item.appendChild(botao);
      }
      const botao = document.createElement('button');
      botao.type = 'button';
      botao.textContent = '🗑️';
      botao.title = 'Excluir tarefa';
      botao.classList.add('botao-excluir');
      botao.onclick = () => alterarStatusTarefa(texto,'excluida');
      botao.id = `botao-excluir-${id}`;
      item.appendChild(botao);
    }
    lista.appendChild(item);
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
    id: tarefas.length,
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