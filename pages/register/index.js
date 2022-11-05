import { registerUser } from "../../scripts/requests.js";


function registerUserForm(){
    const formRegister = document.querySelector("form");
    const list = [...formRegister.elements];
    const user ={}
    formRegister.addEventListener("submit",async (e)=>{
        e.preventDefault()
        console.log("oi")
        list.forEach((element)=>{
            
           if(element.tagName == "INPUT" || element.tagName == "SELECT"){

                user[element.id] = element.value
           }
        })
        const resp = await registerUser(user)
        console.log(resp)
    })
}
registerUserForm()

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