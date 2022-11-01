import { getLocalStorageToken } from "../../scripts/localStorage.js";
import { verifyAdmin } from "../../scripts/requests.js";

function logout(){
    const btnLogout = document.querySelector("#btn-logout")
    btnLogout.addEventListener("click",()=>{
        localStorage.removeItem("userToken")
    })
}
logout()



