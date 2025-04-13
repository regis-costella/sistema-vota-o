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
    const resultadosContainer = document.getElementById('resultados');
    resultadosContainer.innerHTML = "<p>Resultado da votação:</p>";

    for (const opcao in votos) {
        const p = document.createElement("p");
        p.textContent = `${opcao}: ${votos[opcao]} voto(s)`;
        resultadosContainer.appendChild(p);
    }
}

// Função para reiniciar a votação (admin)
function reiniciarVotacao() {
    votos = {}; // Zera tudo
    const botoes = document.querySelectorAll('.opcoes-voto button');

    botoes.forEach(button => {
        const texto = button.textContent.trim();
        votos[texto] = 0; // Recria opções com 0
        button.disabled = false;
    });

    salvarVotos();
    atualizarResultados();

    document.getElementById('resultados').innerHTML = "<p>Escolha sua opção de voto:</p>";
}


// Atualiza os resultados na página do admin assim que abre
atualizarResultados();

