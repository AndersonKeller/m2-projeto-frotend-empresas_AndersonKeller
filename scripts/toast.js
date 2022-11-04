export async function toastCreate(status,text){
    const main = document.querySelector("main");
    const divMain = document.createElement("div");
    divMain.classList.add("toast-container");
    if(status=="ok"){
        divMain.classList.add("sucess");
    }else{
        divMain.classList.add("error")
    }
    const h2text = document.createElement("h3");
    h2text.innerText = text;

    divMain.appendChild(h2text)
    main.appendChild(divMain)
   // divMain.remove()
}
export async function toastCreateModal(status,text){
    const main = document.querySelector(".modal-wrapper");
    const divMain = document.createElement("div");
    divMain.classList.add("toast-container");
    if(status=="ok"){
        divMain.classList.add("sucess");
    }else{
        divMain.classList.add("error")
    }
    const h2text = document.createElement("h3");
    h2text.innerText = text;

    divMain.appendChild(h2text)
    main.appendChild(divMain)
   // divMain.remove()
}
