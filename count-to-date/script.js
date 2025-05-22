const countDownForm = document.getElementById("countDownForm");
const inputContainer = document.getElementById("input-container");
const dateElement = document.getElementById("date");
const countdownElement = document.getElementById("countdown");

const countdownTitle = document.getElementById("countdown-title");
const countdownButton = document.getElementById("countdown-btn");
const timeElements = document.querySelectorAll("span");
const completeElement = document.getElementById("complete");

const completeInfo = document.getElementById("complete-info");
const completeButton = document.getElementById("complete-btn");

//ตัวแปรควบคุมการทำงาน
let countdownTitleValue = "";
let countdownDateValue = "";
let countdownValue = Date; // เก็บวันที่เลือก
let countdownActive;//ตัวแปรเก็บ timeout
let savedCountdown;//ตัวแปรเก็บ countdown ที่บันทึกไว้

//ตัวแปรแปลงหน่วยเวลา
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

countDownForm.addEventListener("submit", updateCountdown);

function updateCountdown(e) {
    e.preventDefault(); // ป้องกันการรีเฟรชหน้า
    countdownTitleValue = e.srcElement[0].value; // เก็บชื่อ countdown
    countdownDateValue = e.srcElement[1].value; // เก็บวันที่ countdown

    if (countdownTitleValue === "" || countdownDateValue === "") {
        alert("กรุณากรอกข้อมูลให้ครบ");
    }else {
        savedCountdown = {
            title: countdownTitleValue,
            date: countdownDateValue,
        };
        localStorage.setItem("countdown", JSON.stringify(savedCountdown)); // บันทึกข้อมูลลง localStorage
        countdownValue = new Date(countdownDateValue).getTime(); // เวลาที่ตั้งไว้
        setupTime()
    }
};

function setupTime() {
    countdownActive = setInterval(() => {
        const now = new Date().getTime(); // เวลาปัจจุบัน
        const distance = countdownValue - now; // เวลาที่เหลือ
        const days = Math.floor(distance / day); // จำนวนวัน
        const hours = Math.floor((distance % day) / hour); // จำนวนชั่วโมง
        const minutes = Math.floor((distance % hour) / minute); // จำนวนนาที
        const seconds = Math.floor((distance % minute) / second); // จำนวนวินาที
        inputContainer.hidden = true; // ซ่อน input
        if (distance < 0) {
            //หมดเวลา
            countdownElement.hidden = true; // ซ่อน countdown
            completeElement.hidden = false; // แสดง complete
            completeInfo.textContent = `${countdownTitleValue} วันที่ ${countdownDateValue}`; // แสดงข้อความเสร็จสิ้น
            clearInterval(countdownActive); // หยุดการทำงานของ countdown
        }else{
            //นับถอยหลัง
            countdownTitle.textContent = `${countdownTitleValue}`; // แสดงชื่อ countdown
            timeElements[0].textContent = days; // แสดงจำนวนวัน
            timeElements[1].textContent = hours; // แสดงจำนวนชั่วโมง
            timeElements[2].textContent = minutes; // แสดงจำนวนนาที
            timeElements[3].textContent = seconds; // แสดงจำนวนวินาที
            countdownElement.hidden = false; // แสดง countdown
        }
    },second);
}

function callDateStorage() {
    if (localStorage.getItem("countdown")) {
        inputContainer.hidden = true; // ซ่อน input
        savedCountdown = JSON.parse(localStorage.getItem("countdown")); // ดึงข้อมูลจาก localStorage
        countdownTitleValue = savedCountdown.title; // เก็บชื่อ countdown
        countdownDateValue = savedCountdown.date; // เก็บวันที่ countdown
        countdownValue = new Date(countdownDateValue).getTime(); // เวลาที่ตั้งไว้
        setupTime();
 }
};

callDateStorage(); // เรียกใช้ฟังก์ชันเมื่อโหลดหน้าเว็บ

function reset() {
    countdownElement.hidden = true; // ซ่อน countdown
    completeElement.hidden = true; // ซ่อน complete
    inputContainer.hidden = false; // แสดง input
    clearInterval(countdownActive); // หยุดการทำงานของ countdown
    localStorage.removeItem("countdown"); // ลบข้อมูลจาก localStorage
    countdownTitleValue = ""; // เคลียร์ชื่อ countdown
    countdownDateValue = ""; // เคลียร์วันที่ countdown
    countdownValue = ""; // เคลียร์เวลาที่ตั้งไว้
    countdownTitle.textContent = ""; // เคลียร์ชื่อ countdown
}

completeButton.addEventListener("click", reset); // เรียกใช้ฟังก์ชัน reset เมื่อคลิกปุ่ม 
countdownButton.addEventListener("click", reset); // เรียกใช้ฟังก์ชัน reset เมื่อคลิกปุ่ม countdown
