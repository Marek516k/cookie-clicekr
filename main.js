let money = 0;
let click_money = 1;
let afk_money = 0;
let upgradeCost = [10, 100];
let cUpgradeCost = [10, 100];
let scalingUpg = [10, 20];
let CscalingUpg = [10, 20];
let boosterActive = false;
let boosterCooldown = false;
const button = document.getElementById('randomButton');
let pocetUpg = [0, 0];
let upgAFKmaking = [1, 4];
let pocetCUpg = [0, 0];
let upgClick = [1, 4];

function deleteCookie(name) {
    document.cookie = `money=${money}; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    document.cookie = `click_money=${click_money}; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    document.cookie = `afk_money=${afk_money}; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    document.cookie = `pocetUpg=${JSON.stringify(pocetUpg)}; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    document.cookie = `pocetCUpg=${JSON.stringify(pocetCUpg)}; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
}

function deleteAllCookies() {
    let cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].split("=")[0];
        deleteCookie(cookie);
    }
}

function resetGame() {
    deleteAllCookies();

    money = 0;
    click_money = 1;
    afk_money = 0;
    pocetUpg = [0, 0];
    pocetCUpg = [0, 0];

    draw();

    alert("Game data has been reset!");
}

function exitgame(){
    let otazka=prompt("Do you seriously wanna exit the game? napiš (ano) pokud chceš odejít").toLowerCase();
    if (otazka==="ano"){
        alert("this window will now close")
        window.close();
    }
}
function savegame(){
    document.cookie = `money=${money}; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    document.cookie = `click_money=${click_money}; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    document.cookie = `afk_money=${afk_money}; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    document.cookie = `pocetUpg=${JSON.stringify(pocetUpg)}; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    document.cookie = `pocetCUpg=${JSON.stringify(pocetCUpg)}; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
}

function getCookie(name) {
    let cookies = document.cookie.split('; ');

    for (let i = 0; i < cookies.length; i++) {
        let [key, value] = cookies[i].split('=');
        if (key === name) return decodeURIComponent(value);
    }
    return null;
}

function loadGame() {
    money = parseFloat(getCookie("money")) || 0;
    click_money = parseFloat(getCookie("click_money")) || 1;
    afk_money = parseFloat(getCookie("afk_money")) || 0;
    
    let savedPocetUpg = getCookie("pocetUpg");
    let savedPocetCUpg = getCookie("pocetCUpg");

    pocetUpg = savedPocetUpg ? JSON.parse(savedPocetUpg) : [0, 0];
    pocetCUpg = savedPocetCUpg ? JSON.parse(savedPocetCUpg) : [0, 0];
    draw();
}

function draw() {
    document.getElementById("cookie").textContent = "COOKIESS!!: " + parseInt(money);
    document.getElementById("MPC").textContent = "MPC: " + parseInt(click_money);
    document.getElementById("MPS").textContent = "MPS: " + parseInt(afk_money);
    document.getElementById("Upg1").textContent = "Upgrade 1: " + parseInt(upgradeCost[0]);
    document.getElementById("Upg2").textContent = "Upgrade 2: " + parseInt(upgradeCost[1]);
    document.getElementById("clickUpg1").textContent = "Click Upgrade 1: " + parseInt(cUpgradeCost[0]);
    document.getElementById("clickUpg2").textContent = "Click Upgrade 2: " + parseInt(cUpgradeCost[1]);
}

function plusplus() {
    money += click_money;
    draw();
}

function calculateMPS() {
    let moneyAFK = 0;
    for (let i = 0; i < pocetUpg.length; i++) {
        moneyAFK += pocetUpg[i] * upgAFKmaking[i];
    }
    return boosterActive ? moneyAFK * 10 : moneyAFK;
}

function calculateMPC() {
    let moneyCLICK = 1;
    for (let i = 0; i < pocetCUpg.length; i++) {
        moneyCLICK += pocetCUpg[i] * upgClick[i];
    }
    return boosterActive ? moneyCLICK * 10 : moneyCLICK;
}

function AFKmoney() {
    money += afk_money / 10;
    draw();
}

function upgrade(upgType) {
    let index = parseInt(upgType) - 1;

    if (money >= upgradeCost[index]) {
        money -= upgradeCost[index];
        upgradeCost[index] += upgradeCost[index] / scalingUpg[index];
        scalingUpg[index] -= 0.09999;
        pocetUpg[index]++;
        afk_money = calculateMPS();
        draw();
    }
}

function clickUpg(upgType) {
    let index = parseInt(upgType) - 1;
    
    if (money >= cUpgradeCost[index]) {
        money -= cUpgradeCost[index];
        cUpgradeCost[index] += cUpgradeCost[index] / CscalingUpg[index];
        CscalingUpg[index] -= 0.09999;
        pocetCUpg[index]++;
        click_money = calculateMPC();
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
window.onload = function () {
    loadGame();
}
draw();
setInterval(moveButton, 6000);
setInterval(AFKmoney, 100);
setInterval(savegame, 5000);
document.getElementById("Reset").addEventListener("click", resetGame);

button.addEventListener("click", function () {
    if (boosterCooldown) return;
    boosterActive = true;
    boosterCooldown = true;
    button.style.display = "none";

    // Apply boost
    afk_money = calculateMPS(); // Calculate boosted value
    click_money = calculateMPC(); // Calculate boosted value

    setTimeout(() => {
        boosterActive = false;
        boosterCooldown = false;
        button.style.display = "inline-block";

        // Recalculate MPS and MPC with any new upgrades kept
        afk_money = calculateMPS();
        click_money = calculateMPC();

        draw();
    }, 6000);
});