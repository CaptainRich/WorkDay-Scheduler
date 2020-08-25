// Javascript file for Workday Planner


// Define the 9, one hour time blocks.
var timeBlocks = ["9", "10", "11", "12", "1", "2", "3", "4", "5"];  

// Create an object to hold the various task arrays
var tasks = {
    times:      [9],
    taskText:   [9],
    taskStatus: [9]
};


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
    tasks = JSON.parse(localStorage.getItem("tasks"));

    // If there was nothing there, simply initialize the tasks
    if( !tasks ) {
        for( i = 0; i < 9; i++ ) {
            tasks.times[i] = timeBlocks[i];        // hour of working day
            tasks.taskText[i] = "";                // an empty string
            tasks.taskStatus[i] = 0;               // 0 indicates not saved
        }
    }
}

/////////////////////////////////////////////////////////////////////////////////
var generateForm = function() {
    for( var i = 0; i < timeBlocks.length; i++ ) {

    }
}

/////////////////////////////////////////////////////////////////////////////////

// Get the current date and time and put them in the header
getNow();

// Retrieve the tasks from local storage
loadTasks();

// Generate the basic form of 9 rows.
generateForm();