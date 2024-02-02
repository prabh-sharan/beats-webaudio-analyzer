const input = document.querySelector("input");

input.addEventListener("change", ()=> {
    const file = input.files;
    if(!file) return;
    console.log(file);
})