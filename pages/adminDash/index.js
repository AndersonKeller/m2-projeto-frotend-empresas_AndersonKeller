import { createForm, editDepartmentForm, removeDepartementForm, viewDepartmentForm, editUserForm,removeUserForm } from "../../scripts/forms.js";
import { createModal } from "../../scripts/modal.js";
import { createDepartment, deleteDepartment, deleteUser, editDepartment, editUserInfo, getAllCompany, getAllDepartments, getAllSectors, getAllUsers, getSectorsByCompany } from "../../scripts/requests.js";

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
    btnViewDepartment()
    btnEditDepartment();
    btnRemoveDepartment();

}
function logout(){
    const btnLogout = document.querySelector("#btn-logout")
    btnLogout.addEventListener("click",()=>{
        localStorage.removeItem("userToken")
    })
}
logout()

async function renderAllUsers(){
    const ul = document.querySelector(".ul-users-dash");
    ul.innerHTML = ""
    const users = await getAllUsers();
    const companyWork = await getAllSectors();
    console.log(companyWork)
    
    users.forEach(async (e)=>{
        let findCompany = ""
        if(e.department_uuid){
             findCompany= await companyWork.find((comp)=>{
                return comp.uuid == e.department_uuid
            })
        }
       
       // console.log(findCompany.companies.name)
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
        if(findCompany){
            pCompanyName.innerText = findCompany.companies.name
        }else{
            pCompanyName.innerText=""
        }
        

        const divBtns = document.createElement("div");
        divBtns.classList.add("div-btns");
        const btnEdit = document.createElement("button");
        btnEdit.classList.add("btn-edit-user");
        btnEdit.id = e.uuid
        const btnRemove = document.createElement("button");
        btnRemove.classList.add("btn-remove-user");
        btnRemove.id = e.uuid

        divBtns.append(btnEdit,btnRemove)
        li.append(h3UserName,pLevel,pCompanyName,divBtns);
        ul.appendChild(li)
    })
    
    btnEditUser();
    btnRemoveUser()
}
renderAllUsers()

async function btnCreateDepartment(){
    const btnCreate = document.querySelector(".btn-create");
    btnCreate.addEventListener("click",async ()=>{
        createModal()
        await createForm();
        const form = document.querySelector("form");
        const list = [...form.elements];
        const newDepartment = {}

        form.addEventListener("submit",async (e)=>{
            e.preventDefault()
            list.forEach((element)=>{
               if(element.value){
                newDepartment[element.id]= element.value
               }
              
            })
            await createDepartment(newDepartment);
            const modal = document.querySelector(".modal-wrapper");
            setTimeout(()=>{
                modal.remove()
                renderUlCompanies()
            },1000)
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
            await editDepartmentForm();
           const allDeps = await getAllSectors();
           const findId = allDeps.find((dep)=>{
            return dep.uuid == btn.id
           })
           const inputPreview = document.querySelector(".input-preview");
           inputPreview.value = findId.description;
           
           const btnForm = document.querySelector(".btn-form");
        
           
           btnForm.addEventListener("click",async (e)=>{
            e.preventDefault();
                const descriptionInput = document.querySelector("#description")
                const obj = {
                description: descriptionInput.value
                }
                await editDepartment(findId.uuid,obj);
                console.log("Editou");
                const modal = document.querySelector(".modal-wrapper");
            setTimeout(()=>{
                modal.remove()
                renderUlCompanies()
            },1000)
           })

            
        })
    })
}
async function btnRemoveDepartment(){
    const btnRemove = document.querySelectorAll(".btn-remove-dash");
    btnRemove.forEach((btn)=>{
        btn.addEventListener("click",async ()=>{
            createModal();
            await removeDepartementForm();
            const btnRemove = document.querySelector(".btn-remove-dash");
            const idDep = btnRemove.id;
            
            const btnConfirm = document.querySelector("#btn-remove-dep");
             btnConfirm.addEventListener("click",async ()=>{
                await deleteDepartment(idDep);
                const modal = document.querySelector(".modal-wrapper");
                setTimeout(()=>{
                    modal.remove();
                    renderUlCompanies()
                },1000);
               
             })
            
        })
        
    })
    
}
async function btnViewDepartment(){
    const btnView = document.querySelectorAll(".btn-view");
    btnView.forEach((btn)=>{
        btn.addEventListener("click",async ()=>{
            createModal();
            
            const sectors = await getAllSectors();
            console.log(btn.id)
           
            const findSec = sectors.find((sec)=>{
                return sec.uuid == btn.id
            })
            await viewDepartmentForm(findSec);
        })
    })
}
async function btnEditUser(){
    const btnEditUser = document.querySelectorAll(".btn-edit-user");
    btnEditUser.forEach((btn)=>{
        btn.addEventListener("click",async ()=>{
            createModal();
            await editUserForm();
            const info ={}
            const form = document.querySelector("#form-edit-user");
            const listForm = [...form.elements]
            form.addEventListener("submit",async (e)=>{
                e.preventDefault()
                listForm.forEach((element)=>{
                    if(element.value){
                        info[element.id] = element.value
                    }
                    
                })
                console.log(btn.id)
                console.log(info);
               await editUserInfo(btn.id,info);
               await renderAllUsers();
               const modal = document.querySelector(".modal-wrapper");
               
               setTimeout(()=>{
                   modal.remove();
                   
               },1000);
               
               //estágio, júnior, pleno, sênior
               //home office, presencial, hibrido
            })
           
        })
       
    })
    
}
async function btnRemoveUser(){
    const btnRemoveUser = document.querySelectorAll(".btn-remove-user");
    btnRemoveUser.forEach((btn)=>{
        btn.addEventListener("click",async ()=>{
            createModal();
            await removeUserForm();
            const btnDel = document.querySelector(".btn-green");
            
            btnDel.addEventListener("click",async ()=>{
                console.log(btn.id)
                await deleteUser(btn.id);
                console.log("removeu");
               
                const modal = document.querySelector(".modal-wrapper");
               
               setTimeout(()=>{
                   modal.remove();
                   
               },1000);
               renderAllUsers()
            })
        })
    })
}

