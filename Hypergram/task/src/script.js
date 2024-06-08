window.onload = () => {
    const uploadButton = document.querySelector('.upload-button');
    const fileInput = document.querySelector('#file-input');
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');


    uploadButton.addEventListener('click', (e) => {
        e.preventDefault();
        fileInput.click();
    });



    fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.addEventListener('load', () => {
            const img = new Image();
            img.addEventListener('load', () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0, img.width, img.height);
            });
            img.src = reader.result;
        });
        reader.readAsDataURL(file);
    });
}
