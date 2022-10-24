const itemDeleteButtons = document.querySelectorAll('.item-modal-button')
itemDeleteButtons.forEach(modl => modl.addEventListener('click', passIdToItemModal))
const modal = document.querySelector('.modal')
console.log(document.querySelector('#table-body'))
// const listId = document.querySelector('#table-body').dataset.listid
console.log(listId)

function passIdToItemModal(event) {
    const itemId = event.target.dataset.id
    modal.querySelector('form').action += itemId + '/?_method=DELETE'
    console.log(modal.querySelector('form').action)
    modal.classList.add('modal-open')
}

document.querySelector('.cancel-delete-item').addEventListener('click', ()=> {
    modal.querySelector('form').action = '/priceLists/deletePriceListItem/' + listId + '/' 
    modal.classList.remove('modal-open')
} )