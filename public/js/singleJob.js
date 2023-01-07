const addUnitBtn = document.querySelector('#addUnit')
const cancelAddUnitBtn = document.querySelector('.cancel-add-unit')
const clearAddUnitBtn = document.querySelector('.clear-add-unit')
const addUnitModal = document.querySelector('#add-unit-modal')
const deleteUnitModal = document.querySelector('#delete-unit-modal')
const cancelDeleteUnitBtn = document.querySelector('.cancel-delete-unit')
const statusSelect = document.querySelector('#statusValue')
const statusStringInput = document.querySelector('#statusString')
const trashBtns = document.querySelectorAll('.delete-unit-button')
const unitsTableRows = document.querySelector('#units-table-body').children
const jobId = document.querySelector('#units-table-body').dataset.jobId;

addUnitBtn.addEventListener('click', ()=> {
    addUnitModal.classList.add('modal-open')
})

cancelAddUnitBtn.addEventListener('click', ()=> {
    closeAddUnitModal()
})

cancelDeleteUnitBtn.addEventListener('click', ()=> {
    deleteUnitModal.querySelector('form').action = `/jobs/deleteJobUnit/${jobId}`
    deleteUnitModal.classList.remove('modal-open')
})

clearAddUnitBtn.addEventListener('click', clearAddUnitModal)

statusSelect.addEventListener('change', updateFormHiddenStatusStringField)

trashBtns.forEach( btn => {
  btn.addEventListener('click', passIdToDeleteUnitModal)  
})

function addUnitIdsToLocalStorage() {
    const unitIdArray = []
    for (const row of unitsTableRows) {
        unitIdArray.push(row.id)
    }
    console.log(unitIdArray)
    localStorage.setItem('unitIdArray', JSON.stringify(unitIdArray))
}

function clearAddUnitModal() {
    addUnitModal.querySelectorAll('input').forEach((el)=>el.value = '')
    addUnitModal.querySelector('textArea').value = ''
}

function closeAddUnitModal() {
    addUnitModal.classList.remove('modal-open')
}

function deleteJobUnit(e) {
    const row = e.currentTarget.closest('tr')
    const id = row.id
    console.log(id)
}

function passIdToDeleteUnitModal(event) {
    const unitId = event.currentTarget.closest('tr').id
    deleteUnitModal.querySelector('form').action += unitId + '/?_method=DELETE'
    console.log(deleteUnitModal.querySelector('form').action)
    deleteUnitModal.classList.add('modal-open')
}

function updateFormHiddenStatusStringField(e) {
    statusStringInput.value = e.currentTarget.options[e.currentTarget.selectedIndex].textContent
}