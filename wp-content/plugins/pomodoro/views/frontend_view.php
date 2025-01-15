<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Pomodoro Timer</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
   </head>
   <body style="background-color: #BA4949;">
      <div class="maindiv">
         <div class="topbar">
            <p class="top-heading"><i class="fa-solid fa-circle-check"></i> Pomodoro</p>
            <i class="fa-solid fa-gear"></i>
         </div>
         <div class="groupdiv">
            <div class="tabs">
               <button  id="red1" class="tab active" data-btncolor="#BA4949" data-bg="#BA4949" data-time="25:00">Pomodoro</button>
               <button  id="blue1" class="tab" data-btncolor="#38858A" data-bg="#38858A" data-time="05:00">Short Break</button>
               <button  id="green11" class="tab" data-btncolor="#397097" data-bg="#397097" data-time="15:00">Long Break</button>
            </div>
            <div class="timer">25:00</div>
            <div class="btn_nxt">
               <button id="start-button" class="start-button" style="color: #BA4949;">START</button>
               <i class="fa-solid fa-forward-step nextforward"></i>
            </div>
         </div>
         <div class="todo-container">
            <table>
               <thead>
                  <tr class="table-head">
                     <th>Tasks</th>
                     <th>Pomos</th>
                     <th>Note</th>
                     <th>Actions</th>
                  </tr>
               </thead>
               <tbody id="taskTableBody">
               </tbody>
            </table>
            <button class="add-task-button"><i class="fa-solid fa-circle-plus"></i> Add Task</button>
            <div class="pomo-bar">
               <span>Pomos: 0/<span id="taskCount">126</span></span>
               <span>Finish At (<span id="minsCount">222</span>m)</span>
            </div>
            <div class="setting-content" id="setting_content_id" style="display: none;">
               <?php include 'settings_view.php'; ?>
            </div>
         </div>
         <!-- <div class="modal" id="settingModal">
            <div id="task_modal_wrap">
               <div class="modal-content" id="modal_content_id">
                  <input type="text" class="input-window" id="taskName" placeholder="What are you working on?"  autofocus />
                  <p class="est-text">Est Pomodoros:</p>
                  <div class="controls">
                     <button id="decreasePomodoro"><i class="fa-solid fa-circle-minus incdec"></i></button>
                     <input type="number" id="pomodoros" value="1" min="1" readonly />
                     <button id="increasePomodoro"><i class="fa-solid fa-circle-plus incdec"></i></button>
                  </div>
                  <textarea id="taskNote" placeholder="Add note"></textarea>
                  <div class="save_cancel_div" id="cancel_save_div"></div>
                  <button class="cancel-button" id="cancelTask">Cancel</button>
                  <button class="save-button" id="saveTask">Save1</button>
               </div>
            </div>
         </div> -->
         <div class="modal" id="taskModal">
            <div id="task_modal_wrap">
               <div class="modal-content" id="modal_content_id">
                  <input type="text" class="input-window" id="taskName" placeholder="What are you working on?"  autofocus />
                  <p class="est-text">Est Pomodoros:</p>
                  <div class="controls">
                     <button id="decreasePomodoro"><i class="fa-solid fa-circle-minus incdec"></i></button>
                     <input type="number" id="pomodoros" value="1" min="1" readonly />
                     <button id="increasePomodoro"><i class="fa-solid fa-circle-plus incdec"></i></button>
                  </div>
                  <textarea id="taskNote" placeholder="Add note"></textarea>
                  <div class="save_cancel_div" id="cancel_save_div"></div>
                  <button class="cancel-button" id="cancelTask">Cancel</button>
                  <button class="save-button" id="saveTask">Save2</button>
               </div>
            </div>
         </div>
      </div>
   </body>
</html>