<div class="settingModal">
  <div class="top-setting-div">
    <div class="settingP">
      Setting <i class="fa-solid fa-xmark" id="closeSettingsModal"></i>
    </div>
  </div>
  <div class="modal-hero-section">
    <div class="inner-hero">
      <!-- Timer Section -->
      <div class="timer-setting">
        <i class="fa-regular fa-clock"></i>Timer
      </div>
      <div class="timer-wrap">
        <div class="time-mins-section">
          <div class="wrapper-spacing">
            <div class="top-headingz">
              <span class="timeMins">Time (minutes)</span>
            </div>
            <div class="input-counter">
              <div class="time-input-wrapper">
                <label for="pomodoroTime" class="pomos-counterH">Pomodoro</label>
                <input id="pomodoroTime" type="number" min="0" step="1" class="counter-input-field" value="25">
              </div>
              <div class="time-input-wrapper">
                <label for="shortBreakTime" class="pomos-counterH">Short Break</label>
                <input id="shortBreakTime" type="number" min="0" step="1" class="counter-input-field" value="5">
              </div>
              <div class="time-input-wrapper">
                <label for="longBreakTime" class="pomos-counterH">Long Break</label>
                <input id="longBreakTime" type="number" min="0" step="1" class="counter-input-field" value="15">
              </div>
            </div>
          </div>
        </div>

        <!-- Auto Start Breaks -->
        <div class="time-mins-section">
          <div class="wrapper-spacing">
            <div class="top-headingz">
              <span class="heading-aligned-spacing">Auto Start Breaks</span>
            </div>
            <label class="switch-toggle">
              <input type="checkbox" id="autoStartBreaksToggle" class="input-checkbox">
              <span class="switch-circle"></span>
            </label>
          </div>
        </div>

        <!-- Auto Start Pomodoros -->
        <div class="time-mins-section">
          <div class="wrapper-spacing">
            <div class="top-headingz">
              <span class="heading-aligned-spacing">Auto Start Pomodoros</span>
            </div>
            <label class="switch-toggle">
              <!-- Note: Added the checkbox input (if you need to toggle this as well) -->
              <input type="checkbox" id="autoStartPomodorosToggle" class="input-checkbox">
              <span class="switch-circle"></span>
            </label>
          </div>
        </div>

        <!-- Long Break Interval -->
        <div class="time-mins-section">
          <div class="wrapper-spacing">
            <div class="top-headingz">
              <span class="heading-aligned-spacing">Long Break interval</span>
            </div>
            <input id="longBreakInterval" type="number" min="1" step="1" class="long-break-counter" value="4">
          </div>
        </div>
      </div>
      
      <div class="divider-line"></div>
      
      <!-- Task Section -->
      <div class="taskP">
        <i class="fas fa-regular fa-square-check"></i>Task
      </div>
      <div class="task-settings">
        <div class="time-mins-section">
          <div class="wrapper-spacing">
            <div class="top-headingz">
              <span class="heading-aligned-spacing">Auto Check Tasks</span>
            </div>
            <label class="switch-toggle">
              <input type="checkbox" id="autoCheckTasksToggle" class="input-checkbox">
              <span class="switch-circle"></span>
            </label>
          </div>
        </div>
        <div class="time-mins-section">
          <div class="wrapper-spacing">
            <div class="top-headingz">
              <span class="heading-aligned-spacing">Auto Switch Tasks</span>
            </div>
            <label class="switch-toggle">
              <input type="checkbox" id="autoSwitchTasksToggle" class="input-checkbox">
              <span class="switch-circle"></span>
            </label>
          </div>
        </div>
      </div>
      
      <div class="divider-line"></div>
      
      <!-- Sound Section (select and range inputs left as-is) -->
      <div class="sections-heading-bar">
        <i class="fa-solid fa-volume-high"></i>Sound
      </div>
      <div class="switch-task">
        <div class="time-mins-section">
          <div class="wrapper-spacing">
            <div class="top-headingz">
              <span class="heading-aligned-spacing">Alarm Sound</span>
            </div>
            <div class="dropdown-item-select">
              <select id="alarmSound" class="dropdown-item-select-inner">
                <option value="alarm">Alarm</option>
                <option value="bird">Bird</option>
                <option value="digital">Digital</option>
                <option value="kitchen">Kitchen</option>
                <option value="wood">Wood</option>
              </select>
            </div>
          </div>
         <!-- Second Slider (e.g. Alarm Sound) -->
         <div class="progress-bar-alignment">
            <div>
               <div id="alarmSoundDisplay">50</div>
               <input type="range" min="0" max="100" class="progress-bar-control" id="myRange" value="50">
            </div>
         </div>
          <div class="repeat-counter" >
            repeat
            <input type="number" min="1" step="1" id="repeatSound" class="counter-input-field repeat-input-field" value="1">
          </div>
        </div>
        <div class="time-mins-section">
          <div class="wrapper-spacing">
            <div class="top-headingz">
              <span class="heading-aligned-spacing">Ticking Sound</span>
            </div>
            <div class="dropdown-item-select">
              <select id="tickingSound" class="dropdown-item-select-inner">
                <option value="None">None</option>
                <option value="tickFast">Ticking Fast</option>
                <option value="tickSlow">Ticking Slow</option>
              </select>
            </div>
          </div>
          <div class="progress-bar-alignment">
            <div>
              <div id='tickingSoundDisplay'>51</div>
              <input type="range" min="0" max="100" class="progress-bar-control" id="myRange2" value="51">
            </div>
          </div>
        </div>
      </div>
      
      <div class="divider-line"></div>
      
      <!-- Theme Section -->
      <div class="sections-heading-bar">
        <i class="fa-solid fa-wand-magic-sparkles"></i>Theme
      </div>
      <div class="theme-settings">
        <div class="time-mins-section">
          <div class="wrapper-spacing">
            <div class="top-headingz">
              <span class="heading-aligned-spacing">Color Themes</span>
            </div>
            <div class="colors-parent-div">
              <!-- Checkbox for color theme 1 -->
              <label>
                <input type="checkbox" name="color-theme" value="theme1" id="theme1">
                <span class="color-radio color-child1"></span>
              </label>
              <!-- Checkbox for color theme 2 -->
              <label>
                <input type="checkbox" name="color-theme" value="theme2" id="theme2">
                <span class="color-radio color-child2"></span>
              </label>
              <!-- Checkbox for color theme 3 -->
              <label>
                <input type="checkbox" name="color-theme" value="theme3" id="theme3">
                <span class="color-radio color-child3"></span>
              </label>
            </div>

            <!-- Hidden input to store selected color values -->
            <input type="hidden" id="selected-colors" name="selected-colors">
          </div>

        </div>
        <div class="time-mins-section">
          <div class="wrapper-spacing">
            <div class="top-headingz">
              <span class="heading-aligned-spacing">Hour Format</span>
            </div>
            <div class="dropdown-item-select">
              <select id="timeFormat" class="dropdown-item-select-inner">
                <option>24-hour</option>
                <option>12-hour</option>
              </select>
            </div>
          </div>
        </div>
        <div class="time-mins-section">
          <div class="wrapper-spacing">
            <div class="top-headingz">
              <span class="heading-aligned-spacing">Dark Mode when running</span>
            </div>
            <label class="switch-toggle">
              <input type="checkbox" id="darkModeToggle" class="input-checkbox">
              <span class="switch-circle"></span>
            </label>
          </div>
        </div>
        <div class="time-mins-section">
            <div class="wrapper-spacing">
               <div class="top-headingz">
                  <span class="heading-aligned-spacing">Small Window</span>
               </div>
               <button class="okay-bottom-bar" id="openSmallWindow">
                  Open <i class="fa-solid fa-up-right-from-square"></i>
               </button>
            </div>
         </div>
      </div>
      
      <!-- <div class="divider-line"></div> -->
      
      <!-- Notification Section -->
      <!-- <div class="sections-heading-bar">
        <i class="fa-solid fa-bell"></i>Notification
      </div>
      <div class="notification-settings">
        <div class="time-mins-section">
          <div class="wrapper-spacing">
            <div class="top-headingz">
              <span class="heading-aligned-spacing">Reminder</span>
            </div>
            <div class="dropdown-item-select">
              <input type="number" min="1" step="1" id="reminderFrequency" class="counter-input-field reminder-input-counter" value="5"> min
            </div>
          </div>
        </div>
      </div> -->
      
    </div>
  </div>
  <div id="saveSettingsButton" class="bottom-bar">
    <button class="okay-bottom-bar">Save</button>
  </div>
</div>
