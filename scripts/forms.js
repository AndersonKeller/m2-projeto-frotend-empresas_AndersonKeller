import { getAllCompany } from "./requests.js";

export async function createForm(){
    
    const modal =  document.querySelector(".modal");
    modal.insertAdjacentHTML("afterbegin",`
    <h2 class="modal-title">Criar departamento</h2>
    <form>
        <input required id="name" type="text" placeholder="Nome do departamento">
        <input required  id="description" type="text" placeholder="Descrição do departamento">
        <select name="company_uuid" id="company-modal">
            <option value="">Selecionar empresa</option>
        </select>
        <button type="submit" class="btn-form text-btn">Criar o departamento</button>
    </form>
    `)
    const companies = await getAllCompany();
    console.log(companies)
    companies.forEach((comp)=>{
        const select = document.querySelector("#company-modal")
    console.log(select)
    select.insertAdjacentHTML("beforeend",`
    <option value="${comp.uuid}">${comp.name}</option>
    `)
    })
    
}
