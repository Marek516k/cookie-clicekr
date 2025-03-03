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
    let otazka1=prompt("Do you seriously wanna reset your progress type (ano) if so").toLowerCase();
    if (otazka1==="ano"){
        deleteAllCookies();
    }
    money = 0;
    click_money = 1;
    afk_money = 0;
    pocetUpg = [0, 0];
    pocetCUpg = [0, 0];
    showMessage("The game has been reset.");
    draw();
}

function exitgame(){
    let otazka=prompt("Do you seriously wanna exit the game? napiš (ano) pokud chceš odejít").toLowerCase();
    if (otazka==="ano"){
        window.close();
    }
}
function savegame(){
    document.cookie = `money=${money}; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    document.cookie = `click_money=${click_money}; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    document.cookie = `afk_money=${afk_money}; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    document.cookie = `pocetUpg=${JSON.stringify(pocetUpg)}; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    document.cookie = `pocetCUpg=${JSON.stringify(pocetCUpg)}; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    showMessage("The game has been saved.")
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
    document.getElementById("MPC").textContent = "CPC: " + parseInt(click_money);
    document.getElementById("MPS").textContent = "CPS: " + parseInt(afk_money);
    document.getElementById("Upg1").textContent = "CPS Upgrade 1: " + parseInt(upgradeCost[0]);
    document.getElementById("Upg2").textContent = "CPS Upgrade 2: " + parseInt(upgradeCost[1]);
    document.getElementById("clickUpg1").textContent = "CPC Upgrade 1: " + parseInt(cUpgradeCost[0]);
    document.getElementById("clickUpg2").textContent = "CPC Upgrade 2: " + parseInt(cUpgradeCost[1]);
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

function showMessage(text) {
    let message = document.createElement("div");
    message.innerText = text; // Custom message
    message.style.position = "fixed";
    message.style.top = "20px";
    message.style.left = "50%";
    message.style.transform = "translateX(-50%)";
    message.style.background = "rgb(241, 234, 234)";
    message.style.color = "black";
    message.style.padding = "10px 20px";
    message.style.borderRadius = "5px";
    message.style.zIndex = "1000";
    message.style.opacity = "1";
    message.style.transition = "opacity 0.5s ease-out";

    document.body.appendChild(message);
    setTimeout(() => {
        message.style.opacity = "0";
        setTimeout(() => message.remove(), 500);
    }, 2000);
}

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
setInterval(savegame, 60000);
document.getElementById("Reset").addEventListener("click", resetGame);

button.addEventListener("click", function () {
    if (boosterCooldown) return;
    boosterActive = true;
    boosterCooldown = true;
    button.style.display = "none";
    afk_money = calculateMPS();
    click_money = calculateMPC();

    setTimeout(() => {
        boosterActive = false;
        boosterCooldown = false;
        button.style.display = "inline-block";
        afk_money = calculateMPS();
        click_money = calculateMPC();
        draw();
    }, 6000);
});
// achievementy + více upg