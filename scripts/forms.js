
import { getAllCompany, getAllDepartments, getAllUsers, getAllSectors, getAllNotWorks, hireEmployee, fireEmployee } from "./requests.js";

export async function createForm(){
    
    const modal = document.querySelector(".modal");
    modal.insertAdjacentHTML("afterbegin",`
    <h2 class="modal-title">Criar departamento</h2>
    <form id="form-create-dep">
        <input required id="name" type="text" placeholder="Nome do departamento">
        <input required  id="description" type="text" placeholder="Descrição do departamento">
        <select name="company_uuid" id="company_uuid">
            <option value="">Selecionar empresa</option>
        </select>
        <button type="submit" class="btn-form text-btn">Criar o departamento</button>
    </form>
    `)
    const companies = await getAllCompany();
    
    companies.forEach((comp)=>{
        const select = document.querySelector("#company_uuid")
    
    select.insertAdjacentHTML("beforeend",`
    <option value="${comp.uuid}">${comp.name}</option>
    `)
    })
    
}

export async function editDepartmentForm(){

    const modal = document.querySelector(".modal");
    modal.insertAdjacentHTML("afterbegin",`
    <h2 class="modal-title">Editar departamento</h2>
    <form>
    <input class="input-preview" id="description" type="text" placeholder="Descrição do departamento">
        <button type="submit" class="btn-form text-btn">Salvar alterações</button>
    </form>
    `)
}
export async function removeDepartementForm(){
    const modal = document.querySelector(".modal");
    modal.insertAdjacentHTML("afterbegin",`
    <h2 class="modal-title">Realmente deseja deletar o Departamento NOME e demitir seus funcionários?</h2>
    <button id="btn-remove-dep" class="text-btn btn-green">Confirmar</button>
    `)
}

export async function viewDepartmentForm(dep){
   //console.log(dep.uuid)
   const work = await getAllUsers();
   const findWorks = work.filter((e)=>{
    return e.department_uuid == dep.uuid
   });
    const modal = document.querySelector(".modal");
    modal.insertAdjacentHTML("afterbegin",`
    <h2 id="${dep.uuid}" class="modal-title-view">${dep.name}</h2>
    <div class="div-header-modal">
        <p class="description-dep">${dep.description}</p>
        <select class="select-user" name="select-user" id="select-user">
        <option value="">Selecionar usuário</option>
    </select>
    <p class="company-dep">${dep.companies.name}</p>
    
    <button class="btn-hire text-btn btn-green">Contratar</button>
    </div>
    <ul class="ul-employees">
        
    </ul>
    `);
    await renderWorkers(findWorks)
    await hireEmployeeEvent()
   
}
async function hireEmployeeEvent(){
    const btnHire = document.querySelector(".btn-hire");
    const depId = document.querySelector(".modal-title-view");
   
    btnHire.addEventListener("click",async ()=>{
        const selectUser = document.querySelector("#select-user");
        const user ={
            user_uuid: selectUser.value,
            department_uuid: depId.id
        }
       await hireEmployee(user);
       //await renderWorkers(findWorks)
       const modalWrapper = document.querySelector(".modal-wrapper");
       setTimeout(()=>{
        modalWrapper.remove()
       },500)
    })
}

async function renderWorkers(findWorks){
    const companyWork = await getAllSectors(); 
    const ul = document.querySelector(".ul-employees");
    ul.innerHTML =""
        findWorks.forEach(async (work)=>{
            //console.log(work.department_uuid)
            const findCompany = await companyWork.find((name)=>{
                return work.department_uuid == name.uuid
            });
            
            const li = document.createElement("li");
            li.classList.add("li-employee");
            const h3name = document.createElement("h3");
            h3name.classList.add("user-name");
            h3name.innerText = work.username;
            const pLevel =document.createElement("p");
            pLevel.classList.add("user-level");
            pLevel.innerText = work.professional_level;
            const pCompany = document.createElement("p");
            pCompany.innerText = findCompany.companies.name;
            const btnFired = document.createElement("button");
            btnFired.classList.add("btn-fired");
            btnFired.classList.add("text-btn");
            btnFired.innerText="Desligar";
            btnFired.id = work.uuid
            btnFired.addEventListener("click",async ()=>{
                await fireEmployeeEvent(btnFired.id)
            })


            li.append(h3name,pLevel,pCompany,btnFired);
            ul.appendChild(li)
        });
        const notWork = await getAllNotWorks();
        
        const selectUser = document.querySelector(".select-user");
        notWork.forEach((user)=>{
            selectUser.insertAdjacentHTML("beforeend",`
            <option value="${user.uuid}">${user.username}</option>
            `)
        });
}
export async function fireEmployeeEvent(id){
    await fireEmployee(id);
    const modalWrapper = document.querySelector(".modal-wrapper");
       setTimeout(()=>{
        modalWrapper.remove()
       },500)
   
}

export async function editUserForm(){
    const modal = document.querySelector(".modal");
    
   
    modal.insertAdjacentHTML("afterbegin",`
    <h2 class="modal-title">Editar departamento</h2>
    <form id="form-edit-user">
    <select class="select-kind" name="select-kind" id="kind_of_work">
        <option value="">Selecionar modalidade de trabalho</option>
        <option value="home office">HomeOffice</option>
        <option value="presencial">Presencial</option>
        <option value="hibrido">Híbrido</option>
    </select>
    <select class="select-level" name="select-level" id="professional_level">
        <option value="">Selecionar nível profissional</option>
        <option value="estágio">Estágio</option>
        <option value="júnior">Júnior</option>
        <option value="pleno">Pleno</option>
        <option value="sênior">Sênior</option>
    </select>
    <button type="submit" class="btn-form text-btn">Editar</button>
   </form>
    `)
}
export async function removeUserForm(){
    const modal = document.querySelector(".modal");
    modal.insertAdjacentHTML("afterbegin",`
    <h2 class="modal-title">Realmente deseja remover o usuário NOME?</h2>
    <button class="text-btn btn-green">Confirmar</button>
    `)
}