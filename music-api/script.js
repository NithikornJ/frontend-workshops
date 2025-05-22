const music_container = document.getElementById("music-container"); // ดึง element music-container
const playBtn = document.getElementById("play"); // ดึงปุ่ม play
const prevBtn = document.getElementById("prev"); // ดึงปุ่ม previous
const nextBtn = document.getElementById("next"); // ดึงปุ่ม next
const audio = document.getElementById("audio"); // ดึง element audio
const progress = document.getElementById("progress"); // ดึง progress bar (แถบสีแดง)
const progressContainer = document.getElementById("progress-container"); // ดึง progress bar container
const title = document.getElementById("title"); // ดึง element แสดงชื่อเพลง
const cover = document.getElementById("cover"); // ดึง element รูปปกเพลง

const songs = ["Contra", "HAvestMoon", "Mario"]; // รายชื่อเพลงทั้งหมด
let inDex = 1 // ตัวแปรเก็บ index ของเพลงปัจจุบัน

function loadSong(song) { // ฟังก์ชันโหลดข้อมูลเพลง
    title.innerText = `เพลง ${song}`; // แสดงชื่อเพลง
    cover.src = `cover/${song}.jpg`; // เปลี่ยนรูปปก
    audio.src = `music/${song}.mp3`; // เปลี่ยนไฟล์เพลง
}

loadSong(songs[inDex]); // โหลดเพลงเริ่มต้น

playBtn.addEventListener("click", () => { // เมื่อคลิกปุ่ม play/pause
    const isPlaying = music_container.classList.contains("play"); // ตรวจสอบสถานะเล่นเพลง
    if (isPlaying) {
        pauseSong(); // ถ้าเล่นอยู่ ให้หยุดเพลง
    } else {
        playSong(); // ถ้าไม่ได้เล่น ให้เล่นเพลง
    }
});

prevBtn.addEventListener("click", () => { // เมื่อคลิกปุ่ม previous
    inDex--; // ลด index เพลง
    if (inDex < 0) { // ถ้า index น้อยกว่า 0
        inDex = songs.length - 1; // กลับไปเพลงสุดท้าย
    }
    loadSong(songs[inDex]); // โหลดเพลงใหม่
    playSong(); // เล่นเพลงใหม่
});

nextBtn.addEventListener("click", () => { // เมื่อคลิกปุ่ม next
    inDex++; // เพิ่ม index เพลง
    if (inDex > songs.length - 1) { // ถ้า index เกินจำนวนเพลง
        inDex = 0; // กลับไปเพลงแรก
    }
    loadSong(songs[inDex]); // โหลดเพลงใหม่
    playSong(); // เล่นเพลงใหม่
});

function playSong() { // ฟังก์ชันเล่นเพลง
    music_container.classList.add("play"); // เพิ่มคลาส play เพื่อเปลี่ยนไอคอนและอนิเมชัน
    playBtn.querySelector("i.fas").classList.remove("fa-play"); // เปลี่ยนไอคอนจาก play เป็น pause
    playBtn.querySelector("i.fas").classList.add("fa-pause"); // เปลี่ยนไอคอนจาก play เป็น pause
    audio.play(); // สั่งให้เล่นเพลง
}

function pauseSong() { // ฟังก์ชันหยุดเพลงชั่วคราว
    music_container.classList.remove("play"); // ลบคลาส play เพื่อเปลี่ยนไอคอนและอนิเมชัน
    playBtn.querySelector("i.fas").classList.remove("fa-pause"); // เปลี่ยนไอคอนจาก pause เป็น play
    playBtn.querySelector("i.fas").classList.add("fa-play"); // เปลี่ยนไอคอนจาก pause เป็น play
    audio.pause(); // สั่งหยุดเพลงชั่วคราว
}

audio.addEventListener("timeupdate", (e) => { // เมื่อเวลาเล่นเพลงเปลี่ยน (เพลงกำลังเล่น)
    const { duration, currentTime } = e.target; // ดึงค่าความยาวเพลงและเวลาปัจจุบัน
    const progressPercent = (currentTime / duration) * 100; // คำนวณเปอร์เซ็นต์ความคืบหน้า
    progress.style.width = `${progressPercent}%`; // ปรับความกว้าง progress bar ให้ตรงกับเวลา
});

progressContainer.addEventListener("click", (e) => { // เมื่อคลิกที่ progress bar
    const width = progressContainer.clientWidth; // ความกว้างของ progress bar
    const clickX = e.offsetX; // ตำแหน่งที่คลิก (แนวนอน) จากซ้าย
    const duration = audio.duration; // ความยาวของเพลง (วินาที)
    audio.currentTime = (clickX / width) * duration; // คำนวณเวลาใหม่ตามตำแหน่งที่คลิก
});

audio.addEventListener("ended", () => { // เมื่อเพลงจบ
    inDex++; // ไปเพลงถัดไป
    if (inDex > songs.length - 1) { // ถ้าเกินจำนวนเพลง
        inDex = 0; // กลับไปเพลงแรก
    }
    loadSong(songs[inDex]); // โหลดเพลงใหม่
    playSong(); // เล่นเพลงใหม่
});