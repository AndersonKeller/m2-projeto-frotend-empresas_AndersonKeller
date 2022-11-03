import { getLocalStorageToken } from "./localStorage.js";

const baseUrl = "http://localhost:6278/"

export async function getAllDepartments(){
    const data = await fetch(`${baseUrl}sectors`);
    const dataJson = await data.json();

    
    return dataJson;
}

export async function getAllCompany(){
    const data = await fetch(`${baseUrl}companies`);
    const dataJson = await data.json();

    return dataJson
}
export async function getCompanyBySector(sector){
    const data = await fetch(`${baseUrl}companies/${sector}`);
    const dataJson = await data.json()

    return dataJson;
}
export async function loginApi(user){
     
    const data = await fetch(`${baseUrl}auth/login`,
        {
            method: "POST",
            headers:{
                'Content-Type': 'application/json',
            },
            
            body: JSON.stringify(user)
        }
    )
    if(data.ok){
        const dataJson = await data.json();
        localStorage.setItem("userToken",JSON.stringify(dataJson))
    
        const isAdmin = await verifyUser();
        
        if(isAdmin.is_admin == true){
            setTimeout(()=>{
                window.location.replace("../adminDash/index.html")
            },2000)
        }else{
            setTimeout(()=>{
                window.location.replace("../dashboard/index.html")
            },2000)
            const token = await getLocalStorageToken()
        
            const dataUser = await getUserLogged(token.token);
           
            localStorage.setItem("dataUser",JSON.stringify(dataUser));
            
        }
        return dataJson;
    }else{
        console.log(data.statusText)
    }
}
export async function registerUser(user){
    const data = await fetch(`${baseUrl}auth/register`,{
        method: "POST",
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });
    if(data.ok){
        const dataJson = await data.json();
         
        
        setTimeout(()=>{
            window.location.replace("../login/index.html")
        },2000)
        return dataJson;    
    }
    else{
        console.log(data.statusText)
    } 
}

export async function verifyAdmin(userToken){
    
    const data = await fetch(`${baseUrl}auth/validate_user`,{
        method: "GET",
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`
        }
    });
    const dataJson = await data.json();

    

    return dataJson
}
export async function verifyUser(){
    const user = await getLocalStorageToken()
   
    const resp = await verifyAdmin(user.token);
   
    return resp;
}
export async function getSectorsByCompany(companyId){
    
    const userToken = await getLocalStorageToken();
    const data = await fetch(`${baseUrl}departments/${companyId}`,{
        method: "GET",
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken.token}`
        }
    }) ;
    
    const dataJson = await data.json();
  

    return dataJson;

}

export async function getUserLogged(token){
   
    const data = await fetch(`${baseUrl}users/profile`,{
        method: "GET",
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
    const dataJson = await data.json();
    

    return dataJson;
}
// const user ={
    
//         user_uuid: "cbafb1ca-9cdc-49e3-8eac-f57fee43f6db",
//         department_uuid: "fc98f190-358d-43d7-91cc-dbab8600586d"
      
// }

export async function hireEmployee(user){
    const token = await getLocalStorageToken();
    const data = await fetch(`${baseUrl}departments/hire/`,{
        method: "PATCH",
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.token}`
        },
        body: JSON.stringify(user)
    })
    const dataJson = await data.json()

    
    return dataJson
}
//hireEmployee(user)

export async function getCoworkers(){
    const tokenUser = await getLocalStorageToken()
    const data = await fetch(`${baseUrl}users/departments/coworkers`,{
        method: "GET",
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokenUser.token}`
        }
    });
    const dataJson = await data.json()

    
    return dataJson
}

export async function getAllUsers(){

    const token = await getLocalStorageToken()
    const data = await fetch(`${baseUrl}users`,{
        method: "GET",
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.token}`
        }
    });
    const dataJson = await data.json()

    
    return dataJson

}

export async function createDepartment(newDepartment){
    const token = await getLocalStorageToken()
    const data = await fetch(`${baseUrl}departments`,{
        method: "POST",
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.token}`
        },
        body: JSON.stringify(newDepartment)
    });
    const dataJson = await data.json()

    
    return dataJson

}

export async function deleteDepartment(id){
    const token = await getLocalStorageToken()
    const data = await fetch(`${baseUrl}departments/${id}`,{
        method: "DELETE",
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.token}`
        }
    });
    

    
    return data
    
}