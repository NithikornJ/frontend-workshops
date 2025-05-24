const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordConfirm = document.getElementById('confirmPassword');
const errorMessage = document.querySelectorAll('.error');
const submitButton = document.getElementById('submit-btn');


submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    checkInput([username, email, password, passwordConfirm]);
    checkPasswordMatch(password, passwordConfirm);    
    if (!validateEmail(email.value.trim())) {
        showError(email,"กรุณาใส่อีเมลที่ถูกต้อง");
    }
    else{
        showSuccess(email);
    }
    checkInputLength(username, 5, 10);
    checkInputLength(password, 6, 15);
});

function showError(input, message){
    const formGroup = input.parentElement;
    formGroup.className = 'form-group error';
    formGroup.querySelector('span').innerText = message;
}

function showSuccess(input){
    const formGroup = input.parentElement;
    formGroup.className = 'form-group success';
    
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()\[\]\\.,;:\s@"]+\.)+[^<>()\[\]\\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
}

function checkInput(inputArray) {
    inputArray.forEach(function(input) {
        if (input.value.trim() === ''){
            showError(input, `กรุณาใส่ ${input.id}`);
        }else{
            showSuccess(input);
        }
    });
}
function checkPasswordMatch(password1, password2) {
    if (password1.value !== password2.value) {
        showError(passwordConfirm, "รหัสผ่านไม่ตรงกัน");
    } else {
        showSuccess(passwordConfirm);
        
    }
}

function checkInputLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `กรุณาใส่ ${input.id} อย่างน้อย ${min} ตัว`);
    }else if (input.value.length > max) {
        showError(input, `กรุณาใส่ ${input.id} ไม่เกิน ${max} ตัว`);
    } else {
        showSuccess(input);
    }
}