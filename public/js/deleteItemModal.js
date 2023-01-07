const itemDeleteButtons = document.querySelectorAll('.item-modal-button')
itemDeleteButtons.forEach(modl => modl.addEventListener('click', passIdToItemModal))
const modal = document.querySelector('.modal')

function passIdToItemModal(event) {
    const itemId = event.target.dataset.id
    modal.querySelector('form').action += itemId + '/?_method=DELETE'
    modal.classList.add('modal-open')
}

document.querySelector('.cancel-delete-item').addEventListener('click', ()=> {
    modal.querySelector('form').action = '/priceLists/deletePriceListItem/' + listId + '/' 
    modal.classList.remove('modal-open')
} )