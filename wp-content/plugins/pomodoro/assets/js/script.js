let intervalId;
let isRunning = false;
const tabs = document.querySelectorAll('.tab');
const timerDisplay = document.querySelector('.timer');
const startButton = document.querySelector('.start-button');
const taskModal = document.getElementById('taskModal');
const addTaskButton = document.querySelector('.add-task-button');

const cancelTaskButton = document.getElementById('cancelTask');
const saveTaskButton = document.getElementById('saveTask');
const taskNameInput = document.getElementById('taskName');

const pomodorosInput = document.getElementById('pomodoros');
const taskNoteInput = document.getElementById('taskNote');
const decreasePomodoro = document.getElementById('decreasePomodoro');
const increasePomodoro = document.getElementById('increasePomodoro');
const taskTableBody = document.getElementById('taskTableBody');

let editingRow = null;


// Load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    renderTasks(tasks);
}

// Save tasks to localStorage
function saveTasks(tasks) {
    console.log('save task clicked')
    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateCounter();
}
function updateCounter(){
     // Retrieve the JSON string from localStorage
     const tasksString = localStorage.getItem('tasks');

     // Parse the string into an array (handle the case if it's null or empty)
     const tasksArray = tasksString ? JSON.parse(tasksString) : [];
 
     // Count how many objects are in the array
     const tasksCount = tasksArray.length;
 
     // Now you can do something with the count
     console.log("Number of tasks:", tasksCount);
     document.getElementById('taskCount').textContent = tasksCount;


    



}
// Render tasks in the table
function renderTasks(tasks) {
    taskTableBody.innerHTML = '';
    tasks.forEach((task, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${task.name}</td>
            <td>${task.pomodoros}</td>
            <td>${task.note || '—'}</td>
            <td>
                <div class="action-buttons">
                    <button class="edit-btn" data-index="${index}">Edit</button>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                </div>
            </td>
        `;
        taskTableBody.appendChild(row);
    });
    updateCounter();
}

// Handle tab switching
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        document.body.style.backgroundColor = tab.getAttribute('data-bg');
        console.log(startButton.id);
        document.getElementById(startButton.id).style.color = tab.getAttribute('data-btncolor');

        timerDisplay.textContent = tab.getAttribute('data-time');
        clearInterval(intervalId);
        startButton.textContent = 'START';
        isRunning = false;
    });
});

// Start the timer
function startTimer(duration) {
    let [minutes, seconds] = duration.split(':').map(Number);

    intervalId = setInterval(() => {
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(intervalId);
                startButton.textContent = 'START';
                isRunning = false;
                return;
            }
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }

        timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }, 1000);
}

// Handle start/pause button
startButton.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(intervalId);
        startButton.textContent = 'START';
        isRunning = false;
    } else {
        isRunning = true;
        startButton.textContent = 'PAUSE';
        startTimer(timerDisplay.textContent);
    }
});

// Add task button
addTaskButton.addEventListener('click', () => {
    editingRow = null;
    taskModal.style.display = 'flex';
});

// Cancel task modal
cancelTaskButton.addEventListener('click', () => {
    taskModal.style.display = 'none';
    taskNameInput.value = '';
    pomodorosInput.value = 1;
    taskNoteInput.value = '';
});

// Save task
saveTaskButton.addEventListener('click', () => {
    const taskName = taskNameInput.value.trim();
    const pomodoros = pomodorosInput.value;
    const taskNote = taskNoteInput.value.trim();

    if (taskName === '') return;

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    if (editingRow !== null) {
        const index = editingRow.dataset.index;
        tasks[index] = { name: taskName, pomodoros, note: taskNote };
    } else {
        tasks.push({ name: taskName, pomodoros, note: taskNote });
    }

    saveTasks(tasks);
    renderTasks(tasks);

    taskModal.style.display = 'none';
    taskNameInput.value = '';
    pomodorosInput.value = 1;
    taskNoteInput.value = '';
});





// Decrease pomodoros
decreasePomodoro.addEventListener('click', () => {
    if (pomodorosInput.value > 1) {
        pomodorosInput.value--;
    }
});

// Increase pomodoros
increasePomodoro.addEventListener('click', () => {
    pomodorosInput.value++;
});

// Handle task table actions
taskTableBody.addEventListener('click', (event) => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    if (event.target.classList.contains('delete-btn')) {
        const index = event.target.dataset.index;
        tasks.splice(index, 1);
        saveTasks(tasks);
        renderTasks(tasks);
    } else if (event.target.classList.contains('edit-btn')) {
        const index = event.target.dataset.index;
        const task = tasks[index];

        editingRow = event.target.closest('tr');
        editingRow.dataset.index = index;

        taskNameInput.value = task.name;
        pomodorosInput.value = task.pomodoros;
        taskNoteInput.value = task.note;

        taskModal.style.display = 'flex';
    }
});

// Load tasks on page load
document.addEventListener('DOMContentLoaded', loadTasks);








document.addEventListener("DOMContentLoaded", function() {
    // Get references to the necessary elements
    const gearIcon = document.querySelector('.fa-gear');
    const closeIcon = document.querySelector('.fa-xmark');
    const popup = document.getElementById('setting_content_id');
  
    // Show the popup when the gear icon is clicked
    gearIcon.addEventListener('click', function() {

        // alert("You clicked on Setting!");

      popup.style.display = 'flex';  // You can change this to a different style or animation if needed

    });
  
    // Hide the popup when the x-mark icon is clicked
    closeIcon.addEventListener('click', function() {
      popup.style.display = 'none';   // You can change this to a fade-out or another effect if desired
    });
  });