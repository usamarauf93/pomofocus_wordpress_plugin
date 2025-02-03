
document.addEventListener('DOMContentLoaded', () => {
    const saveSettingsButton = document.getElementById('saveSettingsButton');
    const openButton = document.getElementById('openSmallWindow');
    loadSettingsFromStorage();

    openButton.addEventListener('click', () => {
        const currentPage = window.location.href;
        window.open(
            currentPage,
            "_blank",
            "width=180,height=400,resizable=yes,scrollbars=yes"
        );
    });

 

    // Alarm Sound Slider
    const alarmSoundSlider = document.getElementById('myRange');
    const alarmSoundDisplay = document.getElementById('alarmSoundDisplay');

    if (alarmSoundSlider && alarmSoundDisplay) {
        alarmSoundSlider.addEventListener('input', function () {
            alarmSoundDisplay.innerText = alarmSoundSlider.value;
        });
    } else {
        console.error('Alarm Sound slider or display element not found.');
    }
    // Ticking Sound Slider
    const tickingSoundSlider = document.getElementById('myRange2');
    const tickingSoundDisplay = document.getElementById('tickingSoundDisplay');

    if (tickingSoundSlider && tickingSoundDisplay) {
        tickingSoundSlider.addEventListener('input', function () {
            tickingSoundDisplay.innerText = tickingSoundSlider.value;
        });
    } else {
        console.error('Ticking Sound slider or display element not found.');
    }

    // Toggle (Checkbox) Active Class Code
    const toggleCheckboxes = document.querySelectorAll('.switch-toggle input[type="checkbox"]');
    toggleCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            if (this.checked) {
                this.parentElement.classList.add('active');
            } else {
                this.parentElement.classList.remove('active');
            }
        });
    });

    // Save settings when button is clicked
    saveSettingsButton.addEventListener('click', () => {
        const settings = {};

        // Timer settings
        settings.pomodoro = document.getElementById('pomodoroTime').value;
        settings.shortBreak = document.getElementById('shortBreakTime').value;
        settings.longBreak = document.getElementById('longBreakTime').value;
        settings.longBreakInterval = document.getElementById('longBreakInterval').value;

        // Switch settings
        settings.autoStartBreaks = document.getElementById('autoStartBreaksToggle')?.parentElement.classList.contains('active') || false;
        settings.autoStartPomodoros = document.getElementById('autoStartPomodorosToggle')?.parentElement.classList.contains('active') || false;
        settings.autoCheckTasks = document.getElementById('autoCheckTasksToggle')?.parentElement.classList.contains('active') || false;
        settings.autoSwitchTasks = document.getElementById('autoSwitchTasksToggle')?.parentElement.classList.contains('active') || false;
        settings.darkModeToggle = document.getElementById('darkModeToggle')?.parentElement.classList.contains('active') || false;
        settings.repeatAlarmSound = document.getElementById('repeatSound')?.parentElement.classList.contains('active') || false;

        // Sound settings
        settings.alarmSound = document.getElementById('alarmSound').value;
        settings.alarmSoundVolume = alarmSoundDisplay.innerText;
        settings.tickingSoundVolume = tickingSoundDisplay.innerText;
        settings.tickingSound = document.getElementById('tickingSound').value;

        // Color Theme settings
        settings.colorTheme = {
            theme1: document.querySelector('.color-child1').style.backgroundColor || '#FFFFFF',
            theme2: document.querySelector('.color-child2').style.backgroundColor || '#FFFFFF',
            theme3: document.querySelector('.color-child3').style.backgroundColor || '#FFFFFF',
        };

        // Time format
        settings.timeFormat = document.getElementById('timeFormat').value;

        // Save settings to localStorage
        localStorage.setItem('pomodoroSettings', JSON.stringify(settings));
        alert('Settings saved successfully!');
        settingsModal.style.display = 'none';
        window.location.reload();
    });

    function loadSettingsFromStorage() {
        const defaultSettings = {
            pomodoro: 25,
            shortBreak: 5,
            longBreak: 15,
            longBreakInterval: 4,
            autoStartBreaks: false,
            autoStartPomodoros: false,
            autoCheckTasks: false,
            autoSwitchTasks: false,
            darkModeToggle: false,
            repeatAlarmSound: false,
            alarmSound: 'default',
            alarmSoundVolume: 50,
            tickingSoundVolume: 50,
            tickingSound: 'default',
            colorTheme: {
                theme1: '#FF0000', // Default color for theme1
                theme2: '#00FF00', // Default color for theme2
                theme3: '#0000FF', // Default color for theme3
            },
            timeFormat: '24h'
        };

        const savedSettings = JSON.parse(localStorage.getItem('pomodoroSettings')) || defaultSettings;

        // Apply settings to form fields
        document.getElementById('pomodoroTime').value = savedSettings.pomodoro;
        document.getElementById('shortBreakTime').value = savedSettings.shortBreak;
        document.getElementById('longBreakTime').value = savedSettings.longBreak;
        document.getElementById('longBreakInterval').value = savedSettings.longBreakInterval;

        // Apply toggles with 'active' class and 'checked' property
        const toggleElements = [
            { id: 'autoStartBreaksToggle', value: savedSettings.autoStartBreaks },
            { id: 'autoStartPomodorosToggle', value: savedSettings.autoStartPomodoros },
            { id: 'autoCheckTasksToggle', value: savedSettings.autoCheckTasks },
            { id: 'autoSwitchTasksToggle', value: savedSettings.autoSwitchTasks },
            { id: 'darkModeToggle', value: savedSettings.darkModeToggle }
        ];

        toggleElements.forEach(toggle => {
            const toggleElement = document.getElementById(toggle.id);
            const parentElement = toggleElement.parentElement;
            parentElement.classList.toggle('active', toggle.value);
            toggleElement.checked = toggle.value;
        });

        document.getElementById('repeatSound').value = savedSettings.repeatAlarmSound;
        document.getElementById('alarmSound').value = savedSettings.alarmSound;
        document.getElementById('tickingSound').value = savedSettings.tickingSound;

        // Apply selected color theme
        const colorSpans = document.querySelectorAll('.color-radio');
        colorSpans.forEach(span => {
            const themeKey = span.classList[1].replace('color-child', 'theme');
            span.style.backgroundColor = savedSettings.colorTheme[themeKey];
        });

        document.getElementById('timeFormat').value = savedSettings.timeFormat;

        // Set volume display
        const alarmSoundDisplay = document.getElementById('alarmSoundDisplay');
        alarmSoundDisplay.innerText = savedSettings.alarmSoundVolume;
        document.getElementById('myRange').value = savedSettings.tickingSoundVolume;
    
        const tickingSoundDisplay = document.getElementById('tickingSoundDisplay');
        alarmSoundDisplay.innerText = savedSettings.tickingSoundVolume;
        document.getElementById('myRange2').value = savedSettings.tickingSoundVolume;
    }

    // Color Picker functionality
    const colorCheckboxes = document.querySelectorAll('input[name="color-theme"]');
    const selectedColorsInput = document.getElementById('selected-colors');

    colorCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('click', function () {
            openColorPicker(checkbox);
        });
    });

    function openColorPicker(checkbox) {
        const colorPicker = document.createElement('input');
        colorPicker.type = 'color';
        colorPicker.style.position = 'absolute';
        colorPicker.style.left = '-9999px'; // Move off-screen

        // Append color picker to the body
        document.body.appendChild(colorPicker);

        // Trigger color picker
        colorPicker.click();

        // Handle color picker change event
        colorPicker.addEventListener('change', function () {
            const selectedColor = colorPicker.value;

            // Update the corresponding color span
            const colorSpan = checkbox.nextElementSibling;
            colorSpan.style.backgroundColor = selectedColor;

            // Remove the color picker from the DOM
            document.body.removeChild(colorPicker);
        });
    }
});