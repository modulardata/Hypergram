// ===== Variables =====
let originalPixels;
let contrast = 0;
let brightness = 0;
let transparency = 1;

// ===== HTML Elements =====
const fileInput = document.getElementById("file-input");
const contrastSlider = document.getElementById("contrast");
const brightnessSlider = document.getElementById("brightness");
const transparencySlider = document.getElementById("transparent");

// ===== Event Listeners =====
contrastSlider.addEventListener("change", (e) => {
    contrast = parseInt(e.target.value);
    adjustImage();
});

brightnessSlider.addEventListener("change", (e) => {
    brightness = parseInt(e.target.value);
    adjustImage();
});

transparencySlider.addEventListener("change", (e) => {
    transparency = parseFloat(e.target.value);
    adjustImage();
});

fileInput.addEventListener("change", (e) => {
    if (e.target.files) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = (ev) => {
            const image = new Image();
            image.src = ev.target.result;
            image.onload = loadImage(image);
            resetSliders();
        };
    }
});

// ===== Functions =====
const getCanvas = () => document.getElementById("canvas");
const getCtx = () => getCanvas().getContext("2d");

const loadImage = (image) => (_) => {
    const canvas = getCanvas();
    const ctx = getCtx();
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
    originalPixels = getPixels();
};

const getPixels = () => {
    const canvas = getCanvas();
    const ctx = getCtx();
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    return imageData.data;
};

const adjustImage = () => {
    if (!originalPixels) return;

    // Necessary data
    const canvas = getCanvas();
    const ctx = getCtx();
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    pixels.set(originalPixels);

    // Necessary calculations/functions
    const Truncate = (number) => (number < 0 ? 0 : number > 255 ? 255 : number);
    const Factor = (259 * (255 + contrast)) / (255 * (259 - contrast));
    const changeContrast = (color) => Factor * (color - 128) + 128;
    const changeBrightness = (color) => color + brightness;
    const changeColor = (color) =>
      Truncate(changeBrightness(changeContrast(color)));
    const changeTransparency = (alpha) => alpha * transparency;

    // Changing pixels
    for (let i = 0; i < pixels.length; i += 4) {
        const RED = pixels[i];
        const GREEN = pixels[i + 1];
        const BLUE = pixels[i + 2];
        const ALPHA = pixels[i + 3];

        pixels[i] = changeColor(RED);
        pixels[i + 1] = changeColor(GREEN);
        pixels[i + 2] = changeColor(BLUE);
        pixels[i + 3] = changeTransparency(ALPHA);
    }

    getCtx().putImageData(imageData, 0, 0);
};

const resetSliders = () => {
    contrastSlider.value = 0;
    brightnessSlider.value = 0;
    transparencySlider.value = 1;

    contrastSlider.dispatchEvent(new Event("change"));
    brightnessSlider.dispatchEvent(new Event("change"));
    transparencySlider.dispatchEvent(new Event("change"));
};