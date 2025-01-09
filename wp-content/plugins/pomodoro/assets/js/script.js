document.addEventListener("DOMContentLoaded", () => {
    const primaryColor = PomodoroTimerSettings.primaryColor;
    const secondaryColor = PomodoroTimerSettings.secondaryColor;
    const backgroundColor = PomodoroTimerSettings.backgroundColor;

    // Apply styles dynamically
    document.getElementById("pomodoro-timer").style.backgroundColor = backgroundColor;

    let timer;
    let minutes = 25;
    let seconds = 0;

    const updateDisplay = () => {
        document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');
    };

    const startTimer = () => {
        if (!timer) {
            timer = setInterval(() => {
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(timer);
                        alert("Time's up!");
                        return;
                    }
                    minutes--;
                    seconds = 59;
                } else {
                    seconds--;
                }
                updateDisplay();
            }, 1000);
        }
    };

    const pauseTimer = () => {
        clearInterval(timer);
        timer = null;
    };

    const resetTimer = () => {
        clearInterval(timer);
        timer = null;
        minutes = 25;
        seconds = 0;
        updateDisplay();
    };

    document.getElementById("start-button").addEventListener("click", startTimer);
    document.getElementById("pause-button").addEventListener("click", pauseTimer);
    document.getElementById("reset-button").addEventListener("click", resetTimer);

    updateDisplay();
    
});
