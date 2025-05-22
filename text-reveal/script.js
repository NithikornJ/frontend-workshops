const contentsEl = document.querySelectorAll('.content');

document.addEventListener('scroll', showText);

// window.addEventListener('load', () => {
//   setTimeout(showText, 100); // หรือ 300ms
// });

function showText() {
    contentsEl.forEach(section => {
        const imgEl = section.querySelector('img');
        const textEl = section.querySelector('.text');

        // const scrollpos = window.pageYOffset;
        // const textPos = imgEl.offsetTop + imgEl.offsetHeight / 2;
        // if(scrollpos > textPos){
        //     textEl.classList.add('show-reveal')
        // }else{
        //     textEl.classList.remove('show-reveal')
        // }
        const rect = imgEl.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.top < windowHeight - 200) {
            textEl.classList.add('show-reveal');
        } else {
            textEl.classList.remove('show-reveal');
        }

    })
}