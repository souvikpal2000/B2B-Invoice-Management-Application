const rows = document.querySelectorAll("tbody tr");
const deleteBtn = document.querySelector(".delete");
const editBtn = document.querySelector(".edit");
let selectCount = 0;
rows.forEach((row) => {
    row.addEventListener("click", () => {
        const tds = row.querySelectorAll("td");
        const checkBox = tds[0].querySelector("input");
        if (checkBox.checked) {
            checkBox.checked = false;
            row.classList.remove("trCheck");
            --selectCount;
            if (selectCount == 0){
                deleteBtn.disabled = true;
                deleteBtn.classList.add("disable");
				editBtn.disabled = true;
                editBtn.classList.add("disable");
            }
            if(selectCount == 1){
                editBtn.disabled = false;
                editBtn.classList.remove("disable");
            }
			return;
        }
        checkBox.checked = true;
        row.classList.add("trCheck");
    
        ++selectCount;
        deleteBtn.disabled = false;
        deleteBtn.classList.remove("disable");
		if(selectCount > 1){
            editBtn.disabled = true;
            editBtn.classList.add("disable");
            return;
	    }
        editBtn.disabled = false;
        editBtn.classList.remove("disable");
    });
});

//Delete Modal
var modal = document.getElementById("myModal");
var btn = document.querySelector(".delete");
var span = document.getElementsByClassName("close")[0];
var dlt = document.querySelector(".cancel");
btn.onclick = function() {
  	modal.style.display = "block";
}
dlt.onclick = function(){
    modal.style.display = "none";
}
span.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}

//Edit Modal
var editModal = document.querySelector(".editModal");
var saveBtn = document.querySelector(".edit");
var span01 = document.getElementsByClassName("close")[1];
var cancelBtn = document.querySelector(".cancelModal");
saveBtn.onclick = function() {
	editModal.style.display = "block";
}
cancelBtn.onclick = function(){
  	editModal.style.display = "none";
}
span01.onclick = function() {
  	editModal.style.display = "none";
}
window.onclick = function(event) {
  	if (event.target == editModal) {
	  	editModal.style.display = "none";
  	}
}

//Remove Cross Icon in Search Bar
function hideSearch(){
    document.querySelector(".searchIcon").classList.add("hideSearch");
}

//Add Modal
var addModal = document.querySelector(".addModal");
var add = document.querySelector(".add");
var span02 = document.getElementsByClassName("close")[2];
var cancelAddBtn = document.querySelector(".cancelAddModal");
var clear = document.querySelector(".clear")
add.onclick = function() {
	addModal.style.display = "block";
}
cancelAddBtn.onclick = function(){
    document.querySelector(".addForm").reset();
    addModal.style.display = "none";
}
span02.onclick = function() {
    document.querySelector(".addForm").reset();
    addModal.style.display = "none";
}
clear.onclick = function() {
    document.querySelector(".addForm").reset();
}
window.onclick = function(event) {
  	if (event.target == addModal) {
        addModal.style.display = "none";
  	}
}
