//import { showMenu } from "../home/index.js";

import { getLocalStorageToken } from "../../scripts/localStorage.js";
import { getUserLogged, loginApi } from "../../scripts/requests.js";

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

async function formLogin(){
    let user = {}
    const form = document.querySelector("form");
    console.log(form.elements)
    const list = [...form.elements]
    form.addEventListener("submit",async (e)=>{
        e.preventDefault()
        list.forEach((element)=>{
           if(element.tagName == "INPUT" && element.value != ""){
            user[element.name] = element.value
           }
        })
        
        const resp = await loginApi(user)
        const token = await getLocalStorageToken()
        console.log(token)
        const dataUser = await getUserLogged(token.token)
        localStorage.setItem("dataUser",JSON.stringify(dataUser));
        
        
    })
    
}
formLogin()

