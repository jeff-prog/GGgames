let coinCount = 0;
let coinsPerHour = 100;
let energy = 100;
let energyInterval;
let upgrades = [500, 1000, 2000];  // Costs of upgrades
let currentUpgrade = 0;

document.addEventListener('DOMContentLoaded', () => {
    // Energy auto-recharge
    energyInterval = setInterval(rechargeEnergy, 1000);
});

function collectCoin() {
    if (energy > 0) {
        coinCount += 1;
        energy -= 10;
        document.getElementById('coinCount').textContent = coinCount;
        document.getElementById('energyBar').textContent = energy + '%';
    }
}

function rechargeEnergy() {
    if (energy < 100) {
        energy += 2;
        document.getElementById('energyBar').textContent = energy + '%';
    }
}

function openUpgradeMenu() {
    document.getElementById('upgradeMenu').classList.remove('hidden');
}

function closeUpgradeMenu() {
    document.getElementById('upgradeMenu').classList.add('hidden');
}

function upgrade(level) {
    if (coinCount >= upgrades[level - 1]) {
        coinCount -= upgrades[level - 1];
        coinsPerHour += level * 100;  // Increase coins per hour based on upgrade level
        document.getElementById('coinCount').textContent = coinCount;
        document.getElementById('coinsPerHour').textContent = coinsPerHour;
        alert(`Upgrade level ${level} applied! You now earn ${coinsPerHour} coins per hour.`);
    } else {
        alert('Not enough coins for this upgrade!');
    }
}
