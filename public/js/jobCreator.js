const addCustomerBtn = document.querySelector('#addCustomer')
const addUnitBtn = document.querySelector('#addUnit')
const addCustomerModal = document.querySelector('#add-customer-modal')
const addUnitModal = document.querySelector('#add-unit-modal')

addCustomerBtn.addEventListener('click', ()=> {
    addCustomerModal.classList.add('modal-open')
})

addUnitBtn.addEventListener('click', ()=> {
    addUnitModal.classList.add('modal-open')
})

document.querySelector('.cancel-add-customer').addEventListener('click', ()=> {
    addCustomerModal.classList.remove('modal-open')
})

document.querySelector('.cancel-add-unit').addEventListener('click', ()=> {
    addUnitModal.classList.remove('modal-open')
})

document.querySelector('.clear-add-customer').addEventListener('click', ()=> {
    addCustomerModal.querySelectorAll('input').forEach((el)=>el.value = '')
    addCustomerModal.querySelector('textArea').value = ''
})

document.querySelector('.clear-add-unit').addEventListener('click', ()=> {
    addUnitModal.querySelectorAll('input').forEach((el)=>el.value = '')
    addUnitModal.querySelector('textArea').value = ''
})

document.forms["createJobUnitForm"].onsubmit = ()=>{
    const manufacturer = document.getElementById('manufacturer').value;
    const modelNumber = document.getElementById('modelNumber').value;
    const serialNumber = document.getElementById('serialNumber').value;
    const status = document.getElementById('status').value;
    const price = document.getElementById('price').value;
    const saleType = document.getElementById('saleType').value;
    const coreExchange = document.getElementById('coreExchange').value;
    const comments = document.getElementById('comments').value;
    const unitObj = { manufacturer, modelNumber, serialNumber, status, price, saleType, coreExchange, comments }
    console.log(unitObj)
    const tableBody = document.getElementById('units-table-body')
    const placeholder = document.getElementById('no-units')
    if (placeholder) {
        placeholder.remove()
    }
    const row = document.createElement('tr')
    for (const key in unitObj) {
        const td = document.createElement('td')
        td.textContent = unitObj[key]
        row.appendChild(td)
    }
    tableBody.appendChild(row)
    addUnitModal.classList.remove('modal-open')
    return false;
}