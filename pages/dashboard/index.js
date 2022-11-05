import { updateUserForm } from "../../scripts/forms.js";
import { getLocalStorageToken, getLocalStorageUserData } from "../../scripts/localStorage.js";
import { createModal } from "../../scripts/modal.js";
import { getAllCompany, getAllSectors, getCoworkers, getDepLocalUser, updateUser, verifyUser } from "../../scripts/requests.js";

async function verifyToken(){
    const resp = await verifyUser()
        if(resp.is_admin == true){
            window.location.replace("../home/index.html")
    }
}
await verifyToken()

function logout(){
    const btnLogout = document.querySelector("#btn-logout")
    btnLogout.addEventListener("click",()=>{
        localStorage.removeItem("userToken")
    })
}
logout()

async function renderSectionUser(){
    const section =document.querySelector(".user-data");
    section.innerHTML = ""
    const user = await getLocalStorageUserData();
   
    const h2Name = document.createElement("h2");
    h2Name.classList.add("username");
    h2Name.innerText =  user.username;
    const pEmail = document.createElement("p");
    pEmail.classList.add("user-email");
    pEmail.innerText =  user.email;
    const pLevel = document.createElement("p");
    pLevel.classList.add("user-level");
    pLevel.innerText =  user.professional_level;
    const pKind = document.createElement("p");
    pKind.classList.add("user-kind");
    pKind.innerText =  user.kind_of_work;

    const btnEdit = document.createElement("button");
    btnEdit.classList.add("btn-edit-user");
   
    section.append(h2Name,pEmail,pLevel,pKind,btnEdit)

    btnUpdateUser()
}
await renderSectionUser()

async function renderCoWorks(){
    await renderSectionUser()
    const ul  = document.querySelector(".ul-coworks");
    ul.innerHTML=""
    const user = await getLocalStorageUserData();
    const cowork = await getCoworkers();
    
    const mapUsers = cowork.map((e)=>{
         return e.users 
     })
    
    if(user.department_uuid == null ){
        const li = document.createElement("li");
        li.classList.add("li-not-work");
        li.classList.add("text-not-work")
        li.innerText = "Você ainda não foi contratado"
        ul.appendChild(li)
     }else{
        
        const companyLocal = await getDepLocalUser();
        const findDepUser = companyLocal.departments.find((e)=>{
           return e.uuid == user.department_uuid
        })
        
        const main = document.querySelector(".div-user-work");
        main.innerHTML = ""
        main.insertAdjacentHTML("afterbegin",`
        
            <h2 class="company-name">${companyLocal.name}</h2>
            <p>-</p>
            <h2 class="sector-name">${findDepUser.name}</h2>
        `)
        
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

async function btnUpdateUser(){
    const btnEdit = document.querySelector(".btn-edit-user");
    
    btnEdit.addEventListener("click",async ()=>{
       await createModal();
       await updateUserForm();
        const user ={}
        const form = document.querySelector("form");
    const listElements = [...form.elements]
    form.addEventListener("submit",async (e)=>{
        e.preventDefault();
        
        listElements.forEach((element)=>{
            if(element.id){
                user[element.id] = element.value
            }
            
        })
       const resp = await updateUser(user);
      
       if(resp){
        const modal = document.querySelector(".modal-wrapper");
        localStorage.setItem("dataUser",JSON.stringify(resp));
        await renderSectionUser();
        await renderCoWorks();
        setTimeout(()=>{
            modal.remove()
        },500)
       }
        
    })
    })
    
}


