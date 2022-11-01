export async function getLocalStorageToken(){
    const userToken = await  JSON.parse(localStorage.getItem("userToken"));

   
    return userToken
}