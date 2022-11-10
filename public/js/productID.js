const manufacturers = document.querySelectorAll('input[name="manufacturer"]')
const manufacturerDivs = document.querySelectorAll('.manufacturerDiv')
const productTypeSelects = document.querySelectorAll('.productTypeSelect')
const productTypeDivs = document.querySelectorAll('.productTypeDiv')
const modelTypePCPSelect = document.querySelector('#modelTypePCP')
const pilotDivs = document.querySelectorAll('.pilotDiv')
const resultProductsList = document.querySelector('#resultProductsList')

let currentPath = []
// console.log(productTypeSelects)


manufacturers.forEach(manufacturer => {
    manufacturer.addEventListener('click', showManufacturer)
})

productTypeSelects.forEach(select => {
    select.onchange = switchProductType
});

modelTypePCPSelect.onchange = switchModelTypePCP

function showManufacturer(e) {
    let manufacturerVal = e.target.value
    hide(manufacturerDivs)
    let id = 'container' + manufacturerVal
    console.log(id)
    let form = document.getElementById(id)
    form.hidden = !form.hidden
    currentPath = [id]
    console.log(currentPath)
}

function switchProductType(e) {
    console.log(e.target.value)
    hide(productTypeDivs)
    let id = 'container' + e.target.value
    let prodContainer = document.getElementById(id)
    prodContainer.hidden = !prodContainer.hidden
    currentPath = currentPath.slice(0, 1)
    currentPath.push(e.target.value)
    console.log(currentPath)
}

function switchModelTypePCP(e) {
    hide(pilotDivs)
    let id = 'container' + e.target.value
    let pilotContainer = document.getElementById(id)
    pilotContainer.hidden = !pilotContainer.hidden
    currentPath = currentPath.slice(0, 2)
    currentPath.push(e.target.value)
    console.log(currentPath)
}

function hide(elements) {
    elements.forEach(element => {
        element.hidden = true;
    })
}

document.querySelector('#button110').addEventListener('click', searchForProducts)
document.querySelector('#button116').addEventListener('click', searchForProducts)

async function searchForProducts(e) {
    const parentContainer = e.target.parentNode
    let modelPrefix = parentContainer.id.slice(-3)
    const selectCollection = parentContainer.querySelectorAll('select')
    const selectArray = Array.from(selectCollection)
    const selectValues = selectArray.map(select => select.value)
    console.log(selectValues)

    const response = await fetch(`/productID/pilot?modelPrefixPCP=${modelPrefix}&selectValues=${selectValues}`)
    const searchResults = await response.json()
    console.log(searchResults)
    while (resultProductsList.firstChild) {
        resultProductsList.removeChild(resultProductsList.firstChild)
    }
    if (searchResults.length === 0) {
        const li = document.createElement('li')
        li.textContent = 'No products match those criteria.'
        resultProductsList.appendChild(li)
    }
    searchResults.forEach(product => {
        console.log(product.modelNumber)
        const li = document.createElement('li')
        li.textContent = product.modelNumber
        resultProductsList.appendChild(li)
    })

    document.querySelector('#resultProductsDiv').scrollIntoView();
}