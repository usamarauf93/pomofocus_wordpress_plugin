let intervalId;
let isRunning = false;
let activeTimerType = 'pomodoro'; // Default active timer
const pomodoroTimerContainer = document.querySelector('.pomodoro-timer-container');
const mainDiv = document.querySelector('.maindiv');
const tabs = document.querySelectorAll('.tab');
const timerDisplay = document.querySelector('.timer');
const startButton = document.querySelector('.start-button');
const taskModal = document.querySelector('#taskModal');
const addTaskButton = document.querySelector('.add-task-button');

const cancelTaskButton = document.querySelector('#cancelTask');
const saveTaskButton = document.querySelector('#saveTask');
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
    // Create a sorted copy of the tasks array
    const sortedTasks = tasks.slice().sort((a, b) => {
      if (a.done && !b.done) {
        return 1; // Move 'a' (done task) after 'b' (not done task)
      } else if (!a.done && b.done) {
        return -1; // Move 'a' (not done task) before 'b' (done task)
      } else {
        return 0; // Keep the order unchanged
      }
    });
  
    // Clear the table body
    taskTableBody.innerHTML = '';
  
    // Render the sorted tasks
    sortedTasks.forEach((task, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>
          <button class="check-btn" data-index="${tasks.indexOf(task)}">${task.done ? '✓' : '◻'}</button>
          ${task.name}
        </td>
        <td>${task.pomodoros}</td>
        <td>${task.note || '—'}</td>
        <td>
          <div class="action-buttons">
            <button class="edit-btn" data-index="${tasks.indexOf(task)}">Edit</button>
            <button class="delete-btn" data-index="${tasks.indexOf(task)}">Delete</button>
          </div>
        </td>
      `;
      if (task.done) {
        row.style.textDecoration = 'line-through';
      }
      taskTableBody.appendChild(row);
    });
  
    // Update the running task
    const taskRunning = tasks.filter(task => !task.done);
    if (taskRunning.length) {
      document.getElementById('running-task').textContent = taskRunning[0].name;
    }
  
    // Update the counter
    updateCounter();
  
    // Apply dark mode styles if enabled
    const savedSettings = JSON.parse(localStorage.getItem('pomodoroSettings')) || defaultSettings;
    if (savedSettings.darkModeToggle) {
      pomodoroTimerContainer.style.backgroundColor = "#000";
      mainDiv.style.backgroundColor = "#000";
      document.querySelector('.todo-container>table').style.backgroundColor = '#000';
  
      setTimeout(() => {
        const tdElements = document.querySelectorAll('.todo-container table tbody tr td');
        if (tdElements.length > 0) {
          tdElements.forEach(td => {
            td.style.color = '#fff';
          });
        } else {
          console.error('No td elements were found in the DOM.');
        }
      }, 1000); // Adjust the delay as needed
    }
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
        theme1Tab.setAttribute('data-bg', savedSettings.colorTheme?.theme1 || defaultSettings.colorTheme.theme1);
        theme2Tab.setAttribute('data-bg', savedSettings.colorTheme?.theme2 || defaultSettings.colorTheme.theme2);
        theme3Tab.setAttribute('data-bg', savedSettings.colorTheme?.theme3 || defaultSettings.colorTheme.theme3);

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
        pomodoroTimerContainer.style.backgroundColor = activeTab.getAttribute('data-bg');
    } else {
        // If no tab is active, set to default Pomodoro
        timerDisplay.textContent = formatTime(defaultSettings.pomodoro);
        pomodoroTimerContainer.style.backgroundColor = defaultSettings.colorTheme.theme1; // Default background color for Pomodoro
    }
    if(savedSettings.tickingSound && savedSettings.alarmSound){
        tickSound = new Audio(pomodoroTimerSettings[savedSettings.tickingSound]); 
        alarmSound = new Audio(pomodoroTimerSettings[savedSettings.alarmSound]);   

    }
    if(savedSettings.alarmSoundVolume && savedSettings.tickingSoundVolume ){
        
        alarmSound.volume = parseFloat((savedSettings.alarmSoundVolume/100).toFixed(1));
        tickSound.volume = parseFloat((savedSettings.tickingSoundVolume / 100).toFixed(1));
    }
    if(savedSettings.darkModeToggle){
        pomodoroTimerContainer.style.backgroundColor = "#000";
        mainDiv.style.backgroundColor = "#000";
        document.querySelector('.todo-container>table').style.backgroundColor = '#000';
        setTimeout(() => {
        const tdElements = document.querySelectorAll('.todo-container table tbody tr td');
        if (tdElements.length > 0) {
            tdElements.forEach(td => {
            td.style.color = '#fff';
            });
        } else {
            console.error('No td elements were found in the DOM.');
        }
        }, 1000); // Adjust the delay as needed
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
    renderTasks(tasks);
    if(savedSettings.darkModeToggle){
        pomodoroTimerContainer.style.backgroundColor = "#000";
        mainDiv.style.backgroundColor = "#000";
        document.querySelector('.todo-container>table').style.backgroundColor = '#000';
    }
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
function startTimer(duration, activeTimerType) {
    let [minutes, seconds] = duration.split(':').map(Number);
    const savedSettings = JSON.parse(localStorage.getItem('pomodoroSettings')) || {};
    const isPomodoro = timerDisplay.getAttribute('data-tabActive') === 'pomodoro';

    // Update tasks when the timer starts (only for pomodoro)
    if (isPomodoro) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        let hasMarkedRunning = false;

        const updatedTasks = tasks.map(task => {
            if (!task.done && !hasMarkedRunning) {
                hasMarkedRunning = true; // Mark the first not-done task as running
                return { ...task, running: true };
            }
            return { ...task, running: false }; // Ensure other tasks are not running
        });
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    // Start the timer
    intervalId = setInterval(() => {
        if (seconds === 0) {
            if (minutes === 0) {
                console.log('I am callled')
                clearInterval(intervalId);
                startButton.textContent = 'START';
                isRunning = false;

                // Play alarm sound
                playAlarmSound(savedSettings);

                // Handle task completion (only for pomodoro)
                if (isPomodoro && savedSettings.autoCheckTasks) {
                    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
                    console.log(tasks,'====tasks');
                    const updatedTasks = tasks.map(task => ({
                        ...task,
                        done: task.running ? true : task.done, // Mark running tasks as done
                        running: false // Reset running state
                    }));
                    console.log('updated task array',updatedTasks);
                    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
                }

                // Auto-start breaks or pomodoros
                if (savedSettings.autoStartBreaks && isPomodoro) {
                    document.getElementById('theme2tab').click();
                    document.getElementById('start-button').click();
                } else if (savedSettings.autoStartPomodoros && !isPomodoro) {
                    document.getElementById('theme1tab').click();
                    document.getElementById('start-button').click();
                }

                return;
            }
            minutes--;
            seconds = 59;
        } else {
            seconds--;
            tickSound.play();
        }

        // Update the timer display
        if (timerDisplay.getAttribute('data-tabActive') === activeTimerType) {
            timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        } else {
            startButton.textContent = 'START';
            timerDisplay.textContent = savedSettings[formattedTimerType];
        }
    }, 1000);
}

// Helper function to play alarm sound
function playAlarmSound(savedSettings) {
    if (savedSettings.repeatAlarmSound && savedSettings.repeatAlarmSound > 1) {
        const alarmDuration = parseFloat(alarmSound.duration * 1000).toFixed(5); // Convert duration to milliseconds
        let repeatCount = savedSettings.repeatAlarmSound;

        const playAlarm = () => {
            if (repeatCount > 0) {
                console.log('repeatCount',repeatCount);
                alarmSound.play();
                repeatCount--;
                setTimeout(playAlarm, alarmDuration);
            }
        };

        playAlarm(); // Start the first play
    } else {
        alarmSound.play(); // Play the sound once
    }
}

// Handle start/pause button
startButton.addEventListener('click', () => {
    const activeTabType = startButton.getAttribute('data-tabActive'); // Get the active tab type
    console.log(activeTabType,'i am working');
    //Check if there is pending task then run the timer
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if(tasks){
        const pendingTasks = tasks.filter(task => task.done === false);
        console.log('updatedTasks.length',pendingTasks);
        if(pendingTasks.length < 1){
            alert('No Pending task to work on ...')
            return false;
        }
    }

   
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
    loadTasks();
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
    const defaultSettings = {
        pomodoro: 25,
        shortBreak: 5,
        longBreak: 15,
        timeFormat:'12-hour'
    };

    const savedSettings = JSON.parse(localStorage.getItem('pomodoroSettings')) || defaultSettings;

    // Convert pomodoroDuration (HH:MM) to total minutes
    const [minutes, seconds] = pomodoroDuration.split(':').map(Number);
    const totalPomodoroMinutes = minutes;

    // Calculate total time required based on the number of pomodoros
    const totalMinutes = taskPomodoros * totalPomodoroMinutes;

    // Get the current time
    const currentTime = new Date();

    // Calculate finish time by adding total minutes to the current time
    currentTime.setMinutes(currentTime.getMinutes() + totalMinutes);

    // Format the finish time based on the time format setting
    let finishHours = currentTime.getHours();
    const finishMinutes = currentTime.getMinutes();

    let formattedFinishTime;
    if (savedSettings.timeFormat === '12-hour') {
        // Convert to 12-hour format
        const period = finishHours < 12 ? 'AM' : 'PM';
        finishHours = finishHours % 12 || 12; // Handle 0 hours (convert to 12)
        formattedFinishTime = `${String(finishHours).padStart(2, '0')}:${String(finishMinutes).padStart(2, '0')} ${period}`;
    } else {
        // Keep as 24-hour format
        formattedFinishTime = `${String(finishHours).padStart(2, '0')}:${String(finishMinutes).padStart(2, '0')}`;
    }

    // Display total minutes and finish time
    document.getElementById('finishAt').textContent = `Finish At (${formattedFinishTime})`; // Display the finish time
    updateHoursCount(savedSettings);
}
// Function to calculate and update hours count
function updateHoursCount(savedSettings) {

    const tasksString = localStorage.getItem('tasks');
    const tasksArray = tasksString ? JSON.parse(tasksString) : [];
    const totalPomodoros = tasksArray.reduce((sum, task) => sum + (task.done ? 0 : parseInt(task.pomodoros)), 0); // Only count incomplete tasks
    const totalHours = (totalPomodoros * savedSettings.pomodoro) / 60; // Convert Pomodoros to hours 
    console.log('savedSettings.pomodoro',savedSettings.pomodoro,totalPomodoros)
    document.getElementById('hoursCount').textContent = `(${totalHours.toFixed(1)}h)`; // Display hours with 1 decimal place
}



// MEDIA SCREEN JS

function removeInlineStylesForMobile() {
    
    const pomodoroContainer = document.querySelector('.pomodoro-timer-container');
    const mainDiv = document.querySelector('.maindiv');
    // Check if the screen width is less than or equal to 767px (mobile screen)
    if (window.outerWidth <= 767) {

      // Remove or modify inline styles
      if (pomodoroContainer) {
        pomodoroContainer.style.minWidth = ''; // Remove min-width
        pomodoroContainer.style.minHeight = ''; // Remove min-height
      }

      if (mainDiv) {
        mainDiv.style.width = ''; // Remove background color
      }

    console.log('removeInlineStylesForMobile called');
    }else{
        if (pomodoroContainer) {
            pomodoroContainer.style.minWidth = '1900px'; // Remove min-width
            pomodoroContainer.style.minHeight = '800px'; // Remove min-height
          }
    
          if (mainDiv) {
            mainDiv.style.width = '566px'; // Remove background color
          }
    }
  }

  // Call the function when the page loads
  window.addEventListener('load', removeInlineStylesForMobile);

  // Call the function when the window is resized
  window.addEventListener('resize', removeInlineStylesForMobile);