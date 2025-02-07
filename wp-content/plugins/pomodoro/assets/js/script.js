let intervalId;
let isRunning = false;
let activeTimerType = 'pomodoro'; // Default active timer
const pomodoroTimerContainer = document.querySelector('.pomodoro-timer-container');
const mainDiv = document.querySelector('.maindiv');
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
// console.log(pomodoroTimerSettings,'pomodoroTimerSettings');
var tickSound;
var alarmSound;
tickSound = new Audio(pomodoroTimerSettings.tickSlow);
alarmSound = new Audio(pomodoroTimerSettings.alarm);

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
    // console.log('save task clicked',tasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    // Display the names of the tasks where done is true
    const taskRunning =  tasks.filter(task => task.done === false);
    if(taskRunning.length)
        document.getElementById('running-task').textContent = tasks.filter(task => task.done === false)[0].name;
    updateCounter();
}
function updateCounter() {
    const tasksString = localStorage.getItem('tasks');
    const tasksArray = tasksString ? JSON.parse(tasksString) : [];
    const remainingTasks = tasksArray.filter(task => !task.done).length;

    document.getElementById('taskCount').textContent = remainingTasks;
    taskModal.style.display = 'none';
    updateFinishAt(remainingTasks, timerDisplay.textContent);
}
// Render tasks in the table
function renderTasks(tasks) {
    taskTableBody.innerHTML = '';
    tasks.forEach((task, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <button class="check-btn" data-index="${index}">${task.done ? '✓' : '◻'}</button>
                ${task.name}
            </td>
            <td>${task.pomodoros}</td>
            <td>${task.note || '—'}</td>
            <td>
                <div class="action-buttons">
                    <button class="edit-btn" data-index="${index}">Edit</button>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                </div>
            </td>
        `;
        if (task.done) {
            row.style.textDecoration = 'line-through';
        }
        taskTableBody.appendChild(row);
    });
    const taskRunning =  tasks.filter(task => task.done === false);
    if(taskRunning.length)
        document.getElementById('running-task').textContent = tasks.filter(task => task.done === false)[0].name;
    updateCounter();
    updateCounter();
}
taskTableBody.addEventListener('click', (event) => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    if (event.target.classList.contains('check-btn')) {
        const index = event.target.dataset.index;
        tasks[index].done = !tasks[index].done; // Toggle the done status
        saveTasks(tasks);
        renderTasks(tasks);
        updateCounter();
    } else if (event.target.classList.contains('delete-btn')) {
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
function loadSettings() {
    const defaultColor = pomodoroTimerSettings.colorTheme;
    const defaultSettings = {
        pomodoro: 25,
        shortBreak: 5,
        longBreak: 15,
        colorTheme: defaultColor,
        tickingSound: pomodoroTimerSettings.tickSlow,
        alarmSound:pomodoroTimerSettings.alarm,
        tickSoundVolume:50,
        alarmSoundVolume:50
    };

    // Retrieve saved settings from localStorage or use defaults
    const savedSettings = JSON.parse(localStorage.getItem('pomodoroSettings')) || defaultSettings;

    // Update the data-bg attribute for each tab based on saved colorTheme
    const theme1Tab = document.getElementById('theme1tab');
    const theme2Tab = document.getElementById('theme2tab');
    const theme3Tab = document.getElementById('theme3tab');

    if (theme1Tab && theme2Tab && theme3Tab) {
        theme1Tab.setAttribute('data-bg', savedSettings.colorTheme.theme1);
        theme2Tab.setAttribute('data-bg', savedSettings.colorTheme.theme2);
        theme3Tab.setAttribute('data-bg', savedSettings.colorTheme.theme3);

        // Optionally, update the background color of the active tab
        const activeTab = document.querySelector('.tab.active');
        if (activeTab) {
            mainDiv.style.backgroundColor = activeTab.getAttribute('data-bg');
        }
    }

    // Update the timer display based on the active tab
    const activeTab = document.querySelector('.tab.active');
    const timerDisplay = document.getElementById('timerDisplay');

    if (activeTab) {
        const activeTimerType = activeTab.textContent.trim().replace(/\s+/g, '').toLowerCase(); // Determine active tab type
        const timeValue = savedSettings[activeTimerType] || defaultSettings[activeTimerType];

        // Update the timer display
        timerDisplay.textContent = formatTime(timeValue);
        mainDiv.style.backgroundColor = activeTab.getAttribute('data-bg');
    } else {
        // If no tab is active, set to default Pomodoro
        timerDisplay.textContent = formatTime(defaultSettings.pomodoro);
        pomodoroTimerContainer.style.backgroundColor = '#BA4949'; // Default background color for Pomodoro
    }
    if(savedSettings.tickingSound && savedSettings.alarmSound){
        tickSound = new Audio(pomodoroTimerSettings[savedSettings.tickingSound]); 
        alarmSound = new Audio(pomodoroTimerSettings[savedSettings.alarmSound]);   

    }
    if(savedSettings.alarmSoundVolume && savedSettings.tickingSoundVolume ){
        
        alarmSound.volume = parseFloat((savedSettings.alarmSoundVolume/100).toFixed(1));
        tickSound.volume = parseFloat((savedSettings.tickingSoundVolume / 100).toFixed(1));
    }

}

// Utility function to format time in MM:SS
function formatTime(minutes) {
    return `${String(minutes).padStart(2, '0')}:00`;
}

// Handle tab switching and update timer display
document.querySelectorAll('.tab').forEach((tab, index, tabs) => {
    tab.addEventListener('click', () => switchTab(index));
});

// Function to switch tab based on index
function switchTab(index) {
    tickSound.pause();
    document.getElementById('forwardButton').style.display = 'none';
    const tabs = document.querySelectorAll('.tab');

    // Remove active class from all tabs
    tabs.forEach(t => t.classList.remove('active'));

    // Add active class to the clicked tab
    tabs[index].classList.add('active');

    // Update timer and background based on tab settings
    const timerType = tabs[index].textContent.trim().replace(/\s+/g, '');
    const formattedTimerType = timerType.charAt(0).toLowerCase() + timerType.slice(1);

    startButton.setAttribute('data-tabActive', formattedTimerType);

    // Retrieve settings from local storage or use defaults
    const savedSettings = JSON.parse(localStorage.getItem('pomodoroSettings')) || {
        pomodoro: 25,
        shortBreak: 5,
        longBreak: 15,
    };

    const timerValue = savedSettings[formattedTimerType] || 25; // Default to 25 minutes for Pomodoro if not found
    const timerDisplay = document.getElementById('timerDisplay');
    timerDisplay.setAttribute('data-tabActive', formattedTimerType);
    timerDisplay.textContent = formatTime(timerValue);

    // Update background color
    mainDiv.style.backgroundColor = tabs[index].getAttribute('data-bg');
    pomodoroTimerContainer.style.backgroundColor = tabs[index].getAttribute('data-bg');

    // Reset timer
    clearInterval(intervalId);
    startButton.textContent = 'START';
    startButton.style.color =  tabs[index].getAttribute('data-bg');
    isRunning = false;

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    renderTasks(tasks)
}

// Add event listener for the forward button
document.getElementById('forwardButton').addEventListener('click', () => {
    const tabs = document.querySelectorAll('.tab');
    const activeTab = document.querySelector('.tab.active');
    let currentIndex = Array.from(tabs).indexOf(activeTab);

    // Calculate next tab index (looping back to the start if needed)
    let nextIndex = (currentIndex + 1) % tabs.length;

    switchTab(nextIndex);
});

// Start the timer
function startTimer(duration,activeTimerType) {
    let [minutes, seconds] = duration.split(':').map(Number);
    const savedSettings = JSON.parse(localStorage.getItem('pomodoroSettings'));
    if(timerDisplay.getAttribute('data-tabActive') == 'pomodoro'){
        // Retrieve the full list of tasks from local storage
        const tasks = JSON.parse(localStorage.getItem('tasks'));

        // Create a new tasks array with the updated values for tasks where running is true
        const updatedTasks = tasks.map(task => {
        if (task.done === false) {
            return { ...task,  running: true };
        }
        return task;
        });

        // Save the entire updated tasks array back to local storage
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    intervalId = setInterval(() => {
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(intervalId);
                startButton.textContent = 'START';
                alarmSound.play();
                tickSound.pause();
                isRunning = false;
                // console.log(savedSettings.autoCheckTasks, 'autoCheckTasks', savedSettings.autoCheckTasks && timerDisplay.getAttribute('data-tabActive') == 'pomodoro');
                if(savedSettings.autoCheckTasks  && timerDisplay.getAttribute('data-tabActive') == 'pomodoro'){
                    // Retrieve the full list of tasks from local storage
                    const tasks = JSON.parse(localStorage.getItem('tasks'));

                    // Create a new tasks array with the updated values for tasks where running is true
                    const updatedTasks = tasks.map(task => {
                    if (task.running === true) {
                        return { ...task, done: true, running: false };
                    }
                    return task;
                    });

                    // Save the entire updated tasks array back to local storage
                    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
                }
                if(savedSettings.autoStartBreaks && timerDisplay.getAttribute('data-tabActive') == 'pomodoro'){
                    // task get settings
                    // current running task , mark as done
                    document.getElementById('theme2tab').click();
                    document.getElementById('start-button').click();
                }
                else if(savedSettings.autoStartPomodoros && timerDisplay.getAttribute('data-tabActive') == 'shortBreak'){

                    document.getElementById('theme1tab').click();
                    document.getElementById('start-button').click();
                }else{
                    console.log('on long breAK')
                }
                
                return;
            }
            minutes--;
            seconds = 59;
        } else {
            tickSound.play();
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
        document.getElementById('forwardButton').style.display = 'none';
        tickSound.pause();

    } else {
        isRunning = true;
        startButton.textContent = 'PAUSE';
        startTimer(timerDisplay.textContent,activeTabType);
        document.getElementById('forwardButton').style.display = 'block';


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

saveTaskButton.addEventListener('click', () => {
    const taskName = taskNameInput.value.trim();
    const pomodoros = pomodorosInput.value;
    const taskNote = taskNoteInput.value.trim();

    if (taskName === '') return;

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    if (editingRow !== null) {
        const index = editingRow.dataset.index;
        tasks[index] = { name: taskName, pomodoros, note: taskNote, done: tasks[index].done || false,  running: tasks[index].running || false };
    } else {
        tasks.push({ name: taskName, pomodoros, note: taskNote, done: false , running: false});
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


function updateFinishAt(taskPomodoros, pomodoroDuration) {
    // console.log(taskPomodoros, pomodoroDuration);
    // Convert pomodoroDuration (HH:MM) to total minutes
    const [minutes, seconds] = pomodoroDuration.split(':').map(Number);
    const totalPomodoroMinutes = minutes;

    // Calculate total time required based on the number of pomodoros
    const totalMinutes = taskPomodoros * totalPomodoroMinutes;
    // console.log('total minutes', totalMinutes);
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
    updateHoursCount();
}
// Function to calculate and update hours count
function updateHoursCount() {
    const defaultSettings = {
        pomodoro: 25,
        shortBreak: 5,
        longBreak: 15
    };

    const savedSettings = JSON.parse(localStorage.getItem('pomodoroSettings')) || defaultSettings;

    const tasksString = localStorage.getItem('tasks');
    const tasksArray = tasksString ? JSON.parse(tasksString) : [];
    const totalPomodoros = tasksArray.reduce((sum, task) => sum + (task.done ? 0 : parseInt(task.pomodoros)), 0); // Only count incomplete tasks
    const totalHours = (totalPomodoros * savedSettings.pomodoro) / 60; // Convert Pomodoros to hours 
    console.log('savedSettings.pomodoro',savedSettings.pomodoro,totalPomodoros)
    document.getElementById('hoursCount').textContent = `(${totalHours.toFixed(1)}h)`; // Display hours with 1 decimal place
}
// Load tasks on page load
document.addEventListener('DOMContentLoaded', loadTasks);
