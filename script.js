let coins = 0;
let coinsPerHour = 100;
let energy = 100;
let energyRegenRate = 10; // Energia regenerada por segundo
let clickEnergyCost = 20; // Energia consumida por clique

const coinElement = document.getElementById('coin');
const coinsElement = document.getElementById('coins');
const coinsPerHourElement = document.getElementById('coinsPerHour');
const energyElement = document.getElementById('energy');
const upgradeMenu = document.getElementById('upgradeMenu');

// Clique na moeda para ganhar moedas
coinElement.addEventListener('click', () => {
    if (energy >= clickEnergyCost) {
        coins += Math.floor(coinsPerHour / 3600); // Moedas por clique (baseado no ganho por hora)
        coinsElement.innerText = coins;
        energy -= clickEnergyCost;
        updateEnergyBar();
    } else {
        alert('Sem energia suficiente! Aguarde recarga.');
    }
});

// Atualiza a barra de energia
function updateEnergyBar() {
    energyElement.style.width = energy + '%';
}

// Regeneração de energia com o tempo
function regenerateEnergy() {
    if (energy < 100) {
        energy += energyRegenRate;
        if (energy > 100) energy = 100;
        updateEnergyBar();
    }
}
setInterval(regenerateEnergy, 1000); // Recarrega energia a cada segundo

// Ação do botão de Upgrade para abrir o menu
document.getElementById('upgradeButton').addEventListener('click', () => {
    upgradeMenu.classList.remove('hidden'); // Mostrar o menu de upgrade
    document.querySelector('.container').classList.add('hidden'); // Esconder o jogo
});

// Botão de voltar no menu de upgrade
document.getElementById('backButton').addEventListener('click', () => {
    upgradeMenu.classList.add('hidden'); // Esconder o menu de upgrade
    document.querySelector('.container').classList.remove('hidden'); // Mostrar o jogo
});

// Melhorar ganho de moedas (+50 por hora)
document.getElementById('improve50').addEventListener('click', () => {
    if (coins >= 200) { // Exemplo de condição para fazer upgrade
        coins -= 200;
        coinsPerHour += 50;
        coinsElement.innerText = coins;
        coinsPerHourElement.innerText = coinsPerHour;
    } else {
        alert('Moedas insuficientes para esse upgrade!');
    }
});

// Melhorar ganho de moedas (+100 por hora)
document.getElementById('improve100').addEventListener('click', () => {
    if (coins >= 400) { // Exemplo de condição para fazer upgrade
        coins -= 400;
        coinsPerHour += 100;
        coinsElement.innerText = coins;
        coinsPerHourElement.innerText = coinsPerHour;
    } else {
        alert('Moedas insuficientes para esse upgrade!');
    }
});
