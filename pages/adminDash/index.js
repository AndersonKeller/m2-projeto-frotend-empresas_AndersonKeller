import { getAllCompany, getSectorsByCompany } from "../../scripts/requests.js";

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
        console.log(emp)
        console.log(emp.companies.name)
        const li =document.createElement("li");
        li.classList.add("li-sector-dash");
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
        const btnEdit = document.createElement("button");
        btnEdit.classList.add("btn-edit")
        const btnTrash = document.createElement("button");
        btnTrash.classList.add("btn-remove-dash");
        divBtns.append(btnView,btnEdit,btnTrash);

        li.append(h3Name,pDescription,pCompany,divBtns);
        ul.appendChild(li)
    })
    

}
function logout(){
    const btnLogout = document.querySelector("#btn-logout")
    btnLogout.addEventListener("click",()=>{
        localStorage.removeItem("userToken")
    })
}
logout()
