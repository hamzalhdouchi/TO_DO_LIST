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
function editTask(button, id) {
    let taskContainer = button.parentElement.parentElement;
    if (taskContainer.querySelector("select")) {
        return; // Prevent adding multiple selects
    }

    let newSelect = `
          <select  onchange="changeColumn(this , ${id})" id="status" class="w-20 h-8 rounded-lg" name="satuts">
                        <option value="">Select status ID</option>
                        <option value="0">To Do</option>
                        <option value="1">Doing</option>
                        <option value="2">Done</option>
                    </select>
    
    `;

    const status = document.getElementById("changeColumn");
    taskContainer.insertAdjacentHTML("beforeend", newSelect);
}
function changeColumn(select, id) {
    console.log(id);
    let taskContainer = select.parentElement.parentElement;

    const storedTickets = localStorage.getItem("storeTicket");

    let ticketsArray = [];
    if (storedTickets) {
        ticketsArray = JSON.parse(storedTickets);
    }

    const specificTicket = ticketsArray.find((ticket) => ticket.id === id);

    const sv = taskContainer.querySelector("#status").value;

    specificTicket.status = sv;

    localStorage.setItem("storeTicket", JSON.stringify(ticketsArray));
    location.reload();
}

function displayTickets() {
    const dataA = localStorage.getItem("storeTicket");

    let arrayData = [];

    if (dataA) {
        arrayData = JSON.parse(dataA);
    }

    arrayData.map((ticket) => {
        if (ticket.status === "0") {
            // console.log("firt");

            const taskHTML = `
            <div class="task w-80 mt-6 mb-6 p-2 rounded-lg bg-white">
                <h1 class="font-bold mt-1 mb-3" id="ticket-title">${ticket.title}</h1>
                <p class="mt-1 mb-3  overflow-auto hide-scrollbar" id="ticket-desc">${ticket.description}</p>
                <div class="w-full flex justify-between">
                    <div class="w-10 h-6  flex justify-center items-center rounded-lg">${ticket.info}</div>

                    <div class="w-28 h-6 bg-red-300 flex justify-center items-center rounded-lg">${ticket.endDate}</div>
                </div>
                <div class="flex justify-around mt-4">
                <button class="bg-blue-300 w-20 rounded-lg ml-2 font-medium" onclick="editTask(this, ${ticket.id})">Edit</button>
                <button class="bg-red-600 w-20 rounded-lg ml-2 font-medium" onclick="removeTask(this,${ticket.id})">Delete</button>
                </div>
            </div>
        `;
            todo.insertAdjacentHTML("beforeend", taskHTML);
        } else if (ticket.status === "1") {
            const taskHTML = `
            <div class="task w-80 mt-6 mb-6 p-2 rounded-lg bg-white">
                <h1 class="font-bold mt-1 mb-3" id="ticket-title">${ticket.title}</h1>
                <p class="mt-1 mb-3  overflow-auto hide-scrollbar" id="ticket-desc">${ticket.description}</p>
                <div class="w-full flex justify-between">
                    <div class="w-10 h-6 flex justify-center items-center rounded-lg">${ticket.info}</div>
                    <div class="w-28 h-6 bg-red-300 flex justify-center items-center rounded-lg">${ticket.endDate}</div>
                </div>
                <div class="flex justify-around mt-4">
                <button class="bg-blue-300 w-20 rounded-lg ml-2 font-medium" onclick="editTask(this, ${ticket.id})">Edit</button>
                <button class="bg-red-600 w-20 rounded-lg ml-2 font-medium" onclick="removeTask(this,${ticket.id})">Delete</button>
                </div>
            </div>
        `;
            doing.insertAdjacentHTML("beforeend", taskHTML);
        } else if (ticket.status === "2") {
            const taskHTML = `
            <div class="task w-80 mt-6 mb-6 p-2 rounded-lg bg-white">
                <h1 class="font-bold mt-1 mb-3" id="ticket-title">${ticket.title}</h1>
                <p class="mt-1 mb-3  overflow-auto hide-scrollbar" id="ticket-desc">${ticket.description}</p>
                <div class="w-full flex justify-between">
                    <div class="w-10 h-6 flex justify-center items-center rounded-lg">${ticket.info}</div>
                    <div class="w-28 h-6 bg-red-300 flex justify-center items-center rounded-lg">${ticket.endDate}</div>
                </div>
                <div class="flex justify-around mt-4">
                <button class="bg-blue-300 w-20 rounded-lg ml-2 font-medium" onclick="editTask(this, ${ticket.id})">Edit</button>
                <button class="bg-red-600 w-20 rounded-lg ml-2 font-medium" onclick="removeTask(this,${ticket.id})">Delete</button>
                </div>
            </div>
        `;
            done.insertAdjacentHTML("beforeend", taskHTML);
        }
    });

  
}
