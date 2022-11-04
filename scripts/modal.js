export async function createModal(){
    const main = document.querySelector("main")
    const modalWrapper = document.createElement("div");
    modalWrapper.classList.add("modal-wrapper");

    const modal = document.createElement("div");
    modal.classList.add("modal");
    modalWrapper.appendChild(modal)

    const btnClose = document.createElement("button");
    btnClose.classList.add("btn-close-modal");
    btnClose.classList.add("text-btn");
    btnClose.innerText = "X";
    btnClose.addEventListener("click",()=>{
        modalWrapper.remove()
    })

    modal.appendChild(btnClose)

    main.appendChild(modalWrapper)
}

