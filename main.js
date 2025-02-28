let money = 0;
let click_money = 1;
let afk_money = 0;
let upgradeCost = [10, 100];
let cUpgradeCost = [10, 100];
let scalingUpg = [10, 20];
let CscalingUpg=[10,20];
let boosterActive = false; // To track whether the booster is active
let boosterCooldown = false; // To track the cooldown state
let interval; // To store the interval for moving the button
const button = document.getElementById('randomButton');
let pocetCUpg

function draw() {
    document.getElementById("cookie").textContent = "Money: " + parseInt(money);
    document.getElementById("MPC").textContent = "MPC: " + parseInt(click_money);
    document.getElementById("MPS").textContent = "MPS: " + parseInt(afk_money);
    document.getElementById("Upg1").textContent = "upgrade 1: " + parseInt(upgradeCost[0]);
    document.getElementById("Upg2").textContent = "upgrade 2: " + parseInt(upgradeCost[1]);
    document.getElementById("clickUpg1").textContent = "clickUpg1:  " + parseInt(cUpgradeCost[0]);
    document.getElementById("clickUpg2").textContent = "clickUpg2:  " + parseInt(cUpgradeCost[1]);
}

function plusplus() {
    money += click_money;
    draw();
}

function AFKmoney() {
    if (boosterActive) {
        // If the booster is active, multiply AFK money by 10
        money += afk_money * 10;
    } else {
        money += afk_money / 10;
    }
    draw();
}

function upgrade(upgType) {
    let buyable = false;
    let howmuchplus = 0;
    let index = null;

    if (upgType == "1" && money >= upgradeCost[0]) {
        buyable = true;
        howmuchplus = 1;
        index = 0;
    }

    if (upgType == "2" && money >= upgradeCost[1]) {
        buyable = true;
        howmuchplus = 4;
        index = 1;
    }
    if (buyable) {
        scalingUpg[index] -= 0.09999;
        money -= upgradeCost[index];
        upgradeCost[index] += upgradeCost[index] / scalingUpg[index];
        afk_money += howmuchplus;
        draw();
    }
}

function clickUpg(upgType) {
    let buyable = false;
    let howmuchplus = 0;
    let index = null;

    if (upgType == "1" && money >= cUpgradeCost[0]) {
        buyable = true;
        howmuchplus = 1;
        index = 0;
    }

    if (upgType == "2" && money >= cUpgradeCost[1]) {
        buyable = true;
        howmuchplus = 4;
        index = 1;
    }
    if (buyable) {
        CscalingUpg[index]-= 0.09999;
        money -= cUpgradeCost[index];
        cUpgradeCost[index] += cUpgradeCost[index] / CscalingUpg[index];
        click_money += howmuchplus;
        draw();
    }
}

// Function to randomly move the button
function moveButton() {
    const maxWidth = window.innerWidth - button.clientWidth;
    const maxHeight = window.innerHeight - button.clientHeight;
    const randomX = Math.floor(Math.random() * maxWidth);
    const randomY = Math.floor(Math.random() * maxHeight);
    button.style.left = `${randomX}px`;
    button.style.top = `${randomY}px`;
}
setInterval(moveButton, 6000);

button.addEventListener("click", function () {
    if (boosterCooldown) return; // If cooldown is active, ignore the click
    boosterActive = true; // Activate booster
    // Multiply MPS and CPS during the boost
    click_money *= 10; // Multiply MPC by 10
    afk_money*=10; // Multiplay MPS by 10
    // Hide the button during the cooldown
    button.style.display = "none";
    boosterCooldown = true;
    // After 6 seconds (6000 ms), reset the booster and the button
    setTimeout(() => {
        boosterActive = false; // Deactivate booster
        // Show the button again
        button.style.display = "inline-block";
        boosterCooldown = false; // Reset the cooldown state
    }, 6000); // 6-second cooldown
});

draw();
setInterval(() => AFKmoney(), 100);