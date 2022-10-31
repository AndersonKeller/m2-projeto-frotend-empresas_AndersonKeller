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