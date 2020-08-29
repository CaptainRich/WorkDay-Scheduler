// Javascript file for Workday Planner

// Richard Ay,  August 2020

// Create an array to hold the 9 task objects
var tasks = [
    {times:  "9 am",  taskText: "", taskStatus: 0, index: 0, hr24: 9},    
    {times:  "10 am", taskText: "", taskStatus: 1, index: 1, hr24: 10}, 
    {times:  "11 am", taskText: "", taskStatus: 0, index: 2, hr24: 11}, 
    {times:  "12 pm", taskText: "", taskStatus: 0, index: 3, hr24: 12}, 
    {times:  "1 pm",  taskText: "", taskStatus: 0, index: 4, hr24: 13}, 
    {times:  "2 pm",  taskText: "", taskStatus: 0, index: 5, hr24: 14}, 
    {times:  "3 pm",  taskText: "", taskStatus: 0, index: 6, hr24: 15}, 
    {times:  "4 pm",  taskText: "", taskStatus: 0, index: 7, hr24: 16}, 
    {times:  "5 pm",  taskText: "", taskStatus: 0, index: 8, hr24: 17}, 
];

var jIndex;          // the index value associated with the task being edited.


////////////////////////////////////////////////////////////////////////////////
// Get the current date/time
var getNow = function() {
    var rightNow = moment().format('LLLL');
    $("#currentDay").text(rightNow);           // put the current time/date on the page

    var currentHour = moment().hour();
}


/////////////////////////////////////////////////////////////////////////////////
// Define the function to save the tasks to local storage.
var saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


/////////////////////////////////////////////////////////////////////////////////
// Define the function to retrieve the tasks from local storage.
var loadTasks = function() {

    var tasksRead = [];

    tasksRead = JSON.parse(localStorage.getItem("tasks"));
   
    if( tasksRead != null ) {
        tasks = tasksRead;
    }

    // Create the panels on the scheduler form
    for( var i = 0; i < tasks.length; i++ ) {
 
       var taskTime = $("<p>").addClass("col time-block hour");
           taskTime.text(tasks[i].times);

        // When creating this panel, check the time and adjust the CSS class
        // to 'past', 'present', or "future'.    

        var taskText;
        if( tasks[i].hr24 < currentHour ) {
            taskText = $("<p>").addClass("col-10 description past");
        }
        else if( tasks[i].hr24 > currentHour ) {
            taskText = $("<p>").addClass("col-10 description future");
        }
        else {
            taskText = $("<p>").addClass("col-10 description present");
        }
        taskText.text(tasks[i].taskText);     // set the page element's text for this task
        taskText.attr({id:i});                // set the page element's 'id" for this task


        var taskBtn  = $("<button>").addClass("col saveBtn");

        // Items from local storage are (by nature) persistent/saved
        var taskBtnIcon = $("<span>").addClass("oi oi-lock-locked");
        

        // Append the icon to the button
        taskBtn.append(taskBtnIcon);
 
        // Finally put the 'div panel' in the 'div container', with
        // the time, task, and button.
        var panelTask = $("<div>").addClass("row panel");
        panelTask.append( taskTime, taskText, taskBtn );
        $(".planner").append(panelTask);

    }
    return taskText;
}

/////////////////////////////////////////////////////////////////////////////////
// The user clicked on a task item, switch this to 'edit' mode
$(document.body).on("click", ".description", function(event) {
    var text =  $(this)
      .text()
      .trim();

    // Start by getting the tasks position in the list of other "p" elements
    jIndex = event.target.getAttribute("id");
  
    var textInput = $("<textArea>")
      .addClass("formControl")
      .val(text);
  
      $(this).replaceWith(textInput);
      textInput.trigger("focus");

  });
  
// This blur event will trigger as soon as the user interacts with anything
// other than the 'textarea'.
$(document.body).on("blur", "textarea", function() {

    // Get the textArea's current value/text
    var text = $(this).val().trim();
  
  
    // Update the edited task using the index (jIndex) determined above in the 'edit' function.  
    tasks[jIndex].taskText = text;
   
  
    // Change the task back from a 'textarea' to a 'p'
    var taskP = $("<p>").addClass("col-10 description past").text(text);
    $(this).replaceWith(taskP);

    // Audit the modified task time-wise
    auditTimes( this, jIndex );
  });
 

/////////////////////////////////////////////////////////////////////////////////
// The user clicked on the [save] button
$(document.body).on( "click", ".saveBtn", function() {

    //event.preventDefault();

    //$(this).removeClass("oi oi-lock-locked");
    //$(this).removeClass("oi oi-lock-unlocked");
    //$(this).addClass("oi oi-lock-locked");

    // Save all of the tasks to local storage
    saveTasks();

});


/////////////////////////////////////////////////////////////////////////////////
// Setup the 'date' audit function
var auditTimes = function(timeEl, index) {

    // Get the time from the task element's hr24 property
    var time = tasks[index].hr24;
  
    // Remove any old classes from the element
    $(timeEl).removeClass("col-10 description past future present");
  
    // Apply new class if the task is near/over the due date
    if (time < currentHour) {
        $(timeEl).addClass("col-10 description past");
    }
    else if (time > currentHour) {
        $(timeEl).addClass("col-10 description future");
    }
    else {
        $(timeEl).addClass("col-10 description present");
    }
  }

  ///////////////////////////////////////////////////////////////////////
// Get the current date and time and put them in the header
getNow();


var currentHour = moment().hour();

// Retrieve the tasks from local storage
var junk = loadTasks();

///////////////////////////////////////////////////////////////////
// Start a timer to update the current date/time in the header

setInterval( getNow, 1000 * 60 );

///////////////////////////////////////////////////////////////////
// Start a timer to audit the tasks every 15 minutes so that near/past 
// times can be colored appropriately.

setInterval(function() {
    $(".description").each(function(el, index){
      auditTimes(el, index);
    });
   }, (1000 * 60 * 15) );       // audit the tasks every 30 minutes

