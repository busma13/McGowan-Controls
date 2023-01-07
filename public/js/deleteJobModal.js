const jobDeleteButtons = document.querySelectorAll('.job-modal-button')
jobDeleteButtons.forEach(modal => modal.addEventListener('click', passIdToJobModal))
const modal = document.querySelector('.modal')

function passIdToJobModal(event) {
    event.stopPropagation()
    const jobId = event.target.dataset.id
    modal.querySelector('form').action += jobId + '/?_method=DELETE'
    modal.classList.add('modal-open')
}

document.querySelector('.cancel-delete-job').addEventListener('click', ()=> {
    modal.querySelector('form').action = '/jobs/deleteJob/' 
    modal.classList.remove('modal-open')
} )

