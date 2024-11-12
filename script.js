// Inicializa variáveis de dados do jogo a partir do armazenamento local ou define valores padrão
let coinCount = parseInt(localStorage.getItem('coinCount')) || 0;
let energy = 100;
let gainPerHour = parseInt(localStorage.getItem('gainPerHour')) || 100;
let xp = parseInt(localStorage.getItem('xp')) || 0;
let level = parseInt(localStorage.getItem('level')) || 1;

// Define a base de XP necessário para passar de nível e calcula o XP necessário para o próximo nível
const xpToLevelUpBase = 1000;
let xpToLevelUp = xpToLevelUpBase + (level - 1) * 200;

// Define a lista de ranks e suas respectivas imagens
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

// Função para recuperar a energia progressivamente até o máximo de 100%
function recoverEnergy() {
    if (energy < 100) {
        energy += 0.5;
        updateEnergyDisplay(); // Atualiza a exibição da energia na tela
    }
}

// Função que é chamada ao clicar na moeda
function clickCoin() {
    if (energy > 0) {
        coinCount++; // Incrementa o total de moedas
        xp += 50; // Incrementa o XP
        document.getElementById("coinCount").textContent = coinCount; // Atualiza o contador de moedas na tela

        // Verifica se o jogador atingiu o XP necessário para subir de nível
        if (xp >= xpToLevelUp) {
            level++;
            xpToLevelUp += 200; // Aumenta o XP necessário para o próximo nível
            updateLevelDisplay(); // Atualiza a exibição do nível e XP
        }

        // Atualiza o rank e a imagem correspondente ao nível atual
        if (level <= ranks.length) {
            document.getElementById("level").textContent = level;
            document.getElementById("rankTitle").textContent = ranks[level - 1].title;
            document.getElementById("coin").src = ranks[level - 1].image;
        }

        document.getElementById("xp").textContent = xp; // Atualiza o XP na tela
        saveGameData(); // Salva o estado do jogo no armazenamento local

        energy -= 2; // Diminui a energia a cada clique
        updateEnergyDisplay(); // Atualiza a exibição da energia

        // Verifica se a energia acabou e alerta o jogador
        if (energy <= 0) {
            alert("Você ficou sem energia!");
            document.getElementById("energy-level").style.width = "0%";
        }
    }
}

// Função para atualizar a exibição da barra de energia
function updateEnergyDisplay() {
    document.getElementById("energy-level").style.width = energy + "%";
    document.getElementById("energy-amount").textContent = Math.max(0, Math.round(energy)) + "%";
}

// Função para salvar dados do jogo no armazenamento local
function saveGameData() {
    localStorage.setItem('coinCount', coinCount);
    localStorage.setItem('xp', xp);
    localStorage.setItem('level', level);
    localStorage.setItem('gainPerHour', gainPerHour);
}

// Função para fazer upgrade no ganho de moedas por hora
function upgradeCoinsPerHour() {
    gainPerHour += 10;
    document.getElementById("coinsPerHour").textContent = gainPerHour; // Atualiza o ganho por hora na tela
    saveGameData();
}

// Função executada ao carregar a página
window.onload = function() {
    document.getElementById("coinsPerHour").textContent = gainPerHour;
    document.getElementById("coinCount").textContent = coinCount;
    document.getElementById("xp").textContent = xp;
    document.getElementById("level").textContent = level;
    document.getElementById("rankTitle").textContent = ranks[level - 1].title;
    document.getElementById("coin").src = ranks[level - 1].image;

    setInterval(recoverEnergy, 5000); // Recupera energia a cada 5 segundos
    updateEnergyDisplay(); // Atualiza a exibição inicial da energia
};

// Função para resetar o nível (apenas para testes)
function resetLevel() {
    level = 1;
    xp = 0;
    xpToLevelUp = xpToLevelUpBase;
    saveGameData();
    updateLevelDisplay();
}

// Função para atualizar a exibição do nível e XP
function updateLevelDisplay() {
    document.getElementById("level").textContent = level;
    document.getElementById("xp").textContent = xp;
    document.getElementById("xpToLevelUp").textContent = xpToLevelUp;
}

// Função para mostrar o menu de upgrades
function showMenu(menuId) {
    document.querySelectorAll('.menu-content').forEach(menu => menu.style.display = 'none');
    document.getElementById(menuId + '-menu').style.display = 'block';

    if (menuId === 'upgrades') {
        showSubMenu('weapons'); // Define o submenu padrão para 'weapons'
    }
}

// Função para mostrar o submenu de upgrades
function showSubMenu(subMenuId) {
    document.querySelectorAll('.menu-content').forEach(submenu => submenu.style.display = 'none');
    document.getElementById(subMenuId + '-menu').style.display = 'block';
}

// Função para simular a compra de uma arma
function comprarArma() {
    alert("Arma comprada!");
}

// Função para simular a compra de um equipamento
function buyEquipment(equipmentId) {
    alert("Você comprou o equipamento: " + equipmentId);
}

// Função para simular a compra de uma personalidade
function buyPersonality(personalityId) {
    alert("Você comprou a personalidade: " + personalityId);
}

// Evento para atualizar barra de navegação inferior em todas as telas
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
