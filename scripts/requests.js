import { getLocalStorageToken } from "./localStorage.js";
import { toastCreate } from "./toast.js";

const baseUrl = "http://localhost:6278/"

export async function getAllDepartments(){
    const data = await fetch(`${baseUrl}sectors`);
    const dataJson = await data.json();

    
    return dataJson;
}
export async function getAllSectors(){
    const token =await getLocalStorageToken()
    const data = await fetch(`${baseUrl}departments`,{
        method: "GET",
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.token}`
        }
    });
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
        await toastCreate("ok",data.statusText)
        const isAdmin = await verifyUser();
       
        if(isAdmin.is_admin == true){
            setTimeout(()=>{
                window.location.replace("../adminDash/index.html")
            },3000)
        }else{
            setTimeout(()=>{
                window.location.replace("../dashboard/index.html")
            },3000)
            const token = await getLocalStorageToken()
        
            const dataUser = await getUserLogged(token.token);
           
            localStorage.setItem("dataUser",JSON.stringify(dataUser));
            
        }
        
        return dataJson;
    }else{
        await toastCreate("error",data.statusText)
        
        
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
         toastCreate("ok",data.statusText)
        
        setTimeout(()=>{
            window.location.replace("../login/index.html")
        },3000)
        return dataJson;    
    }
    else{
        toastCreate("error",data.statusText)
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

export async function fireEmployee(id){
    const token = await getLocalStorageToken();
    const data = await fetch(`${baseUrl}departments/dismiss/${id}`,{
        method: "PATCH",
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.token}`
        }
    });
    const dataJson = await data.json();

  
    return dataJson
}

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
    return data;
}

export async function editDepartment(id,description){
    const token = await getLocalStorageToken();
    const data = await fetch(`${baseUrl}departments/${id}`,{
        method: "PATCH",
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.token}`
        },
        body: JSON.stringify(description)
    });
    const dataJson = await data.json()

    
    return dataJson
}
export async function editUserInfo(id,info){
    const token = await getLocalStorageToken()
    const data = await fetch(`${baseUrl}admin/update_user/${id}`,{
        method: "PATCH",
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.token}`
        },
        body: JSON.stringify(info)
    });
    const dataJson = await data.json()

    console.log(dataJson)
    return dataJson
}

export async function deleteUser(id){
    const token = await getLocalStorageToken()
    const data = await fetch(`${baseUrl}admin/delete_user/${id}`,{
        method: "DELETE",
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.token}`
        }
    });
    return data
}
export async function getAllNotWorks(){
    const token = await getLocalStorageToken();
    const data = await fetch(`${baseUrl}admin/out_of_work`,{
        method: "GET",
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.token}`
        }
    });
    const dataJson = await data.json()

    
    return dataJson
}
export async function updateUser(user){
    const token = await getLocalStorageToken();
    const data = await fetch(`${baseUrl}users`,{
        method: "PATCH",
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.token}`
        },
        body: JSON.stringify(user)
    });
   
    if(data.ok){
        
    const dataJson = await data.json();

    
    return dataJson
    }else{
        
        console.log(data.statusText)
        
    }
}
export async function getDepLocalUser(){
    const token = await getLocalStorageToken()
    const data = await fetch(`${baseUrl}users/departments`,{
        method: "GET",
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.token}`
        }
    });
    const dataJson = await data.json()

    
    return dataJson
}