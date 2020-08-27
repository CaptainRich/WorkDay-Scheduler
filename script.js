// Javascript file for Workday Planner


// Define the 9, one hour time blocks.
var timeBlocks = ["9", "10", "11", "12", "1", "2", "3", "4", "5"];  

// Create an array to hold task objects
var tasks = [
    {times:  "9",  taskText: "", taskStatus: 0},    
    {times:  "10", taskText: "", taskStatus: 0}, 
    {times:  "11", taskText: "", taskStatus: 0}, 
    {times:  "12", taskText: "", taskStatus: 0}, 
    {times:  "1",  taskText: "", taskStatus: 0}, 
    {times:  "2",  taskText: "", taskStatus: 0}, 
    {times:  "3",  taskText: "", taskStatus: 0}, 
    {times:  "4",  taskText: "", taskStatus: 0}, 
    {times:  "5",  taskText: "", taskStatus: 0}, 
];


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

    tasksread = JSON.parse(localStorage.getItem("tasks"));
   
    if( tasksRead.length > 0 ) {
        tasks = tasksRead;
    }


    // Create the panels on the scheduler form
    for( var i = 0; i < timeBlocks.length; i++ ) {
        var taskTime    = $("<p>").addClass("col time-block hour");
            taskTime.text(tasks[i].times);

        var taskText    = $("<p>").addClass("col-10 description textarea past");
            taskText.text(tasks[i].taskText);

        var taskBtn     = $("<button>").addClass("col saveBtn");

        if( tasks[i].taskStatus == 0 ) {
           var taskBtnIcon = $("<span>").addClass("oi oi-lock-unlocked");
        }
        else {
           var taskBtnIcon = $("<span>").addClass("oi oi-lock-locked");
        }

        // Append everything to the parent 'div row'
        taskTime.append(taskText, taskBtn, taskBtnIcon );
        $("row").append(taskTime);
    }
}

/////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// The user clicked on a task item, switch this to 'edit' mode
$(".description").on("click", "p", function() {
    var text =  $(this)
      .text()
      .trim();
  
    var textInput = $("<textArea>")
      .addClass("formControl")
      .val(text);
  
      $(this).replaceWith(textInput);
      textInput.trigger("focus");
  
    console.log(text);  // call back that just shows a 'p' was clicked
  });
  

  
    // Change the task back from a 'textarea' to a 'p'
    var taskP = $("<p>").addClass("m-1").text(text);
    $(this).replaceWith(taskP);
  });
  

/////////////////////////////////////////////////////////////////////////////////

// Get the current date and time and put them in the header
getNow();

// Retrieve the tasks from local storage
loadTasks();

