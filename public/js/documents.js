const documentDeleteButtons = document.querySelectorAll(
  ".document-delete-modal-button"
);
console.log(documentDeleteButtons);
documentDeleteButtons.forEach((modal) =>
  modal.addEventListener("click", passIdToDocumenttModal)
);
const modal = document.querySelector(".modal");

function passIdToDocumenttModal(event) {
  const documentId = event.target.dataset.id;
  modal.querySelector("form").action += documentId + "/?_method=DELETE";
  modal.classList.add("modal-open");
}

document
  .querySelector(".cancel-delete-document")
  .addEventListener("click", () => {
    modal.querySelector("form").action = "/docs/deleteDocument/";
    modal.classList.remove("modal-open");
  });
