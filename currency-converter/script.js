const currency_one = document.getElementById("currency-one");
const currency_two = document.getElementById("currency-two");

const amount_one = document.getElementById("amount-one");
const amount_two = document.getElementById("amount-two");

const rateText = document.getElementById("rate");
const swap_btn = document.getElementById("btn");

currency_one.addEventListener('change',calMoney);
currency_two.addEventListener('change',calMoney);

amount_one.addEventListener('input',calMoney);
amount_two.addEventListener('input',calMoney);



function calMoney() {
    const one = currency_one.value;
    const two = currency_two.value;
    fetch(`https://v6.exchangerate-api.com/v6/5bf3e451953f62ff8e98e683/latest/${one}`)
    .then(res=>res.json())
    .then(data=>{
        const rate = data.conversion_rates[two];
        rateText.innerText = `1 = ${rate} ${two}`;
        amount_two.value=(amount_one.value*rate);
    })
    .catch(error => console.error('Error', error));
}

swap_btn.addEventListener('click', ()=>{
    const temp = currency_one.value;
    currency_one.value=currency_two.value;
    currency_two.value = temp;
    calMoney();
});

calMoney();
