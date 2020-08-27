// Javascript file for Workday Planner



// Create an array to hold the 9 task objects
var tasks = [
    {times:  "9",  taskText: "Sample task 1", taskStatus: 0, index: 0, hr24: 9},    
    {times:  "10", taskText: "Sample task 2", taskStatus: 1, index: 1, hr24: 10}, 
    {times:  "11", taskText: "", taskStatus: 0, index: 2, hr24: 11}, 
    {times:  "12", taskText: "", taskStatus: 0, index: 3, hr24: 12}, 
    {times:  "1",  taskText: "", taskStatus: 0, index: 4, hr24: 13}, 
    {times:  "2",  taskText: "", taskStatus: 0, index: 5, hr24: 14}, 
    {times:  "3",  taskText: "", taskStatus: 0, index: 6, hr24: 15}, 
    {times:  "4",  taskText: "", taskStatus: 0, index: 7, hr24: 16}, 
    {times:  "5",  taskText: "", taskStatus: 0, index: 8, hr24: 17}, 
];


    // Get the current hour of the day
    var currentHour = moment().hour();

////////////////////////////////////////////////////////////////////////////////
// Get the current date/time
var getNow = function() {
    var rightNow = moment().format('LLLL');
    $("#currentDay").text(rightNow);           // put the current time/date on the page
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

    // Get the current hour of the day
    var currentHour = moment().hour();

    // Create the panels on the scheduler form
    for( var i = 0; i < tasks.length; i++ ) {
       // var taskTime    = $("<p>").addClass("col time-block hour");
       var taskTime = $("row").add("p").addClass("col time-block hour");
           taskTime.text(tasks[i].times);

        // When creating this panel, check the time and adjust the CSS class
        // to 'past', 'present', or "future'.    

        var taskText;
        if( tasks[i].times < currentHour ) {
            taskText = $("<p>").addClass("col-10 description past");
        }
        else if( tasks[i].times > currentHour ) {
            taskText = $("<p>").addClass("col-10 description future");
        }
        else {
            taskText = $("<p>").addClass("col-10 description present");
        }

        taskText     = $("<p>").addClass("col-10 description past");
        taskText.text(tasks[i].taskText);

        var taskBtn  = $("<button>").addClass("col saveBtn");

        // Items from local storage are (by nature) persistent
        var taskBtnIcon = $("<span>").addClass("oi oi-lock-locked");
        

        // Append everything to the parent 'div row'
        taskTime.append(taskText, taskBtn, taskBtnIcon );
        $("row").append(taskTime);
    }
}

/////////////////////////////////////////////////////////////////////////////////
// The user clicked on a task item, switch this to 'edit' mode
$(".description").on("click", ".description", function() {
    var text =  $(this)
      .text()
      .trim();
  
    var textInput = $("<textArea>")
      .addClass("formControl")
      .val(text);
  
      $(this).replaceWith(textInput);
      textInput.trigger("focus");
  
    console.log(text);  // call back that just shows a 'description' was clicked
  });
  
// This blur event will trigger as soon as the user interacts with anything
// other than the 'textarea'.
$(".description").on("blur", "textarea", function() {

    // Get the textArea's current value/text
    var text = $(this).val().trim();
  
    // Get the task's position on the planner page
    var index = $(this).index;
  
    // Update the edited task using the index just determined.
    tasks[index].taskText = text;
   
  
    // Change the task back from a 'textarea' to a 'p'
    var taskP = $("<p>").addClass("col-10 description past").text(text);
    $(this).replaceWith(taskP);

    // Audit the modified task time-wise
    auditTimes( this, index );
  });
 

/////////////////////////////////////////////////////////////////////////////////
// The user clicked on the [save] button
//$(".description").on("click", "span", function() {

//}


/////////////////////////////////////////////////////////////////////////////////
// Setup the 'date' audit function
var auditTimes = function(timeEl, index) {

    // Get the time from the task element's hr24 property
    var time = tasks[index].hr24;
  
    // Remove any old classes from the element
    $(timeEl).removeClass("col-10 description past future present");
  
    // Apply new class if the task is near/over the due date
    if( time < currentHour) {
      $(timeEl).addClass("col-10 description past");
    }
    else if ( time > currentHour) {
      $(timeEl).addClass("col-10 description future");
    }
    else {
        $(timeEl).addClass("col-10 description present");   
    }
  }

  ///////////////////////////////////////////////////////////////////////
// Get the current date and time and put them in the header
getNow();

// Retrieve the tasks from local storage
loadTasks();


///////////////////////////////////////////////////////////////////
// Start a timer to audit the tasks every 15 minutes so that near/past 
// times can be colored appropriately.

setInterval(function() {
    $(".description").each(function(el, index){
      auditTimes(el, index);
    });
   }, (1000 * 60 * 15) );       // audit the tasks every 30 minutes