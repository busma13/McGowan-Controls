const addCustomerBtn = document.querySelector('#addCustomer')
const cancelAddCustomerBtn = document.querySelector('.cancel-add-customer')
const clearAddCustomerBtn = document.querySelector('.clear-add-customer')
const addUnitBtn = document.querySelector('#addUnit')
const cancelAddUnitBtn = document.querySelector('.cancel-add-unit')
const clearAddUnitBtn = document.querySelector('.clear-add-unit')
const addCustomerModal = document.querySelector('#add-customer-modal')
const addUnitModal = document.querySelector('#add-unit-modal')
const customerSelect = document.querySelector('#customer')
const companyFormInput = document.querySelector('#company')
const unitsFormInput = document.querySelector('#units')
const quantityFormInput = document.querySelector('#quantity')
const validationMessage = document.querySelector('#validationMessage')
const incomingDateInput = document.querySelector('#incomingDate')
const container = document.querySelector('.container')
const createCustomerForm = document.forms["createCustomerForm"]
const userInputElements = createCustomerForm.querySelectorAll('input, textarea')

populateUnitsTableIfInLocalStorage()

addCustomerBtn.addEventListener('click', openAddCustomerModal)
addUnitBtn.addEventListener('click', openAddUnitModal)
cancelAddCustomerBtn.addEventListener('click', closeAddCustomerModal)
cancelAddUnitBtn.addEventListener('click', closeAddUnitModal)
clearAddCustomerBtn.addEventListener('click', clearAddCustomerModal)
clearAddUnitBtn.addEventListener('click', clearAddUnitModal)
customerSelect.addEventListener('change', updateFormHiddenCustomerField)

function clearAddUnitModal() {
    addUnitModal.querySelectorAll('input').forEach((el)=>el.value = '')
    addUnitModal.querySelector('textArea').value = ''
}

function clearAddCustomerModal() {
    addCustomerModal.querySelectorAll('input').forEach((el)=>el.value = '')
    addCustomerModal.querySelector('textArea').value = ''
}

function closeAddCustomerModal() {
    addCustomerModal.classList.remove('modal-open')
    container.classList.remove('blur-sm')
}

function closeAddUnitModal() {
    addUnitModal.classList.remove('modal-open')
    container.classList.remove('blur-sm')
}

function openAddCustomerModal() {
    addCustomerModal.classList.add('modal-open')
    container.classList.add('blur-sm')
}

function openAddUnitModal() {
    addUnitModal.classList.add('modal-open')
    container.classList.add('blur-sm')
}

function populateUnitsTableIfInLocalStorage() {
    if (localStorage.getItem('unitsList') === null) {
        localStorage.setItem('unitsList', JSON.stringify([]))
    } else {
        const unitsList = JSON.parse(localStorage.getItem('unitsList'))
        for (const unit of unitsList) {
            console.log(unit)
            addCreatedUnitToUnitsList(unit)
            updateFormHiddenQuantityField(1)
        }
        updateFormHiddenUnitField()
    }
}

function updateFormHiddenCustomerField(e) {
    companyFormInput.value = e.currentTarget.options[e.currentTarget.selectedIndex].dataset.id
}

function validateCreateJobForm() {
    if (companyFormInput.value === '') {
        validationMessage.textContent = 'Please select a customer.'
        validationMessage.scrollIntoView()
        return false
    }
    if (quantityFormInput.value < 1) {
        validationMessage.textContent = 'Job must have at least 1 unit.'
        validationMessage.scrollIntoView()
        return false
    }
    localStorage.clear()
}

createCustomerForm.onsubmit = async (e)=>{
    e.preventDefault()
    const userInput = Array.from(userInputElements).map(el => el.value)
    const response = await fetch(
        "/jobs/createCustomer", 
        {
            method:'POST',
            mode: "same-origin",
            cache: 'no-cache',
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "Accept":       "application/json"
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({
                companyName: userInput[0],
                shippingAddress: userInput[1],
                billingAddress: userInput[2],
                contact: userInput[3],
                tel: userInput[4],
                fax: userInput[5],
                comments: userInput[6],
            })
        }
    )
    customerObj = await response.json();
    console.log(customerObj)
    setSelectToNewlyAddedCustomer(customerObj)
    clearAddCustomerModal()
    closeAddCustomerModal()
}

document.forms["createJobUnitForm"].onsubmit = ()=>{
    const unitObj = createJobUnitObject()
    addCreatedUnitToLocalStorageUnitsList(unitObj)
    addCreatedUnitToUnitsList(unitObj)
    updateFormHiddenUnitField()
    updateFormHiddenQuantityField(1)
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
    const shipped = document.getElementById('shipped').value;
    const comments = document.getElementById('unitComments').value;
    const unitObj = { manufacturer, modelNumber, serialNumber, statusValue, statusString, price, saleType, coreExchange, shipped, comments }
    return unitObj
}

function addCreatedUnitToLocalStorageUnitsList(unitObj) {
    if (localStorage.getItem('unitsList') === null) {
        localStorage.setItem('unitsList', JSON.stringify([unitObj]))
    } else {
        const unitsList = JSON.parse(localStorage.getItem('unitsList'))
        unitsList.push(unitObj)
        localStorage.setItem('unitsList', JSON.stringify(unitsList))
    }
}

function addCreatedUnitToUnitsList(unitObj) {
    const tableBody = document.getElementById('units-table-body')
    const placeholder = document.getElementById('no-units')
    if (placeholder) {
        placeholder.remove()
    }
    const row = document.createElement('tr')
    const trashcanTd = document.createElement('td')
    trashcanTd.classList.add('px-2', 'py-2')
    trashcanTd.innerHTML = '<button class="btn modal-button delete-unit-button fa fa-trash mx-2"></button>'
    const trashBtn = trashcanTd.children[0]
    trashBtn.addEventListener('click', deleteJobUnit) 
    row.appendChild(trashcanTd)
    for (const key in unitObj) {
        if (key === 'statusValue') continue
        const td = document.createElement('td')
        td.classList.add('px-2', 'py-2')
        td.textContent = unitObj[key]
        row.appendChild(td)
    }
    tableBody.appendChild(row)
}

function deleteJobUnit(e) {
    const row = e.currentTarget.closest('tr')
    let unitsList = JSON.parse(localStorage.getItem('unitsList'))
    unitsList.splice(row.rowIndex - 2, 1)
    localStorage.setItem('unitsList', JSON.stringify(unitsList))
    row.remove()
    updateFormHiddenUnitField()
    updateFormHiddenQuantityField(-1)
}

function setSelectToNewlyAddedCustomer(customerObj) {
    console.log(customerObj)
    const customerOption = document.createElement('option')
    customerOption.value = customerObj.companyName
    customerOption.textContent = customerObj.companyName
    customerOption.dataset.id = customerObj._id
    customerSelect.appendChild(customerOption)
    customerSelect.value = customerObj.companyName
}

function updateFormHiddenQuantityField(num) {
    quantityFormInput.value = (Number(quantityFormInput.value) + num).toString()
}

function updateFormHiddenUnitField() {
    unitsFormInput.value = localStorage.getItem('unitsList')
}