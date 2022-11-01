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
    const dataJson = await data.json();

    
    return dataJson;
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
         console.log(dataJson);
        
        setTimeout(()=>{
            window.location.replace("../login/index.html")
        },2000)
        return dataJson;    
    }
    else{
        console.log(data.statusText)
    }
    
    
}