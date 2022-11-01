export async function getLocalStorageToken(){
    const userToken = await  JSON.parse(localStorage.getItem("userToken"));

   
    return userToken
}
export async function getLocalStorageUserData(){
    const userData = await JSON.parse(localStorage.getItem("dataUser"));

    return userData;
}