let intervalId;
let isRunning = false;
let activeTimerType = 'pomodoro'; // Default active timer
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


// settings modal and button element 
const settingsButton = document.getElementById('settingsButton');
// const settingsModal = document.getElementById('settingsModal');
const closeSettingsModal = document.getElementById('closeSettingsModal');
var formattedTimerType = '';

let editingRow = null;

 // Open settings modal
 settingsButton.addEventListener('click', () => {
    settingsModal.style.display = 'flex';
 });


 closeSettingsModal.addEventListener('click', (e) => {
    settingsModal.style.display = 'none';
 });
// Load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    renderTasks(tasks);
    loadSettings();
}

// Save tasks to localStorage
function saveTasks(tasks) {
    // console.log('save task clicked')
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
    //  console.log("Number of tasks:", tasksCount);
     document.getElementById('taskCount').textContent = tasksCount;
     taskModal.style.display = 'none';
    // console.log(tasksCount,timerDisplay.textContent);
     updateFinishAt(tasksCount, timerDisplay.textContent);

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
function loadSettings() {
    const defaultSettings = {
        pomodoro: 25,
        shortBreak: 5,
        longBreak: 15,
    };

    const savedSettings = JSON.parse(localStorage.getItem('pomodoroSettings')) || defaultSettings;

    const activeTab = document.querySelector('.tab.active');
    const timerDisplay = document.getElementById('timerDisplay');
    if (activeTab) {
        const activeTimerType = activeTab.textContent.trim().replace(/\s+/g, '').toLowerCase(); // Determine active tab type
        const timeValue = savedSettings[activeTimerType] || defaultSettings[activeTimerType];

        // Update the timer display
        timerDisplay.textContent = formatTime(timeValue);
        document.body.style.backgroundColor = activeTab.getAttribute('data-bg');
    } else {
        // If no tab is active, set to default Pomodoro
        timerDisplay.textContent = formatTime(defaultSettings.pomodoro);
        document.body.style.backgroundColor = '#BA4949'; // Default background color for Pomodoro
    }
}

// Utility function to format time in MM:SS
function formatTime(minutes) {
    return `${String(minutes).padStart(2, '0')}:00`;
}

// Handle tab switching and update timer display
document.querySelectorAll('.tab').forEach(tab => {
    
    tab.addEventListener('click', () => {

        // Remove active class from all tabs
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));

        // Add active class to the clicked tab
        tab.classList.add('active');

        // Update timer and background based on tab settings
        const timerType = tab.textContent.trim().replace(/\s+/g, '');
       formattedTimerType = timerType.charAt(0).toLowerCase() + timerType.slice(1);

        startButton.setAttribute('data-tabActive', formattedTimerType);
       

        
        // console.log(formattedTimerType);
        const savedSettings = JSON.parse(localStorage.getItem('pomodoroSettings')) || {
            pomodoro: 25,
            shortBreak: 5,
            longBreak: 15,
        };
        const timerValue = savedSettings[formattedTimerType] || 25; // Default to 25 minutes for Pomodoro if not found
        const timerDisplay = document.getElementById('timerDisplay');
        timerDisplay.setAttribute('data-tabActive', formattedTimerType);
        timerDisplay.textContent = formatTime(timerValue);
        document.body.style.backgroundColor = tab.getAttribute('data-bg');
        clearInterval(intervalId);
        startButton.textContent = 'START';
        isRunning = false;
    });
});

// Start the timer
function startTimer(duration,activeTimerType) {
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
        // console.log(timerDisplay.getAttribute('data-tabActive'));
        if(timerDisplay.getAttribute('data-tabActive') == activeTimerType ){
            timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }else{
            startButton.textContent = 'START';
            timerDisplay.textContent = savedSettings[formattedTimerType];
        }
    }, 1000);
}

// Handle start/pause button
startButton.addEventListener('click', () => {
    const activeTabType = startButton.getAttribute('data-tabActive'); // Get the active tab type
    // console.log(activeTabType);
    if (isRunning) {
        clearInterval(intervalId);
        startButton.textContent = 'START';
        isRunning = false;
    } else {
        isRunning = true;
        startButton.textContent = 'PAUSE';
        startTimer(timerDisplay.textContent,activeTabType);
    }
});

// Load tasks and settings on page load
document.addEventListener('DOMContentLoaded', () => {
    loadSettings();
    const tabsArray = Array.from(tabs);
    const activeTab = tabsArray.find(tab => tab.classList.contains('active'));
    if (activeTab) {
        activeTab.click(); // Set active tab and timer on load
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
function updateFinishAt(taskPomodoros, pomodoroDuration) {
    // Convert pomodoroDuration (HH:MM) to total minutes
    const [minutes, seconds] = pomodoroDuration.split(':').map(Number);
    const totalPomodoroMinutes = minutes;

    // Calculate total time required based on the number of pomodoros
    const totalMinutes = taskPomodoros * totalPomodoroMinutes;

    // Get the current time
    const currentTime = new Date();

    // Calculate finish time by adding total minutes to the current time
    currentTime.setMinutes(currentTime.getMinutes() + totalMinutes);

    // Format the finish time into a readable format
    const finishHours = currentTime.getHours();
    const finishMinutes = currentTime.getMinutes();
    const formattedFinishTime = `${String(finishHours).padStart(2, '0')}:${String(finishMinutes).padStart(2, '0')}`;

    // Display total minutes and finish time
    document.getElementById('finishAt').textContent = `Finish At (${formattedFinishTime})`; // Display the finish time
}

// Load tasks on page load
document.addEventListener('DOMContentLoaded', loadTasks);
