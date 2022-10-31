export function showMenu(){
    const showMenu = document.querySelector(".show-menu");
    showMenu.addEventListener("click",()=>{
        const divBtns = document.querySelector(".nav-btns");
        console.log("Oi")
        divBtns.classList.toggle("show-div-btns");
        showMenu.classList.toggle("close-menu");
    })
}
showMenu()
import { getAllDepartments, getAllCompany } from "../../scripts/requests.js";

//getAllDepartments()

async function listDepartments(){
    const data = await getAllDepartments();
   
    return data
}

async function renderDepartments(){
    const ul = document.querySelector(".ul-sector");
    const departments = await getAllCompany();
    console.log(departments)
    departments.forEach((dep)=>{
        const li = document.createElement("li");
        li.classList.add("li-sector");
        const h3name = document.createElement("h3");
        h3name.classList.add("name-company");
        h3name.innerText = dep.name;
        
        const divInfos = document.createElement("div");
        divInfos.classList.add("div-infos");
        const pTime= document.createElement("p");
        pTime.classList.add("time-p");
        pTime.innerText = dep.opening_hours;


        const spanSector = document.createElement("span");
        spanSector.innerText = dep.sectors.description;
        spanSector.classList.add("span-sector");

        divInfos.append(pTime,spanSector);
        li.append(h3name,divInfos);

        ul.appendChild(li)
    })
}
renderDepartments()

async function renderOptions(){
    const data = await listDepartments();
    const select = document.querySelector(".title-sector");
    data.forEach((dep)=>{
        select.insertAdjacentHTML("beforeend",`
        <option value="${dep.description}">${dep.description}</option>
        `)
    })
}
renderOptions();
{/* <li class="li-sector">
                    <h3 class="name-company">Empresa Name</h3>
                    <div class="div-infos">
                        <p class="time-p">10 horas</p>
                    <span class="span-sector">Setor</span>
                    </div>
                </li> */}