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
        </div>

       
       
        <div class="groupdiv">
            <div class="tabs">
                <button class="tab active" data-bg="#BA4949" data-time="25:00">Pomodoro</button>
                <button class="tab" data-bg="#38858A" data-time="05:00">Short Break</button>
                <button class="tab" data-bg="#397097" data-time="15:00">Long Break</button>
            </div>
        
            <div class="timer">25:00</div>
            <button class="start-button">START</button>
        </div>
    
        <div class="todo-container">
            <!-- <div class="tasks1"> 
                <div class="container1">
                    <h2>Tasks</h2>
                </div>
                <div class="container2">
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                </div>
                 
                
            </div> -->
           
            
           
            <table>
                <thead>
                    <tr class="table-head">
                        <th>Tasks</th>
                        <th>Pomodoros</th>
                        <th>Note</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="taskTableBody">
                </tbody>
            </table>
    
    
            <button class="add-task-button"><i class="fa-solid fa-circle-plus"></i> Add Task</button>
    
            
        </div>
    
        <div class="modal" id="taskModal">
            <div id="task_modal_wrap">



            <div class="modal-content" id="modal_content_id">
                
                <input type="text" class="input-window" id="taskName" placeholder="What are you working on?"  autofocus />


                <p class="est-text">Est Pomodoros:</p>
                <div class="controls">
                    <!-- <label for="pomodoros">Est Pomodoros:</label> -->
                    
                   
                    <button id="decreasePomodoro"><i class="fa-solid fa-circle-minus incdec"></i></button>
                    <input type="number" id="pomodoros" value="1" min="1" readonly />
                    <button id="increasePomodoro"><i class="fa-solid fa-circle-plus incdec"></i></button>
                </div>
                <textarea id="taskNote" placeholder="Add note"></textarea>
                
                <div class="save_cancel_div" id="cancel_save_div"></div>
                <button class="cancel-button" id="cancelTask">Cancel</button>
                <button class="save-button" id="saveTask">Save</button>
            </div>


            </div>



            



        </div>



    </div>

</body>
</html>
