export async function getLocalStorageToken(){
    const userToken =  JSON.parse(localStorage.getItem("userToken"));

    
    return userToken
}