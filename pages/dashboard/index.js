import { getLocalStorageToken, getLocalStorageUserData } from "../../scripts/localStorage.js";
import { verifyAdmin } from "../../scripts/requests.js";

function logout(){
    const btnLogout = document.querySelector("#btn-logout")
    btnLogout.addEventListener("click",()=>{
        localStorage.removeItem("userToken")
    })
}
logout()
{/* <h2 class="username">Username</h2>
            <p class="user-email">email@gmail.com</p>
            <p class="user-level">Pleno</p>
            <p class="user-kind">HomeOffice</p>
            <button class="btn-edit-user"></button> */}
async function renderSectionUser(){
    const section =document.querySelector(".user-data");
    section.innerHTML = ""
    const user = await getLocalStorageUserData();
   

    const h2Name = document.createElement("h2");
    h2Name.classList.add("username");
    h2Name.innerText = user.username;
    const pEmail = document.createElement("p");
    pEmail.classList.add("user-email");
    pEmail.innerText = user.email;
    const pLevel = document.createElement("p");
    pLevel.classList.add("user-level");
    pLevel.innerText = user.professional_level;
    const pKind = document.createElement("p");
    pKind.classList.add("user-kind");
    pKind.innerText = user.kind_of_work;

    const btnEdit = document.createElement("button");
    btnEdit.classList.add("btn-edit-user");

    section.append(h2Name,pEmail,pLevel,pKind,btnEdit)


}
renderSectionUser()
{/* <li class="li-not-work">Você ainda não foi contratado</li> */}
async function renderCoWorks(){
    const ul  = document.querySelector(".ul-coworks")
    const user = await getLocalStorageUserData();
    console.log(user)
    if(user.department_uuid == null ){
        const li = document.createElement("li");
        li.classList.add("li-not-work");
        li.classList.add("text-not-work")
        li.innerText = "Você ainda não foi contratado"
        ul.appendChild(li)
     }else{
        
     }
}
renderCoWorks()


