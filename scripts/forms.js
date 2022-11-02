

export async function createForm(){
    
    const modal =  document.querySelector(".modal");
    modal.insertAdjacentHTML("afterbegin",`
    <h2 class="modal-title">Criar departamento</h2>
    <form>
        <input required id="name" type="text" placeholder="Nome do departamento">
        <input required  id="description" type="text" placeholder="Descrição do departamento">
        <select name="company_uuid" id="">
            <option value="">Selecionar empresa</option>
        </select>
        <button type="submit" class="btn-form text-btn">Criar o departamento</button>
    </form>
    `)
}