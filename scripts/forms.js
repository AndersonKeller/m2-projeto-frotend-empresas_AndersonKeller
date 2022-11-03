
import { getAllCompany, getAllDepartments, getAllUsers, getAllSectors } from "./requests.js";

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
   
   const work = await getAllUsers();
   work.forEach((w)=>{
    //console.log(w.department_uuid)
   });
   const findWorks = work.filter((e)=>{
    return e.department_uuid == dep.uuid
   });
   console.log(findWorks)
    const modal = document.querySelector(".modal");
    
    modal.insertAdjacentHTML("afterbegin",`
    <h2 class="modal-title-view">${dep.name}</h2>
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
    const companyWork = await getAllSectors();
   
    
    
    const ul = document.querySelector(".ul-employees");
        findWorks.forEach(async (work)=>{
            //console.log(work.department_uuid)
            const findCompany = await companyWork.find((name)=>{
                return work.department_uuid == name.uuid
            });
            console.log(findCompany.companies.name)

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

            li.append(h3name,pLevel,pCompany,btnFired);
            ul.appendChild(li)
        })
    // <li class="li-employee">
    //         <h3 class="user-name">Username</h3>
    //         <p class="user-level">Pleno</p>
    //         <p class="user-company">Company name</p>
    //         <button class="btn-fired text-btn">Desligar</button>
    //     </li>
    //     <li class="li-employee">
    //         <h3 class="user-name">Username</h3>
    //         <p class="user-level">Pleno</p>
    //         <p class="user-company">Company name</p>
    //         <button class="btn-fired text-btn">Desligar</button>
    //     </li>
    //     <li class="li-employee">
    //         <h3 class="user-name">Username</h3>
    //         <p class="user-level">Pleno</p>
    //         <p class="user-company">Company name</p>
    //         <button class="btn-fired text-btn">Desligar</button>
    //     </li>
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