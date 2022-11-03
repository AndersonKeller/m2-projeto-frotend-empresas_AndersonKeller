
import { getAllCompany, getAllDepartments } from "./requests.js";

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
    console.log(dep)
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
        <li class="li-employee">
            <h3 class="user-name">Username</h3>
            <p class="user-level">Pleno</p>
            <p class="user-company">Company name</p>
            <button class="btn-fired text-btn">Desligar</button>
        </li>
        <li class="li-employee">
            <h3 class="user-name">Username</h3>
            <p class="user-level">Pleno</p>
            <p class="user-company">Company name</p>
            <button class="btn-fired text-btn">Desligar</button>
        </li>
        <li class="li-employee">
            <h3 class="user-name">Username</h3>
            <p class="user-level">Pleno</p>
            <p class="user-company">Company name</p>
            <button class="btn-fired text-btn">Desligar</button>
        </li>
    </ul>
    `)
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