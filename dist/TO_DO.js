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

let title = titleInput.value;
const description = descriptionInput.value;
const info = infoInput.value;
const status = statusInput.value;
const endDate = end_dateInput.value;

// Example: You can now use these values to create a task object or append them to your task list
const task = {
    description,
    status,
    endDate,
    title,
    info,
    id: Math.floor(Math.random() * 100) + 1
};