let money = 0;
let click_money = 1;
let afk_money = 0;
let upgradeCost = [10, 100];
let cUpgradeCost = [10, 100];
let scalingUpg = [10, 20];
let boosterActive = false; // To track whether the booster is active
let boosterCooldown = false; // To track the cooldown state
let interval; // To store the interval for moving the button
const button = document.getElementById('randomButton');

function draw(){
    document.getElementById("cookie").textContent = "Money: "+ parseInt(money)
    document.getElementById("MPS").textContent="CPS: " + parseInt(click_money)
    document.getElementById("MPC").textContent= "MPS: " + parseInt(afk_money)
    document.getElementById("Upg1").textContent= "upgrade 1: " + parseInt(upgradeCost[0])
    document.getElementById("Upg2").textContent= "upgrade 2: " + parseInt(upgradeCost[1])
    document.getElementById("clickUpg1").textContent= "clickUpg1:  " + parseInt(cUpgradeCost[0])
    document.getElementById("clickUpg2").textContent= "clickUpg2:  " + parseInt(cUpgradeCost[1])
}

function plusplus(){
    money += click_money
    draw()
}
function AFKmoney() {
    if (boosterActive) {
        // If the booster is active, multiply AFK money by 10
        money += afk_money * 10 ;
    } else {
        money += afk_money / 10;
    }
    draw()
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
    if (buyable){
        scalingUpg[index] -= 0.09999
        money -= upgradeCost[index]
        upgradeCost[index] += upgradeCost[index]/scalingUpg[index]
        afk_money += howmuchplus
        draw()
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
    if (buyable){
        money -= cUpgradeCost[index]
        cUpgradeCost[index] += cUpgradeCost[index]/cUpgradeCost[index]
        click_money += howmuchplus
        draw()
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

    // After 1 minute (60000 ms), reset the booster and the button
    setTimeout(() => {
        boosterActive = false; // Deactivate booster
        click_money /= 10; // Reset CPS to normal
        afk_money /= 10; // Reset MPS to normal
        document.getElementById("CPS").textContent = "CPS: " + parseInt(click_money);
        document.getElementById("MPS").textContent = "MPS: " + parseInt(afk_money);

        // Show the button again
        button.style.display = "inline-block";
        boosterCooldown = false; // Reset the cooldown state
    }, 6000); // 1-minute cooldown
});}
draw()
setInterval(() => AFKmoney(), 100)
setInterval(()=> boosterM(),1000)
setInterval(moveButton, 6000);  // Moves the button every 10 seconds

