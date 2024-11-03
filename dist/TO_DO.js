let titleInput = document.getElementById('title')
let descriptionInput = document.getElementById('description');
let infoInput = document.getElementById('info');
let statusInput = document.getElementById('status');
let st_dateInput = document.getElementById('st_date');
let end_dateInput = document.getElementById('end_date');
let popup = document.getElementById('popup');
let todo= document.getElementById('todo');
let doing = document.getElementById('Doing');
let done = document.getElementById('Done');

document.addEventListener("DOMContentLoaded", function (event) {
    displayTickets();
});

function togglePopup() {
    popup.classList.toggle('hidden');
}