money = 0;
click_money = 1;
afk_money = 0;

function plusplus(){
    money += click_money
    document.getElementById("cookie").textContent = money
}

function AFKmoney(){
    money++
    document.getElementById("cookie").textContent = money
}

setInterval(() => AFKmoney(), 1000)
