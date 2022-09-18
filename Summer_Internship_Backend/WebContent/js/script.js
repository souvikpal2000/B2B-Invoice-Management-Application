sessionStorage.removeItem('id'); 
const deleteBtn = document.querySelector(".delete");
const editBtn = document.querySelector(".edit");
const addBtn = document.querySelector(".add");
let selectCount = 0;

let id;
function rowSelect(row){
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
			addBtn.disabled = false;
            addBtn.classList.remove("disable");
        }
        if(selectCount == 1){
        	id = document.querySelector(".trCheck").className.split(' ')[0];
        	//document.cookie = 'edit='+id.substring(2);
        	sessionStorage.setItem("id", `${id.substring(2)}`);
        	document.querySelector('.editForm').action = "./edit?id="+id.substring(2);
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
	id = row.className.split(' ')[0];
	//document.cookie = 'edit='+id.substring(2);
	sessionStorage.setItem("id", `${id.substring(2)}`);
	document.querySelector('.editForm').action = "./edit?id="+id.substring(2);
	console.log(document.querySelectorAll('.trCheck'));
    editBtn.disabled = false;
    editBtn.classList.remove("disable");
	addBtn.disabled = true;
    addBtn.classList.add("disable");
}

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
var resetBtn = document.querySelector(".reset");
saveBtn.onclick = function() {
	editModal.style.display = "block";
	document.querySelector('.invoiceAmt').value = document.querySelector("."+id+" "+".invoiceAmountValue").innerHTML;
	document.querySelector('.notesAmt').innerHTML = document.querySelector("."+id+" "+".noteValue").innerHTML;
}
resetBtn.onclick = function(){
	document.querySelector('.invoiceAmt').value = document.querySelector("."+id+" "+".invoiceAmountValue").innerHTML;
	document.querySelector('.notesAmt').value = document.querySelector("."+id+" "+".noteValue").innerHTML;
}
cancelBtn.onclick = function(){
	document.querySelector(".editForm").reset();
  	editModal.style.display = "none";
}
span01.onclick = function() {
	document.querySelector(".editForm").reset();
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

//Pagination
document.cookie = "offset=0";
document.querySelector(".rightArrow").onclick = function(){
	num = parseInt(document.cookie.substring(7)) + 7;
	document.cookie = `offset=${num.toString()}`;
	$('#thisdiv').load(document.URL + ' #thisdiv>*');
	rows = document.querySelectorAll("tbody tr");
}

document.querySelector(".leftArrow").onclick = function(){
	if(parseInt(document.cookie.substring(7)) == 0){
		return;
	}
	num = parseInt(document.cookie.substring(7)) - 7;
	document.cookie = `offset=${num.toString()}`;
	$('#thisdiv').load(document.URL + ' #thisdiv>*');
	rows = document.querySelectorAll("tbody tr");
}