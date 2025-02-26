money = 0;
click_money = 1;
afk_money = 0;
upgradeCost = [10, 100];

function plusplus(){
    money += click_money
    document.getElementById("cookie").textContent = "máš peněz: "+ parseInt(money)
}

function AFKmoney(){
    money += afk_money
    document.getElementById("cookie").textContent = "máš peněz: "+ parseInt(money)
}

function upgrade(upgType){
    buyable = false
    howmuchplus = 0
    index = null
    if (upgType == "1"){
        if (money >= upgradeCost[0]){
            buyable = true
            howmuchplus = 1
            index = 0
        }
    }
    if (upgType == "2"){
        if (money >= upgradeCost[1]){
            buyable = true
            howmuchplus = 2
            index = 1
        }
    }
    if (buyable){
    money -= upgradeCost[index]
    upgradeCost[index] += upgradeCost[index]/12.6
    afk_money += howmuchplus
    document.getElementById("cookie").textContent = "máš peněz: "+ parseInt(money)
    }
}
 
setInterval(() => AFKmoney(), 1000)
