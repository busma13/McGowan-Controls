const addUnitBtn = document.querySelector('#addUnit')
const cancelAddUnitBtn = document.querySelector('.cancel-add-unit')
const clearAddUnitBtn = document.querySelector('.clear-add-unit')
const addUnitModal = document.querySelector('#add-unit-modal')
const statusSelect = document.querySelector('#statusValue')
const statusStringInput = document.querySelector('#statusString')
const unitsTableRows = document.querySelector('#units-table-body').children

addUnitBtn.addEventListener('click', ()=> {
    addUnitModal.classList.add('modal-open')
})

cancelAddUnitBtn.addEventListener('click', ()=> {
    closeAddUnitModal()
})

clearAddUnitBtn.addEventListener('click', clearAddUnitModal)

statusSelect.addEventListener('change', updateFormHiddenStatusStringField)


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
//     let unitsList = JSON.parse(localStorage.getItem('unitsList'))
//     unitsList.splice(row.rowIndex - 2, 1)
//     localStorage.setItem('unitsList', JSON.stringify(unitsList))
    row.remove()
//     updateFormHiddenUnitField()
//     updateFormHiddenQuantityField(-1)
}

function updateFormHiddenStatusStringField(e) {
    statusStringInput.value = e.currentTarget.options[e.currentTarget.selectedIndex].textContent
}