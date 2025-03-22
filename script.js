// Função para carregar votos salvos no localStorage
function carregarVotos() {
    let votosSalvos = localStorage.getItem("votos");
    return votosSalvos ? JSON.parse(votosSalvos) : { "Sim": 0, "Não": 0, "Abstenção": 0 };
}

// Inicia os votos carregando do localStorage
let votos = carregarVotos();

// Função para salvar votos no localStorage
function salvarVotos() {
    localStorage.setItem("votos", JSON.stringify(votos));
}

// Função para registrar o voto (usuário)
function votar(opcao) {
    votos[opcao]++;
    salvarVotos();
    desabilitarVotacao();
    atualizarResultados();
}

// Desabilita os botões de voto após votar
function desabilitarVotacao() {
    const buttons = document.querySelectorAll('.opcoes-voto button');
    buttons.forEach(button => button.disabled = true);
    document.getElementById('resultados').innerHTML = "<p>Obrigado pelo seu voto! Você já votou.</p>";
}

// Atualiza os resultados na página do administrador
function atualizarResultados() {
    if (document.getElementById('result-sim')) {
        document.getElementById('result-sim').textContent = votos['Sim'];
        document.getElementById('result-nao').textContent = votos['Não'];
        document.getElementById('result-abstencao').textContent = votos['Abstenção'];
    }
}

// Função para reiniciar a votação (admin)
function reiniciarVotacao() {
    votos = { "Sim": 0, "Não": 0, "Abstenção": 0 };
    salvarVotos();
    atualizarResultados();
    const buttons = document.querySelectorAll('.opcoes-voto button');
    buttons.forEach(button => button.disabled = false);
    document.getElementById('resultados').innerHTML = "<p>Escolha sua opção de voto:</p>";
}

// Atualiza os resultados na página do admin assim que abre
atualizarResultados();

