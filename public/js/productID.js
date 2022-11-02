const manufacturers = document.querySelectorAll('input[name="manufacturer"]')
const formDivs = document.querySelectorAll('.formDiv')
const productTypeSelects = document.querySelectorAll('.productTypeSelect')
const productTypeDivs = document.querySelectorAll('.productTypeDiv')
// console.log(productTypeSelects)


manufacturers.forEach(manufacturer => {
    manufacturer.addEventListener('click', showForm)
})

productTypeSelects.forEach(select => {
    select.onchange = switchProductType
});

function showForm(e) {
    let manufacturerVal = e.target.value
    hide(formDivs)
    let id = 'container' + manufacturerVal
    console.log(id)
    let form = document.getElementById(id)
    form.hidden = !form.hidden
}

function hide(elements) {
    elements.forEach(element => {
        element.hidden = true;
    })
}

function switchProductType(e) {
    console.log(e.target.value)
    hide(productTypeDivs)
    let id = 'container' + e.target.value
    let prodContainer = document.getElementById(id)
    prodContainer.hidden = !prodContainer.hidden
}