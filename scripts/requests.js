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
     console.log(user)
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