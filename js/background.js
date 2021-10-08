const images = [
    "0.jpg",
    "1.jpg",
    "2.jpg",
    "3.jpg",
]

const todaysImg = images[Math.floor(Math.random() * images.length)]

// const bgImg = document.createElement('img');
// bgImg.src = `img/${todaysImg}`

// document.body.appendChild(bgImg)

document.body.style.background = `url(img/${todaysImg}) no-repeat 50% 50%/cover`;