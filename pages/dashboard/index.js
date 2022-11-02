import { getLocalStorageToken, getLocalStorageUserData } from "../../scripts/localStorage.js";
import { getAllCompany, getCoworkers, verifyAdmin } from "../../scripts/requests.js";

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
    const cowork = await getCoworkers();
    
    const mapUsers = cowork.map((e)=>{
         return e.users 
     })
    console.log(user)
    if(user.department_uuid == null ){
        const li = document.createElement("li");
        li.classList.add("li-not-work");
        li.classList.add("text-not-work")
        li.innerText = "Você ainda não foi contratado"
        ul.appendChild(li)
     }else{
        const main = document.querySelector("main");
        const divWork = document.createElement("div");
        divWork.classList.add("div-user-work");
        const h2CompanyName = document.createElement("h2");



        console.log(mapUsers)
        mapUsers.forEach((userCowork)=>{
            userCowork.forEach((e)=>{
                const li = document.createElement("li");
                li.classList.add("li-default");
                const h2name = document.createElement("h2");
                h2name.classList.add("name-cowork");
                h2name.innerText= e.username;
                const pLevel = document.createElement("p");
                pLevel.classList.add("level");
                pLevel.innerText = e.professional_level

                li.append(h2name,pLevel)
                ul.appendChild(li)
            })
            

        })
        
     }
}

renderCoWorks()


