class App {
    constructor(htmlEl) {
        this.canvas = htmlEl.querySelector("canvas");
        this.context = this.canvas.getContext("2d");
        this.fileInputEl = htmlEl.querySelector("#file-input");
        this.brightnessInputEl = htmlEl.querySelector("#brightness");
        this.contrastInputEl = htmlEl.querySelector("#contrast");
        this.transparentInputEl = htmlEl.querySelector("#transparent");
        this.saveBtn = htmlEl.querySelector("#save-button");

        this.fileInputEl.addEventListener("input", this.handleUpload.bind(this));
        this.initialize();
    }
    initialize() {
        this.canvas.width = 30;
        this.canvas.height = 30;
    }
    handleUpload() {
        const file = this.fileInputEl.files[0];

        const imgEl = document.createElement("img");

        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = (e) => {
            imgEl.src = reader.result;
            imgEl.onload = () => {
                this.context.drawImage(imgEl, 0, 0)
            };
        }
    }
}

const app = new App(document.body);
