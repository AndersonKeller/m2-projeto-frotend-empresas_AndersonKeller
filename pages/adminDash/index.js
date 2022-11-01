import { getAllCompany } from "../../scripts/requests.js";

async function listOptionCompanies(){
    const select = document.querySelector("select");
    const companies = await getAllCompany();
   companies.forEach((company)=>{
    select.insertAdjacentHTML("beforeend",`
    <option value="${company.name}">${company.name}</option>
    `)
   })
}
listOptionCompanies()