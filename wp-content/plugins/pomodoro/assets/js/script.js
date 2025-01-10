let intervalId;
let isRunning = false;
const tabs = document.querySelectorAll('.tab');
const timerDisplay = document.querySelector('.timer');
const startButton = document.querySelector('.start-button');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        document.body.style.backgroundColor = tab.getAttribute('data-bg');
        timerDisplay.textContent = tab.getAttribute('data-time');
        clearInterval(intervalId);
        startButton.textContent = 'START';
        isRunning = false;
    });
});

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

// Modal functionality
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

addTaskButton.addEventListener('click', () => {
    editingRow = null;
    taskModal.style.display = 'flex';
});

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

    if (editingRow) {
        editingRow.children[0].textContent = taskName;
        editingRow.children[1].textContent = pomodoros;
        editingRow.children[2].textContent = taskNote || '—';
    } else {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${taskName}</td>
            <td>${pomodoros}</td>
            <td>${taskNote || '—'}</td>
            <td>
                <div class="action-buttons">
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </div>
            </td>
        `;
        taskTableBody.appendChild(row);
    }

    taskModal.style.display = 'none';
    taskNameInput.value = '';
    pomodorosInput.value = 1;
    taskNoteInput.value = '';
});

decreasePomodoro.addEventListener('click', () => {
    if (pomodorosInput.value > 1) {
        pomodorosInput.value--;
    }
});

increasePomodoro.addEventListener('click', () => {
    pomodorosInput.value++;
});

taskTableBody.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
        event.target.closest('tr').remove();
    } else if (event.target.classList.contains('edit-btn')) {
        const row = event.target.closest('tr');
        editingRow = row;
        taskNameInput.value = row.children[0].textContent;
        pomodorosInput.value = row.children[1].textContent;
        taskNoteInput.value = row.children[2].textContent === '—' ? '' : row.children[2].textContent;
        taskModal.style.display = 'flex';
    }
});