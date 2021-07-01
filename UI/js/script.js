const rows = document.querySelectorAll("tbody tr");
const deleteBtn = document.querySelector(".delete");
let selectCount = 0;
deleteBtn.classList.add("disable");
deleteBtn.disabled = true;
rows.forEach((row) => {
    row.addEventListener("click", () => {
        const tds = row.querySelectorAll("td");
        const checkBox = tds[0].querySelector("input");
    
        if (checkBox.checked) {
            checkBox.checked = false;
            row.classList.remove("trCheck");
            selectCount--;
            if (selectCount == 0){
                deleteBtn.disabled = true;
                deleteBtn.classList.add("disable");
            }
            return;
        }
        checkBox.checked = true;
        row.classList.add("trCheck");
    
        selectCount++;
        deleteBtn.disabled = false;
        deleteBtn.classList.remove("disable");
    });
});
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.querySelector(".delete");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var dlt = document.querySelector(".cancel");

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
dlt.onclick = function(){
    modal.style.display = "none";
}
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}