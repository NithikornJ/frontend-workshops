const count = 10;
const apiKey = 'RjL2AumkmC7QvowFOOW3KwXLav_g0s79u_dhzaxuooE';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

const imageContainer = document.getElementById('img-container');
let photosArray = [];

async function getPhotos() {
    try {
        const res = await fetch(apiUrl);
        photosArray = await res.json();
        displayPhotos();
    }catch(err){
        console.log(err);
    }
}
function displayPhotos() {
    photosArray.forEach((photo)=> {
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');
        
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('title', photo.alt_description);
        img.setAttribute('alt', photo.alt_description);

        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Event listener for scroll
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        console.log('Load more photos');
        getPhotos();
    }
});

getPhotos();