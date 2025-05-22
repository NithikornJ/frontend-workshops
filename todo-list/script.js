const form = document.getElementById('form');
const input = document.getElementById('task');
const list = document.getElementById('todo-list');

//สร้าง array สำหรับเก็บข้อมูล
const todos = [];

//โหลดจาก localStorage ตอนเริ่มต้น
window.addEventListener("DOMContentLoaded", () => { //เมื่อโหลดหน้าเว็บ
    const saved = localStorage.getItem('todos'); //ดึงข้อมูลจาก localStorage
    if (saved) {
        const loaded = JSON.parse(saved); //แปลงข้อมูลจาก JSON เป็น object
        todos.splice(0, todos.length, ...loaded); // แทนที่ค่าทั้งหมดใน todos
        todos.forEach(todo => addTodoToDOM(todo)); //เพิ่มข้อมูลที่โหลดมาไปยัง DOM
    }
});

form.addEventListener('submit', function (e) {
    e.preventDefault(); //กันหน้าโหลดซ้ำ

    const text = input.value.trim(); //ตัดช่องว่างออก
    if (text === '') return; //ถ้าไม่มีข้อความให้หยุดทำงาน

    const todo = { text: text, completed: false }; //สร้าง object สำหรับเก็บข้อมูล
    todos.push(todo); //เพิ่มข้อมูลเข้าไปใน array
    addTodoToDOM(todo); //เพิ่มข้อมูลไปยัง DOM
    saveToLocal(); // <-- เพิ่มบรรทัดนี้ เพื่ออัพเดต localStorage
    input.value = ''; //เคลียร์ช่องกรอกข้อความ
});

//ฟังก์ชันสำหรับเพิ่มข้อมูลไปยัง DOM
function addTodoToDOM(todo) {
    const li = document.createElement('li'); //สร้าง li ใหม่
    li.textContent = todo.text; //ใส่ข้อความลงไปใน li
    if (todo.completed) {
        li.classList.add('completed'); //ถ้าข้อมูลถูกทำเครื่องหมายแล้วให้เพิ่ม class completed
    }

    //กดแล้วขีดฆ่า
    li.addEventListener('click', () => {
        li.classList.toggle('completed'); //เมื่อคลิกจะทำให้ข้อความขีดฆ่า
        todo.completed = !todo.completed; //เปลี่ยนสถานะ completed
        saveToLocal(); //บันทึกข้อมูลลง localStorage
    });

    //ปุ่มลบ
    const delBtn = document.createElement('button');
    delBtn.textContent = 'X';
    delBtn.addEventListener('click', (e) => {
        e.stopPropagation(); //หยุดการทำงานของ event click ที่ li
        list.removeChild(li); //ลบ li ออกจาก DOM
        const index = todos.indexOf(todo);
        if (index > -1) {
            todos.splice(index, 1); //ลบข้อมูลออกจาก array
        }
        saveToLocal(); //บันทึกข้อมูลลง localStorage
    });

    li.appendChild(delBtn); //เพิ่มปุ่มลบเข้าไปใน li
    list.appendChild(li); //เพิ่ม li เข้าไปใน ul
}
//ฟังก์ชันสำหรับบันทึกข้อมูลลง localStorage
function saveToLocal() {
    localStorage.setItem('todos', JSON.stringify(todos)); //แปลงข้อมูลเป็น JSON และบันทึกลง localStorage
}


// form.addEventListener('submit',  (e) =>{
//     e.preventDefault(); //กันหน้าโหลดซ้ำ

//     const text = input.value.trim(); //ตัดช่องว่างออก
//     if (text === '') return; //ถ้าไม่มีข้อความให้หยุดทำงาน

//     const li = document.createElement('li'); //สร้าง li ใหม่
//     li.textContent = text; //ใส่ข้อความลงไปใน li

//     //กดแล้วขีดฆ่า
//     li.addEventListener('click',  () =>{
//         li.classList.toggle('completed'); //เมื่อคลิกจะทำให้ข้อความขีดฆ่า
//     });

//     //ปุ่มลบ
//     const delBtn = document.createElement('button');
//     delBtn.textContent = 'X';
//     delBtn.addEventListener('click', () => {
//         li.remove(); //เมื่อคลิกปุ่มลบจะลบ li
//     }
//     );  

//     li.appendChild(delBtn); //เพิ่มปุ่มลบเข้าไปใน li
//     list.appendChild(li); //เพิ่ม li เข้าไปใน ul

//     input.value = ''; //เคลียร์ช่องกรอกข้อความ

// });

