let coinCount = 0;
let coinsPerHour = 100;
let energy = 100;
let maxEnergy = 100;
let energyDecreaseRate = 10;  // Energy lost per click
let energyRechargeRate = 1;   // Energy recharge per second
let upgradeCost = 50;         // Base upgrade value for coins per hour

// Update the stats display
function updateStats() {
    document.getElementById("coinCount").innerText = coinCount;
    document.getElementById("coinsPerHour").innerText = coinsPerHour;
}

// Handle the click event on the coin
function clickCoin() {
    if (energy > 0) {
        coinCount += Math.floor(coinsPerHour / 3600);  // Gain coins proportional to coinsPerHour
        energy -= energyDecreaseRate;
        if (energy < 0) energy = 0;
        updateStats();
        updateEnergyBar();
    }
}

// Update the energy bar display
function updateEnergyBar() {
    let energyBar = document.getElementById("energyBar");
    let energyText = document.getElementById("energyText");

    energyBar.style.width = energy + "%";
    energyText.innerText = energy + "%";

    if (energy <= 0) {
        energyText.innerText = "Out of energy! Wait to recharge.";
    }
}

// Recharge energy over time
setInterval(function() {
    if (energy < maxEnergy) {
        energy += energyRechargeRate;
        if (energy > maxEnergy) energy = maxEnergy;
        updateEnergyBar();
    }
}, 1000);  // Recharge every second

// Upgrade function to increase coins per hour
function upgrade() {
    coinsPerHour += upgradeCost;
    upgradeCost += 50;  // Increase the cost of each subsequent upgrade
    updateStats();
}
