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

let download = document.querySelector("#download"); 
download.addEventListener("click", function () {
    //configuration done
    let a = document.createElement("a");    //anchor
    a.href = board.toDataURL('image/png');  // extension defintion
    a.download = 'file.png';    //prompts user to download the url rather than navigating it

    //now internally clicked to download 
    a.click();
    a.remove(); //prevents memory leak 
}
)