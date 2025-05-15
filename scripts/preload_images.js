"use strict"

const imageArray = ['../images/band.png', '../images/tim.png', '../images/andy.png', '../images/matt.png'];

const preloadImages = (imageUrls) => {
    const images = [];

    for (let i = 0; i < imageUrls.length; i++) {
        images[i] = new Image();
        images[i].src = imageUrls[i];
    }

    return images;
}

const preloadedImages = preloadImages(imageArray);

const replaceHTMLImages = () => {
    const htmlImages = document.querySelectorAll(".card img");
    let loadedCount = 0;

    preloadedImages.forEach((img, index) => {
        img.onload = () => {
            loadedCount++;

            if (htmlImages[index]) {
                htmlImages[index].src = img.src; 
            }
        }
    });

}


document.addEventListener("DOMContentLoaded", () => {
 // add event handlers
    replaceHTMLImages();
});