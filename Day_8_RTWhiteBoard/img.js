let upload = document.querySelector("#upload");
upload.addEventListener("change", function (e) {
    let uInp = document.querySelector("input[type='file']");
    // let changed = false;
    let container = createBox();
    let file = uInp.files[0];
    let img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    img.setAttribute("class", "upload-img");
    container.appendChild(img);
//  remove
    uInp.value = null; 
})