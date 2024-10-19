let clickCount = 0;

const clickButton = document.getElementById('clickButton');
const resetButton = document.getElementById('resetButton');
const clickCountDisplay = document.getElementById('clickCount');

clickButton.addEventListener('click', () => {
    clickCount++;
    clickCountDisplay.textContent = `Você clicou ${clickCount} vezes!`;
});

resetButton.addEventListener('click', () => {
    clickCount = 0;
    clickCountDisplay.textContent = `Você clicou ${clickCount} vezes!`;
});
