const addUnitBtn = document.querySelector('#addUnit')
const cancelAddUnitBtn = document.querySelector('.cancel-add-unit')
const clearAddUnitBtn = document.querySelector('.clear-add-unit')
const addUnitModal = document.querySelector('#add-unit-modal')

addUnitBtn.addEventListener('click', ()=> {
    addUnitModal.classList.add('modal-open')
})

cancelAddUnitBtn.addEventListener('click', ()=> {
    closeAddUnitModal()
})

clearAddUnitBtn.addEventListener('click', clearAddUnitModal)

function clearAddUnitModal() {
    addUnitModal.querySelectorAll('input').forEach((el)=>el.value = '')
    addUnitModal.querySelector('textArea').value = ''
}

function closeAddUnitModal() {
    addUnitModal.classList.remove('modal-open')
}


document.forms["createJobUnitForm"].onsubmit = ()=>{
    const unitObj = createJobUnitObject()
    addCreatedUnitToDatabase(unitObj)
    addCreatedUnitToUnitsList(unitObj)
    // updateFormHiddenUnitField()
    // updateFormHiddenQuantityField(1)
    closeAddUnitModal()
    clearAddUnitModal()
    return false;
}

function createJobUnitObject() {
    const manufacturer = document.getElementById('manufacturer').value;
    const modelNumber = document.getElementById('modelNumber').value;
    const serialNumber = document.getElementById('serialNumber').value;
    const status = document.getElementById('status')
    const statusValue = status.value;
    const statusString = status.options[status.selectedIndex].textContent;
    const price = document.getElementById('price').value;
    const saleType = document.getElementById('saleType').value;
    const coreExchange = document.getElementById('coreExchange').value;
    const comments = document.getElementById('unitComments').value;
    const unitObj = { manufacturer, modelNumber, serialNumber, statusValue, statusString, price, saleType, coreExchange, comments }
    // console.log(unitObj)
    return unitObj
}

function addCreatedUnitToDatabase(unitObj) {
    // Add unit to units db
    // Add unit to jobs.units
}

function addCreatedUnitToUnitsList(unitObj) {
    const tableBody = document.getElementById('units-table-body')
    const row = document.createElement('tr')
    const trashcanTd = document.createElement('td')
    trashcanTd.innerHTML = '<button class="btn modal-button delete-unit-button fa fa-trash mx-2"></button>'
    const trashBtn = trashcanTd.children[0]
    trashBtn.addEventListener('click', deleteJobUnit) 
    row.appendChild(trashcanTd)
    for (const key in unitObj) {
        if (key === 'statusValue') continue
        const td = document.createElement('td')
        td.textContent = unitObj[key]
        row.appendChild(td)
    }
    tableBody.appendChild(row)
}

// function deleteJobUnit(e) {
//     const row = e.currentTarget.closest('tr')
//     let unitsList = JSON.parse(localStorage.getItem('unitsList'))
//     unitsList.splice(row.rowIndex - 2, 1)
//     localStorage.setItem('unitsList', JSON.stringify(unitsList))
//     row.remove()
//     updateFormHiddenUnitField()
//     updateFormHiddenQuantityField(-1)
// }