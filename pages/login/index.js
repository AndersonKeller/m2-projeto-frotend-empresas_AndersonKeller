//import { showMenu } from "../home/index.js";
showMenu()
function showMenu(){
    const showMenu = document.querySelector(".show-menu");
    showMenu.addEventListener("click",()=>{
        const divBtns = document.querySelector(".nav-btns");
        console.log("Oi")
        divBtns.classList.toggle("show-div-btns");
        showMenu.classList.toggle("close-menu");
    })
}