const documentDeleteButtons = document.querySelectorAll(
  ".document-delete-modal-button"
);
const documentDownloadButtons = document.querySelectorAll(
  ".document-download-button"
);
const deleteModal = document.querySelector(".modal");

documentDeleteButtons.forEach((modal) =>
  modal.addEventListener("click", passIdToDocumentDeleteModal)
);

documentDownloadButtons.forEach((modal) =>
  modal.addEventListener("click", startDownload)
);

document
  .querySelector(".cancel-delete-document")
  .addEventListener("click", () => {
    deleteModal.querySelector("form").action = "/docs/deleteDocument/";
    deleteModal.classList.remove("modal-open");
  });

function passIdToDocumentDeleteModal(event) {
  const documentId = event.target.dataset.id;
  deleteModal.querySelector("form").action += documentId + "/?_method=DELETE";
  deleteModal.classList.add("modal-open");
}

function startDownload(event) {
  const documentId = event.target.dataset.id;
  const filename = event.target.dataset.filename;
  fetch(`docs/download/${documentId}`).then(async function (t) {
    const blob = await t.blob();
    var anchor = document.createElement("a");
    anchor.href = URL.createObjectURL(blob);
    anchor.setAttribute("download", filename);
    anchor.click();
  });
}
