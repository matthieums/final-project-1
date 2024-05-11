# Professional Holidays Planner
#### Video Demo: https://www.youtube.com/watch?v=_5NJCAcWwCw

## What is it?
An interactive calendar to plan days-off.

Employees may sometimes struggle picking days-off. This app streamlines the process; it is an answer to such inconvenience for people that would rather use
a digital calendar to plan their holidays. Who needs a paper calendar anyway?

## How does it work?
It needs two data from the user: 
•	The amount of hours he can take off
•	The length of his shifts

The user answers two questions to collect the necessary data. Then the calendar view is displayed, in which the user can select cells, each corresponding to a day of the week.

Each time a cell is selected, a number of hours corresponding to the user’s shifts length is deduced from the total of hours and displayed on top of the calendar.

When the user reaches the hour limit he has fixed, the selected calendar cells turn red. In order for them to go back to blue, he need to deselect days to rebalance the number of hours off he can take.

A reset button or a back button allows the user to change the data.


## Files
Everything has been built from scratch. A lot of time was dedicated to building the logic behind the switches from one month to the next and between years. I also had to care for the proper display of day numbers inside of each cell.

### Django:
Django handles the routes and the rendering of both the calendar and questions to the user. It also takes care of forms, getting the posted data and sending it to the HTML templates. 

### CSS
The CSS handles customized classes, the colors and hovering effects. Bootstrap classes take care of the rest in the HTML.

### HTML templates : 
They build both the index questions and the calendar using jinja loops. In the calendar view, each row starts on a Monday and ends on Sunday. A total of 6 rows exist in the template, but only 5 are displayed at all time. The fifth row is displayed when there is not enough room for all the month’s days to be displayed in the existing row. 

For example, September 2024 needs 6 rows because the first day starts on the last cell of the first row and the month is 30 days long. Since each row is 7 days long, the additional row is included to display the entirety of the month’s days properly. I have chosen to hide the optional row for aesthetic reasons. When it is not necessary, displaying an empty row does not make sense.

At the bottom of the calendars’ HTML, we can find data about the user’s shift. I have put it there in order for the JS to easily access it and maybe to display it in later updates.

### Holidaycalculator.js:
This is the main bulk of the program. It displays the appropriate data in the calendar: the current month, year, day numbers and it also toggles the display of the optional row.

The file is divided into 2 main parts.

•	the main function
Using  JS methods, the program fetches data about the current year, month and day of the user’s location. This data is then sent to the appropriate innerHTML for proper display. Everything is mostly handled by functions outside of main.

When the calendar is loaded, the page acts a single-page-app. No refresh is needed, except to reset, effectively clearing the local storage and resetting the calendar to the current month.

•	The helper functions
o	Indicate the month and year on top of the calendar.
o	Display the correct number of remaining hours, depending on the number of cells selected.
o	Populate cells with their appropriate day number.
o	Set event listeners to each cell, which add or remove classes to them, triggering  CSS side-effects.
o	Add logic to all buttons(next, previous, reset, back to form).
o	Add or remove classes for each cell for the CSS to react accordingly.

### Design choices 
In order to make sure that the calendar appears uniformly and to avoid blinking, the window onload function displays the body only when everything has properly load in the calendar HTML. Until then , the body class is d-none.

The previous and next button only differ because they either add or remove 1 to the current month’s index. It make sense to combine their logic in one part with an if condition separating both cases.

I have chosen to store data in session storage, as opposed to local storage because the data does not need to persist. When the browser is closed, the data can safely be erased and the session started over. If data need to be stored durably, another feature needs to be added in order to either save data to the data base or locally saved.

In order to maximize reusability and avoid redundancy, I have tried as much as possible to split the main function into small functions, whose definitions are abstracted from the main function.

When a user selects a cell that makes his remaining hours go negative, the remaining hours display turns red, as well as every cell selected. This is designed with UX in mind. The user can more easily know when he has selected to much or too few. The cells turn back to blue when the number is positive.

When the user hovers the cells, their border turns red, in order to indicate to the user that this cell can be selected. Hovering over empty cells has no effect.

I have had a lot of troubles when deciding on how to save data about the cells that should be highlighted. I have found out that a viable solution in this case was to store data in the cells. Based on the month and year they are displayed in, each day keeps data about their respective day, year and month. This way, when the user selects a day, the data is saved to the session storage. Thus, when clicking on next or previous, the cell data is affected, to reflect the current month and year.

I have added a button to let the user go back to the form and input new data. Otherwise, the only way to get back to that page would be to close the browser or delete “/calendar” from the URL.

I have deliberately put the remaining number of hours on top of the calendar. I don’t think it would make sense any other way and it would affect hierarchy on the page. This way, the user 

### Future expansions
Such projects lends itself well to expansions. It could go in many different directions.

This app could be integrated into a professional context, to help companies manage their employees’ days off. Both managers and employees would have access to the calendar, with one instance per employee saved in the database, or even multiple calendars to serve multiple purposes.

It could also serve only as a holiday planner for friends who want to find the best moment to leave together, similarly to Doodle. We could imagine a way for multiple users to pick dates and send them to someone to find time slots ideal for a meeting or project management. I did not complete each of these features (yet) because they are the repetition of concepts I have already learned to apply during this project.
I could add an API to display the national days and highlight optimized holidays (bridges, etc.)

At the moment, the database is underused because there is no login system nor data saved anywhere else than locally. Perhaps future expansions could use more of the database. After validating every day off, a user could get a summary or an overview of the holiday picked with various statistics such as the most selected day of the week.

Many more customization options could be added and tutorials could be added for each feature.

I will be expanding this project for the final project of CS50W.
