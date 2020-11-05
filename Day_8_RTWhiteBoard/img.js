let upload = document.querySelector("#upload");
upload.addEventListener("click", function (e) {
    let uInp = document.querySelector("input[type='file']");
    uInp.click();
    // any image is selected
    uInp.addEventListener("change", function () {
        let container = createBox();
        let file = uInp.files[0];
        let img = document.createElement("img");
        img.src = URL.createObjectURL(file);
        img.setAttribute("class", "upload-img")
        container.appendChild(img);
    })
})