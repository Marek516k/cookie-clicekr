let money = 0;
let click_money = 1;
let afk_money = 0;
let upgradeCost = [10, 100];
let cUpgradeCost = [10, 100];
let scalingUpg = [10, 20];
let boosterActive = false; // To track whether the booster is active
let boosterCooldown = false; // To track the cooldown state
let interval; // To store the interval for moving the button

function plusplus() {
    money += click_money;
    document.getElementById("cookie").textContent = "máš peněz: " + parseInt(money);
}
function AFKmoney() {
    if (boosterActive) {
        money += afk_money * 10 ;
    } else {
        money += afk_money / 10;
    }
    document.getElementById("cookie").textContent = "máš peněz: " + parseInt(money);
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
        document.getElementById("MPS").textContent = "MPS: " + parseInt(afk_money);
        document.getElementById("Upg1").textContent = "upgrade 1: " + parseInt(upgradeCost[0]);
        document.getElementById("Upg2").textContent = "upgrade 2: " + parseInt(upgradeCost[1]);
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
        money -= cUpgradeCost[index];
        cUpgradeCost[index] += cUpgradeCost[index] / cUpgradeCost[index];
        click_money += howmuchplus;
        document.getElementById("CPS").textContent = "CPS: " + parseInt(click_money);
        document.getElementById("clickUpg1").textContent = "clickUpg1:  " + parseInt(upgradeCost[0]);
        document.getElementById("clickUpg2").textContent = "clickUpg2:  " + parseInt(upgradeCost[1]);
    }
}

const button = document.getElementById('randomButton');
// Function to randomly move the button
function moveButton() {
    const maxWidth = window.innerWidth - button.clientWidth;
    const maxHeight = window.innerHeight - button.clientHeight;
    const randomX = Math.floor(Math.random() * maxWidth);
    const randomY = Math.floor(Math.random() * maxHeight);
    button.style.left = `${randomX}px`;
    button.style.top = `${randomY}px`;
}

setInterval(moveButton, 6000);  // Moves the button every 6 seconds
setInterval(() => AFKmoney(), 1000);  // Updates AFK money every 1s

// Function that handles the booster activation
function boosterM() {
    if (boosterActive) {
        // Apply booster effect by multiplying AFK money by 10
        money += afk_money * 10 / 10;
        document.getElementById("cookie").textContent = "máš peněz: " + parseInt(money);
    }
}

// Button click event listener
button.addEventListener("click", function() {
    if (boosterCooldown) return; // If cooldown is active, ignore the click

    boosterActive = true; // Activate booster
    money += afk_money * 10; // Multiply MPS by 10
    click_money *= 10; // Multiply CPS by 10
    document.getElementById("CPS").textContent = "CPS: " + parseInt(click_money);
    document.getElementById("MPS").textContent = "MPS: " + parseInt(afk_money * 10); // Update MPS display

    // Hide the button and reset cooldown
    button.style.display = "none";
    boosterCooldown = true;

    // reset the booster and the button
    setTimeout(() => {
        boosterActive = false; // Deactivate booster
        click_money /= 10; // Reset CPS to normal
        afk_money /= 10; // Reset MPS to normal
        document.getElementById("CPS").textContent = "CPS: " + parseInt(click_money);
        document.getElementById("MPS").textContent = "MPS: " + parseInt(afk_money);

        // Show the button again
        button.style.display = "inline-block";
        boosterCooldown = false; // Reset the cooldown state
    }, 6000); // 6s cooldown
});

document.getElementById("cookie").textContent = "máš peněz: " + parseInt(money);
document.getElementById("CPS").textContent = "CPS: " + parseInt(click_money);
document.getElementById("MPS").textContent = "MPS: " + parseInt(afk_money);
document.getElementById("Upg1").textContent = "upgrade 1: " + parseInt(upgradeCost[0]);
document.getElementById("Upg2").textContent = "upgrade 2: " + parseInt(upgradeCost[1]);
document.getElementById("clickUpg1").textContent = "clickUpg1:  " + parseInt(upgradeCost[0]);
document.getElementById("clickUpg2").textContent = "clickUpg2:  " + parseInt(upgradeCost[1]);