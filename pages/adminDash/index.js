import { createForm, editDepartmentForm, removeDepartementForm } from "../../scripts/forms.js";
import { createModal } from "../../scripts/modal.js";
import { getAllCompany, getAllUsers, getSectorsByCompany } from "../../scripts/requests.js";

async function listOptionCompanies(){
    
    const companies = await getAllCompany();
    const select = document.querySelector("select");
   companies.forEach((company)=>{
    //console.log(company.sectors.uuid)
    let id = company.sectors.uuid
    
    select.insertAdjacentHTML("beforeend",`
    <option value="${company.uuid}">${company.name}</option>
    `)
   })
}
//listOptionCompanies()

async function eventSelectCompanie(){
    await listOptionCompanies()
    const select =  document.querySelectorAll(".select-company");
    
    select.forEach(async (option)=>{
        option.addEventListener("click",async ()=>{
           
           const res = await renderUlCompanies(option.value);
           
        })
    })
        
    
}
eventSelectCompanie();

async function renderUlCompanies(companyId){
    console.log(companyId)
    await listOptionCompanies()
    const company = await getSectorsByCompany(companyId);
    const ul = document.querySelector(".ul-sector-dash");
    console.log(company)
    ul.innerHTML = ""
    company.forEach(async (emp)=>{
        console.log(emp.uuid)
        console.log(emp.companies.name)
        const li =document.createElement("li");
        li.classList.add("li-sector-dash");
        li.id = emp.uuid;
        const h3Name = document.createElement("h3");
        h3Name.innerText = emp.name;
        const pDescription = document.createElement("p");
        pDescription.classList.add("sector-description")
        pDescription.innerText = emp.description;
        const pCompany = document.createElement("p");
        pCompany.classList.add("company-name");
        pCompany.innerText = emp.companies.name;

        const divBtns = document.createElement("div");
        divBtns.classList.add("div-btns");
        const btnView = document.createElement("button");
        btnView.classList.add("btn-view");
        btnView.id = emp.uuid;
        const btnEdit = document.createElement("button");
        btnEdit.classList.add("btn-edit");
        btnEdit.id = emp.uuid;
        const btnTrash = document.createElement("button");
        btnTrash.classList.add("btn-remove-dash");
        btnTrash.id = emp.uuid;
        divBtns.append(btnView,btnEdit,btnTrash);

        li.append(h3Name,pDescription,pCompany,divBtns);
        ul.appendChild(li)
       
    })
    btnEditDepartment();
    btnRemoveDepartment()

}
function logout(){
    const btnLogout = document.querySelector("#btn-logout")
    btnLogout.addEventListener("click",()=>{
        localStorage.removeItem("userToken")
    })
}
logout()

async function renderAllUsers(){
    const ul = document.querySelector(".ul-users-dash")
    const users = await getAllUsers()
    users.forEach((e)=>{
        
        const li = document.createElement("li");
        li.classList.add("li-user-dash");
        const h3UserName = document.createElement("h3");
        h3UserName.classList.add("user-name");
        h3UserName.innerText = e.username;

        const pLevel = document.createElement("p");
        pLevel.classList.add("user-level");
        pLevel.innerText = e.professional_level
        
        const pCompanyName = document.createElement("p");
        pCompanyName.classList.add("user-company");
        pCompanyName.innerText = "Company Name"

        const divBtns = document.createElement("div");
        divBtns.classList.add("div-btns");
        const btnEdit = document.createElement("button");
        btnEdit.classList.add("btn-edit-user");
        const btnRemove = document.createElement("button");
        btnRemove.classList.add("btn-remove-dash");

        divBtns.append(btnEdit,btnRemove)
        li.append(h3UserName,pLevel,pCompanyName,divBtns);
        ul.appendChild(li)
    })
    

}
renderAllUsers()

function btnCreateDepartment(){
    const btnCreate = document.querySelector(".btn-create");
    btnCreate.addEventListener("click",async ()=>{
        createModal()
        await createForm();
        const form = document.querySelector("form");
        form.addEventListener("submit",(e)=>{

            e.preventDefault()
            
        })
    })
}
btnCreateDepartment()

async function btnEditDepartment(){
    //await eventSelectCompanie()
    const btnEditDep = document.querySelectorAll(".btn-edit")
    btnEditDep.forEach((btn)=>{
       
        btn.addEventListener("click",async ()=>{
            createModal();
            await editDepartmentForm()
        })
    })
}
async function btnRemoveDepartment(){
    const btnRemove = document.querySelectorAll(".btn-remove-dash");
    btnRemove.forEach((btn)=>{
        btn.addEventListener("click",async ()=>{
            createModal();
            await removeDepartementForm()
        })
    })
}
