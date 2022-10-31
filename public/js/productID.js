const manufacturers = document.querySelectorAll('input[name="manufacturer"]')
const formDivs = document.querySelectorAll('.formDiv')
const productTypeDivs = document.querySelectorAll('.productTypeDiv')
console.log(formDivs)


manufacturers.forEach(manufacturer => {
    manufacturer.addEventListener('click', showForm)
})
console.log(document.querySelector('#danfossProductType'))
document.querySelector('#danfossProductType').addEventListener('onclick', showDanfoss)
document.querySelector('#moogProductType').addEventListener('onchange', showMoog)

function showForm(e) {
    let manufacturerVal = e.target.value
    hide(formDivs)
    let id = 'container' + manufacturerVal
    console.log(id)
    let form = document.getElementById(id)
    form.hidden = !form.hidden
}

function hide(forms) {
    forms.forEach(form => {
        form.hidden = true;
    })
}

function showDanfoss() {
    console.log('danfoss')
}

function showMoog() {
    console.log('moog')
}