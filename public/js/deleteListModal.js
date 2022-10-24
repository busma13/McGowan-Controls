const listDeleteButtons = document.querySelectorAll('.list-modal-button')
listDeleteButtons.forEach(modal => modal.addEventListener('click', passIdToListModal))
const modal = document.querySelector('.modal')

function passIdToListModal(event) {
    const listId = event.target.dataset.id
    modal.querySelector('form').action += listId + '/?_method=DELETE'
    console.log(modal.querySelector('form').action)
    modal.classList.add('modal-open')
}

document.querySelector('.cancel-delete-list').addEventListener('click', ()=> {
    modal.querySelector('form').action = '/priceLists/deletePriceList/' 
    modal.classList.remove('modal-open')
} )

