let titleInput = document.getElementById('title')
let descriptionInput = document.getElementById('description');
let infoInput = document.getElementById('info');
let statusInput = document.getElementById('status');
let st_dateInput = document.getElementById('st_date');
let end_dateInput = document.getElementById('end_date');
let popup = document.getElementById('popup');
let todo = document.getElementById('todo');
let doing = document.getElementById('Doing');
let done = document.getElementById('Done');

document.addEventListener("DOMContentLoaded", function (event) {
    displayTickets();
});

function togglePopup() {
    popup.classList.toggle('hidden');
}
function addTask() {
    rigex();
    let title = titleInput.value;
    const description = descriptionInput.value;
    const info = infoInput.value;
    const status = statusInput.value;
    const endDate = end_dateInput.value;

    const task = {
        description,
        status,
        endDate,
        title,
        info,
        id: Math.floor(Math.random() * 100) + 1
    };
    const data = localStorage.getItem("storeTicket");
    let ticketsArray = [];
    if (data) {
        ticketsArray = JSON.parse(data);
    }
    ticketsArray.push(task);
    localStorage.setItem("storeTicket", JSON.stringify(ticketsArray));
    clearInputFields();
    popup.classList.add("hidden");
    location.reload();
}

function rigex() {
    const titlePattern = /^[a-zA-Z\s]{3,30}$/;
    const descPattern = /^[a-zA-Z0-9\s.,-]{10,100}$/;

    if (!titlePattern.test(titleInput.value)) {
        showAlert(
            "Le titre doit être entre 3 et 30 caractères, seulement des lettres."
        );
        return false;
    }

    if (!descPattern.test(descriptionInput.value)) {
        showAlert(
            "La description doit être entre 10 et 100 caractères, avec seulement des lettres, chiffres, et ponctuations."
        );
        return false;
    }

    const currentDate = new Date();
    const endDate = new Date(end_dateInput.value);

    if (currentDate >= endDate || end_dateInput.value === '') {
        showAlert(
            "La date de fin doit être dans le futur par rapport à la date actuelle."
        );
        return false;
    }

    return true;
}
function clearInputFields() {
    titleInput.value = "";
    descriptionInput.value = "";
    infoInput.value = "";
    statusInput.value = "";
    end_dateInput.value = "";
  }
  function removeTask(button, id) {
    const taskElement = button.closest(".task"); 
    taskElement.classList.add("fade-out"); 

   
    setTimeout(() => {
        const data = localStorage.getItem("storeTicket");
        let arrayData = [];
        if (data) {
            arrayData = JSON.parse(data);
        }

        arrayData = arrayData.filter((item) => item.id !== id);
        localStorage.setItem("storeTicket", JSON.stringify(arrayData));
        taskElement.remove();
        location.reload(); 
    }, 500); 
}
