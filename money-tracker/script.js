const balance = document.getElementById("balance");
const money_Plus = document.getElementById("money-plus");
const money_Minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

const dataTransection = [
    
];

let transection = dataTransection;

function addComma(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function autoID() {
    return Math.floor(Math.random()*1000000)
}
function init(){
    list.innerHTML='';
    transection.forEach(addDataToList);
    calMoney();
}
function addDataToList(transection) {
    const symbol = transection.amount < 0 ? '-':'+';
    const item = document.createElement('li');
    const status = symbol === '-' ? 'minus' : 'plus';
    item.classList.add(status)
    item.innerHTML = `${transection.text} <span>${symbol}฿${addComma(Math.abs(transection.amount))}</span><button class="delete-btn" onclick="removeData(${transection.id})">x</button>`;
    list.appendChild(item);
    
}
function calMoney() {
    const amounts = transection.map(transection=> transection.amount);
    const total = amounts.reduce((result , item)=> result+=item,0).toFixed(2);
    const income = amounts.filter(item=>item>0).reduce((result , item)=> result+=item,0).toFixed(2);
    const expense = amounts.filter(item=>item<0).reduce((result , item)=> result+=item,0).toFixed(2);
    balance.innerText = `฿`+addComma(total);
    money_Plus.innerText = `฿`+addComma(income)
    money_Minus.innerText = `฿`+addComma(expense)
}
function removeData(id){
    transection = transection.filter(transection => transection.id !== id);
    init();
}
function addTransection(e) {
    e.preventDefault();
    if(text.value.trim() === '' || amount.value.trim() === ''){
        alert("กรุณาป้อนข้อมูลให้ครบ");
    }else{
        const autoID = Date.now();
        const data={
            id:autoID,
            text:text.value,
            amount:Number(amount.value)
        }
        // console.log(data)
        transection.push(data);
        // console.log(transection)
        addDataToList(data);
        calMoney();
        text.value = '';
        amount.value = '';
    }
}
form.addEventListener('submit', addTransection);
init();
