const modal = document.querySelectorAll(".modal");
const btnCancel = document.querySelectorAll(".btn-cancel");
const listId = document.querySelector('#table-body').dataset.listid;

// Start Edit Item Table 
// (A) INITIALIZE - DOUBLE CLICK TO EDIT CELL
window.addEventListener("DOMContentLoaded", () => {
    for (let cell of document.querySelectorAll(".editable td")) {
      cell.ondblclick = () => { editable.edit(cell); };
    }
});
  
var editable = {
    // (B) "CONVERT" TO EDITABLE CELL
    edit : (cell) => {
        // (B1) REMOVE "DOUBLE CLICK TO EDIT"
        cell.ondblclick = "";
  
        // (B2) EDITABLE CONTENT
        cell.contentEditable = true;
        cell.focus();
  
        // (B3) "MARK" CURRENT SELECTED CELL
        cell.classList.add("edit");
        editable.selected = cell;
  
        // (B4) PRESS ENTER OR CLICK OUTSIDE TO END EDIT
        window.addEventListener("click", editable.close);
        cell.onkeydown = (evt) => { if (evt.key=="Enter") {
            editable.close(true);
            return false;
        }};
    },
  
    // (C) END "EDIT MODE"
    selected : null,  // current selected cell
    close : (evt) => { if (evt.target != editable.selected) {
        // (C1) send value to server
        let cell, column, itemId
        cell = editable.selected;
        column = cell.classList[0];
        itemId = cell.parentNode.id;
        updateCellContent();
        
        async function updateCellContent() {
            try{
                const response = await fetch (
                `./editPriceListItem/${listId}/${itemId}`, 
                    {
                        method:'put',
                        mode: "same-origin",
                        cache: 'no-cache',
                        credentials: "same-origin",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept":       "application/json"
                        },
                        redirect: 'follow',
                        referrerPolicy: 'no-referrer',
                        body: JSON.stringify({ 'cellContent': cell.textContent,
                        'column': column })
                    }
                )
                const data = await response.json();
                console.log(data);
        
            } 
            catch(error) {
                console.error(`Could not update price list: ${error}`);
            }
        }
    
            
        // (C2) REMOVE "EDITABLE"
        window.getSelection().removeAllRanges();
        editable.selected.contentEditable = false;
    
        // (C3) RESTORE CLICK LISTENERS
        window.removeEventListener("click", editable.close);
        // let cell = editable.selected;
        cell.ondblclick = () => { editable.edit(cell); };
    
        // (C4) "UNMARK" CURRENT SELECTED CELL
        editable.selected.classList.remove("edit");
        editable.selected = null;
    }}
};
  
  // Delete item buttons
//   let itemTrashCans = document.querySelectorAll('.fa-trash')
//   itemTrashCans.forEach(can => {
//     can.addEventListener('click', openDeleteItemModal);
//   })
  
  
//   function openDeleteItemModal(event) {
//       document.getElementById('deleteConfirmation').style.display='block';
//       let row = event.currentTarget.parentNode.parentNode;
//       let rowId = row.id;
//       console.log(rowId);
//       let itemDelete = document.querySelector('#btn-delete-item');
//       itemDelete.dataset['id'] = rowId;
//       itemDelete.addEventListener('click', deleteItem);
//   }
    
  async function deleteItem(event) {
      let rowId = event.currentTarget.dataset.id;
      let row = document.getElementById(rowId);
      console.log(rowId);
  
      let obj = {
          '_id': rowId
      }
  
      try{
          const response = await fetch (
          `./editPriceListItem/${listId}/${itemId}`, 
              {
                  method:'D',
                  mode: "same-origin",
                  cache: 'no-cache',
                  credentials: "same-origin",
                  headers: {
                      "Content-Type": "application/json",
                      "Accept":       "application/json"
                  },
                  redirect: 'follow',
                  referrerPolicy: 'no-referrer',
                  body: JSON.stringify(obj)
              }
          )
          data = await response.json();
          console.log(data);
  
          const responseMessageShow = document.querySelector('#responseMessageShow');
  
          if (data === 'success') {
              row.parentNode.removeChild(row);
              responseMessageShow.textContent = 'Show successfully deleted.';
              modal[1].style.display = "none";
          } else if (data === 'delete-failed') {
              responseMessageShow.textContent = 'Failed to delete show. Please try again.'
          } else {
              responseMessageShow.textContent = 'Error deleting show';
          }
      } 
      catch(error) {
          console.error(`Could not delete show: ${error}`);
      }
  }
  
  // End Edit Item Table
  
  // Modal
  
  window.addEventListener("click", windowOnClick);
  
  // Exit the modal if the background or cancel button is clicked
  function windowOnClick(event) {
    console.log('windowOnClick')
      if (event.target === modal[0] || event.target === btnCancel[0]) {
          modal[0].style.display = "none";
    //   } else if (event.target === modal[1]  || event.target === btnCancel[1]) {
    //       modal[1].style.display = "none";
      }
  }
  
  // End Modal