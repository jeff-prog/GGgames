let coins = 0;
let coinsPerHour = 100;
let energy = 100;
let energyRegenRate = 10; // Energy regenerated per second
let clickEnergyCost = 20;

const coinElement = document.getElementById('coin');
const coinsElement = document.getElementById('coins');
const coinsPerHourElement = document.getElementById('coinsPerHour');
const energyElement = document.getElementById('energy');
const upgradeMenu = document.getElementById('upgradeMenu');

coinElement.addEventListener('click', () => {
    if (energy >= clickEnergyCost) {
        coins += Math.floor(coinsPerHour / 3600); // Coins per click
        coinsElement.innerText = coins;
        energy -= clickEnergyCost;
        updateEnergyBar();
    }
});

function updateEnergyBar() {
    energyElement.style.width = energy + '%';
}

function regenerateEnergy() {
    if (energy < 100) {
        energy += energyRegenRate;
        if (energy > 100) energy = 100;
        updateEnergyBar();
    }
}

setInterval(regenerateEnergy, 1000);

document.getElementById('upgradeButton').addEventListener('click', () => {
    upgradeMenu.classList.remove('hidden');
});

function closeUpgradeMenu() {
    upgradeMenu.classList.add('hidden');
}

function upgradeCoinsPerHour(amount) {
    if (coins >= 200) { // Example condition for upgrade
        coins -= 200;
        coinsPerHour += amount;
        coinsElement.innerText = coins;
        coinsPerHourElement.innerText = coinsPerHour;
    } else {
        alert('Not enough coins!');
    }
}
