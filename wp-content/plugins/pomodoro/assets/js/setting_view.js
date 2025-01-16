// JavaScript to save settings to localStorage with named HTML elements
document.addEventListener('DOMContentLoaded', () => {
    const saveSettingsButton = document.getElementById('saveSettingsButton');
    const openButton = document.getElementById('openSmallWindow');
  
    openButton.addEventListener('click', () => {
      // Get the URL of the current page
      const currentPage = window.location.href;
  
      // Open a new window with a width of 180px and a specified height (for example, 400px)
      window.open(
        currentPage,
        "_blank",
        "width=180,height=400,resizable=yes,scrollbars=yes"
      );
    });
    // Ticking Sound Slider
    const rangeInputTicking = document.getElementById('myRange2');
    const valueDisplayTicking = document.getElementById('ticking-sound-value');
    
    if (rangeInputTicking && valueDisplayTicking) {
        rangeInputTicking.addEventListener('input', function() {
            valueDisplayTicking.innerText = rangeInputTicking.value;
        });
    } else {
        console.error('Ticking Sound slider or display element not found.');
    }

    // Alarm Sound Slider
    const alarmSoundSlider = document.getElementById('myRange');
    const alarmSoundDisplay = document.getElementById('alarm-sound-value');

    if (alarmSoundSlider && alarmSoundDisplay) {
        alarmSoundSlider.addEventListener('input', function() {
            alarmSoundDisplay.innerText = alarmSoundSlider.value;
        });
    } else {
        console.error('Alarm Sound slider or display element not found.');
    }
    // --- Toggle (Checkbox) Active Class Code ---
    // For all checkboxes that are inside a .switch-toggle label,
    // add an event listener that toggles the 'active' class on the parent label.
    const toggleCheckboxes = document.querySelectorAll('.switch-toggle input[type="checkbox"]');
    toggleCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
        // Use the parent element (assumed to be the label with class 'switch-toggle')
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
        // Note: Assuming you have toggles with these IDs changed to use the 'active' class
        settings.autoStartBreaks = document.getElementById('autoStartBreaksToggle')?.parentElement.classList.contains('active') || false;
        settings.autoStartPomodoros = document.getElementById('autoStartPomodorosToggle')?.parentElement.classList.contains('active') || false;
        settings.autoCheckTasks = document.getElementById('autoCheckTasksToggle')?.parentElement.classList.contains('active') || false;
        settings.autoSwitchTasks = document.getElementById('autoSwitchTasksToggle')?.parentElement.classList.contains('active') || false;
        settings.darkModeToggle = document.getElementById('darkModeToggle')?.parentElement.classList.contains('active') || false;
        settings.repeatAlarmSound = document.getElementById('repeatSound')?.parentElement.classList.contains('active') || false;
        
        // Sound settings
        settings.alarmSound = document.getElementById('alarmSound').value;
        // For ticking sound slider, we want to save the numeric value
        settings.tickingSoundVolume = alarmSoundDisplay.innerText;
        settings.tickingSound = document.getElementById('tickingSound').value;

        // Notification settings
        settings.reminderFrequency = document.getElementById('reminderFrequency')?.value || '';



        //repeat alarm Sound
        settings.repeatAlarmSound = document.getElementById('repeatSound')?.value || '';

        // Color Theme setting:
        // Get the selected radio button from the color-theme group
        const colorThemeRadios = document.getElementsByName('color-theme');
        let selectedTheme = "";
        for (const radio of colorThemeRadios) {
            if (radio.checked) {
                selectedTheme = radio.value;
                break;
            }
        }
        settings.colorTheme = selectedTheme; // can be "theme1", "theme2", or "theme3"

        settings.timeFormat = document.getElementById('timeFormat').value;

        // Save settings to localStorage
        localStorage.setItem('pomodoroSettings', JSON.stringify(settings));
        alert('Settings saved successfully!');
    });
});
