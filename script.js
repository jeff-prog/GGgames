let score = 0;

const coin = document.getElementById('coin');
const scoreDisplay = document.getElementById('score');
const resetButton = document.getElementById('reset-button');

// Evento de clique na moeda
coin.addEventListener('click', () => {
    score += 10; // Aumenta 10 pontos por clique
    scoreDisplay.textContent = score;
    coin.style.transform = `scale(${1 + score / 100})`; // Anima a moeda conforme a pontuação aumenta
});

// Evento de clique no botão de reset
resetButton.addEventListener('click', () => {
    score = 0;
    scoreDisplay.textContent = score;
    coin.style.transform = 'scale(1)';
});
