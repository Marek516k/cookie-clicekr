money = 0;
click_money = 1;
afk_money = 0;
upgradeCost = [10, 100];
cUpgradeCost = [10, 100];
scalingUpg=[10,20]

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
function AFKmoney(){
    money += afk_money / 10
    draw()
}
function boosterM(){
    money += afk_money *10
    draw()
}
function upgrade(upgType){
    buyable = false
    howmuchplus = 0
    index = null
    if (upgType == "1" & money >= upgradeCost[0]){
        buyable = true
        howmuchplus = 1
        index = 0
    }
    if (upgType == "2" & money >= upgradeCost[1]){
        buyable = true
        howmuchplus = 4
        index = 1
    }
    if (buyable){
        scalingUpg[index] -= 0.09999
        money -= upgradeCost[index]
        upgradeCost[index] += upgradeCost[index]/scalingUpg[index]
        afk_money += howmuchplus
        draw()
    }
}

function clickUpg(upgType){
    buyable = false
    howmuchplus = 0
    index = null
    if (upgType == "1" & money >= cUpgradeCost[0]){
        buyable = true
        howmuchplus = 1
        index = 0
    }
    if (upgType == "2" & money >= cUpgradeCost[1]){
        buyable = true
        howmuchplus = 4
        index = 1
    }
    if (buyable){
        money -= cUpgradeCost[index]
        cUpgradeCost[index] += cUpgradeCost[index]/cUpgradeCost[index]
        click_money += howmuchplus
        draw()
    }

}
setInterval(() => AFKmoney(), 100)
setInterval(()=> boosterM(),1000)
draw()
//udělat booster na který když kliknu tak znásobí CPS *10 a MPS třeba a s cooldownem 1min a zobrazí se random na obrazovce
