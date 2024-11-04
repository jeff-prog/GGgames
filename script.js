let coinCount = parseInt(localStorage.getItem('coinCount')) || 0;
let energy = 100;
let gainPerHour = parseInt(localStorage.getItem('gainPerHour')) || 100;
let xp = parseInt(localStorage.getItem('xp')) || 0;
let level = parseInt(localStorage.getItem('level')) || 1;

const xpToLevelUpBase = 1000;
let xpToLevelUp = xpToLevelUpBase + (level - 1) * 200;

const ranks = [
    { title: "Private", image: "img/private.jpg" },
    { title: "Corporal", image: "img/corporal.jpg" },
    { title: "Sergeant", image: "img/sergeant.jpg" },
    { title: "Staff Sergeant", image: "img/staff_sergeant.jpg" },
    { title: "Sergeant Major", image: "img/sergeant_major.jpg" },
    { title: "Warrant Officer", image: "img/warrant_officer.jpg" },
    { title: "Second Lieutenant", image: "img/second_lieutenant.jpg" },
    { title: "First Lieutenant", image: "img/first_lieutenant.jpg" },
    { title: "Captain", image: "img/captain.jpg" },
    { title: "Major", image: "img/major.jpg" },
    { title: "Lieutenant Colonel", image: "img/lieutenant_colonel.jpg" },
    { title: "Colonel", image: "img/colonel.jpg" },
    { title: "Brigadier General", image: "img/brigadier_general.jpg" },
    { title: "Major General", image: "img/major_general.jpg" },
    { title: "Lieutenant General", image: "img/lieutenant_general.jpg" },
    { title: "General", image: "img/general.jpg" },
];

function recoverEnergy() {
    if (energy < 100) {
        energy += 0.5;
        document.getElementById("energy-level").style.width = energy + "%";
    }
}

function clickCoin() {
    if (energy > 0) {
        coinCount++;
        xp += 50;
        document.getElementById("coinCount").textContent = coinCount;

        if (xp >= xpToLevelUp) {
            level++;
            xpToLevelUp += 200;
            updateLevelDisplay();
        }

        if (level <= ranks.length) {
            document.getElementById("level").textContent = level;
            document.getElementById("rankTitle").textContent = ranks[level - 1].title;
            document.getElementById("coin").src = ranks[level - 1].image;
        }

        document.getElementById("xp").textContent = xp;

        saveGameData();

        energy -= 2;
        document.getElementById("energy-level").style.width = energy + "%";

        if (energy <= 0) {
            alert("Você ficou sem energia!");
            document.getElementById("energy-level").style.width = "0%";
        }
    }
}

function saveGameData() {
    localStorage.setItem('coinCount', coinCount);
    localStorage.setItem('xp', xp);
    localStorage.setItem('level', level);
    localStorage.setItem('gainPerHour', gainPerHour);
}

function upgradeCoinsPerHour() {
    gainPerHour += 10;
    document.getElementById("gainPerHour").textContent = gainPerHour;
    saveGameData();
}

window.onload = function() {
    document.getElementById("coinsPerHour").textContent = gainPerHour;
    document.getElementById("coinCount").textContent = coinCount;
    document.getElementById("xp").textContent = xp;
    document.getElementById("level").textContent = level;
    document.getElementById("rankTitle").textContent = ranks[level - 1].title;
    document.getElementById("coin").src = ranks[level - 1].image;

    setInterval(recoverEnergy, 5000);
    document.getElementById("energy-level").style.width = energy + "%";
};

function resetLevel() {
    level = 1;
    xp = 0;
    xpToLevelUp = xpToLevelUpBase;
    saveGameData();
    updateLevelDisplay();
}

function updateLevelDisplay() {
    document.getElementById("level").textContent = level;
    document.getElementById("xp").textContent = xp;
    document.getElementById("xpToLevelUp").textContent = xpToLevelUp;
}

function showMenu(menuId) {
    document.querySelectorAll('.menu-content').forEach(menu => menu.style.display = 'none');
    document.getElementById(menuId + '-menu').style.display = 'block';

    if (menuId === 'upgrades') {
        showSubMenu('weapons');
    }
}

function showSubMenu(subMenuId) {
    document.querySelectorAll('.menu-content').forEach(submenu => submenu.style.display = 'none');
    document.getElementById(subMenuId + '-menu').style.display = 'block';
}

function comprarArma() {
    alert("Arma comprada!");
}

function buyEquipment(equipmentId) {
    alert("Você comprou o equipamento: " + equipmentId);
}

function buyPersonality(personalityId) {
    alert("Você comprou a personalidade: " + personalityId);
}

// Atualizar barra de menu inferior em todas as telas
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.bottom-bar-button').forEach(button => {
        button.addEventListener('click', event => {
            const target = event.target.dataset.target;
            if (target) {
                window.location.href = target + ".html";
            }
        });
    });
});
