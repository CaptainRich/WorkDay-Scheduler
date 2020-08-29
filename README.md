# Work Day Scheduler Project

Richard Ay, August 2020

## Table of Contents
* [Project Objective](#project-objective)
* [Acceptance Criteria](#acceptance-criteria)
* [Deployment Link](#deployment-link)
* [Planner/Scheduler Logic](#planner/scheduler-logic)
* [Application Screen Shot](#application-screen-shot)



## Project Objective
As an employee with a busy schedule, I want to add important events to a daily planner so that I can manage my time effectively.

## Acceptance Criteria
GIVEN I am using a daily planner to create a schedule.

1) WHEN I open the planner, THEN the current day is displayed at the top of the calendar.
2) WHEN I scroll down, THEN I am presented with time blocks for standard business hours.
3) WHEN I view the time blocks for that day, THEN each time block is color-coded to indicate whether it is in the past, present, or future.
4) WHEN I click into a time block, THEN I can enter an event or task.
5) WHEN I click the save button for that time block, THEN the text for that event is saved in local storage.
6) WHEN I refresh the page, THEN the saved events persist.

## Deployment Link
The deployment link to display the updated web page is: 
[GitHub Pages](https://captainrich.github.io/WorkDay-Scheduler/) 

## Planner/Scheduler Logic

1) An array of tasks objects is initialized (empty) when the application starts.
2) The 'moment.js' library is used to obtain the current date and time.
3) Local storage is accessed to read in the array of task objects, which may or may not exist.
4) The daily planner is dynamically created by the JavaScript for each hour of the day, possibly populated with the tasks from local storage if any exist.
5) During the creation of these elements, each is assigned an ID.
6) Event handlers are used to determine if the user clicks on a task area or on a "save button".
* Clicking on any 'save' button saves the entire array of all objects (to local storage).
* Clicking on a task changes that area to a text box for editing.  Changing the focus puts the new/edited task back in the template form, and updates the associated object in the array, including the appropriate background color.
7) A 'time audit' timer runs (every 5 minutes) to monitor the time and possibly change the background color of the tasks to represent past, current, and future activities - based on the current 'hour' of the day.
8) A second timer runs to update the time in the page header (every minute).


## Application Screen Shot

![Workday Planner Image](https://github.com/CaptainRich/WorkDay-Scheduler/blob/master/workday-screenshot.jpg)

