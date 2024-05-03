
document.addEventListener('DOMContentLoaded', function () {
    
    if (document.getElementById('calendar-container')) {
        
        const months = ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"]
        const dayCount = (year, month) => new Date(year, month, 0).getDate();

        //Gather data about today's date
        const today = new Date();
        let currentMonthIDX = today.getMonth();
        let currentYear = today.getFullYear();
        let daysInCurrentMonth = dayCount(currentYear, currentMonthIDX + 1);

        // Display current month above calendar:
        if (document.querySelector('#current-month')) {
            let currentMonthElement = document.querySelector('#current-month');
            currentMonthElement.innerHTML = `${months[currentMonthIDX]} ${currentYear}`;
        }
    
        // Get first day of given month and the index associated with the day (sunday = 0)
        let firstDayOfMonth = new Date(`${currentMonthIDX + 1} 1, ${currentYear}`); 
        let firstDayIDX = firstDayOfMonth.getDay(currentYear, currentMonthIDX + 1);

        //Display appropriate numbers in cells
        let calendarCells = document.querySelectorAll('.calendar-cell');
        if (firstDayIDX >= 1) {

            //  if from monday -> saturday
            for(let i = 1; i <= daysInCurrentMonth; i++ ) {
                calendarCells[firstDayIDX + i - 2].innerHTML = i;
            }  

            // if sunday, create another row with 7 cells
        } else {         
            let calendarRow4 = document.getElementById('calendar-row-4').parentNode
            let calendarRow5 = document.createElement('div');
            calendarRow5.id = "calendar-row-5"
            calendarRow5.classList.add("row", "m-lg-2", "justify-content-center");
            calendarRow4.appendChild(calendarRow5);
            for (i = 0; i < 7 ; i++) {
                let cell = document.createElement('div');
                cell.classList.add ('calendar-cell', 'col', 'col-lg-1', 'border')
                calendarRow5.appendChild(cell);
            }
            calendarCells = document.querySelectorAll('.calendar-cell');
            for(let i = 1; i <= daysInCurrentMonth; i++ ) {
                calendarCells[firstDayIDX + 5 + i].innerHTML = i;
            }    
        };

        // Logic for Previous Month button
        document.querySelector('#previous-month').addEventListener('click', () => {
            calendarCells.forEach((cell) => cell.innerHTML = '');
            document.getElementById('calendar-row-5')?.remove()
            currentMonthIDX = (currentMonthIDX - 1);
            if (currentMonthIDX < 0) {
                currentMonthIDX = 11
                currentYear -= 1
            }

            // Set current month to new current month
            document.querySelector('#current-month').innerHTML = `${months[currentMonthIDX]} ${currentYear}`;

            // Get data about new current month
            daysInCurrentMonth = dayCount(currentYear, currentMonthIDX + 1)
            firstDayOfMonth = new Date(`${currentMonthIDX + 1} 1, ${currentYear}`); 
            firstDayIDX = firstDayOfMonth.getDay(currentYear, currentMonthIDX + 1);

            // Populate cells
            if (firstDayIDX >= 1 && firstDayIDX + daysInCurrentMonth < 37) {
                for(let i = 1; i <= daysInCurrentMonth; i++ ) {
                    calendarCells[firstDayIDX + i - 2].innerHTML = i;
                }  
            } else {
                    let calendarRow4 = document.getElementById('calendar-row-4').parentNode
                    let calendarRow5 = document.createElement('div');
                    calendarRow5.id = "calendar-row-5"
                    calendarRow5.classList.add("row", "m-lg-2", "justify-content-center");
                    calendarRow4.appendChild(calendarRow5);
                    if (firstDayIDX < 1) {
                        for (i = 0; i < 7 ; i++) {
                            let cell = document.createElement('div');
                            cell.classList.add ('calendar-cell', 'col', 'col-lg-1', 'border')
                            calendarRow5.appendChild(cell);
                        }
                        let calendarCells = document.querySelectorAll('.calendar-cell');
                        for(let i = 1; i <= daysInCurrentMonth; i++ ) {
                            calendarCells[firstDayIDX + 5 + i].innerHTML = i;
                        }  
                    } else {
                        for (i = 0; i < 7 ; i++) {
                            let cell = document.createElement('div');
                            cell.classList.add ('calendar-cell', 'col', 'col-lg-1', 'border')
                            calendarRow5.appendChild(cell);
                        }
                        // Get new cell total in case a row was added
                        let calendarCells = document.querySelectorAll('.calendar-cell');
                        for(let i = 1; i <= daysInCurrentMonth; i++ ) {
                            calendarCells[firstDayIDX -2 + i].innerHTML = i;
                        }  
                    } 
                }   
        });


        //Next month button logic
        document.querySelector('#next-month').addEventListener('click', () => {
            calendarCells.forEach((cell) => cell.innerHTML = '');
            document.getElementById('calendar-row-5')?.remove()
            currentMonthIDX = (currentMonthIDX + 1)
            if (currentMonthIDX > 11) {
                currentMonthIDX = 0;
                currentYear += 1;
                console.log("Year switch")
            }

            document.querySelector('#current-month').innerHTML = `${months[currentMonthIDX]} ${currentYear}`;

            daysInCurrentMonth = dayCount(currentYear, currentMonthIDX + 1)
            firstDayOfMonth = new Date(`${currentMonthIDX + 1} 1, ${currentYear}`); 

            firstDayIDX = firstDayOfMonth.getDay(currentYear, currentMonthIDX + 1);
            if (firstDayIDX >= 1 && firstDayIDX + daysInCurrentMonth < 37) {
                for(let i = 1; i <= daysInCurrentMonth; i++ ) {
                    calendarCells[firstDayIDX + i - 2].innerHTML = i;
                }  
            } else {
                let calendarRow4 = document.getElementById('calendar-row-4').parentNode
                let calendarRow5 = document.createElement('div');
                calendarRow5.id = "calendar-row-5"
                calendarRow5.classList.add("row", "m-lg-2", "justify-content-center");
                calendarRow4.appendChild(calendarRow5);
                    
                if (firstDayIDX < 1) {
                    for (i = 0; i < 7 ; i++) {
                        let cell = document.createElement('div');
                        cell.classList.add ('calendar-cell', 'col', 'col-lg-1', 'border')
                        calendarRow5.appendChild(cell);
                    }
                    calendarCells = document.querySelectorAll('.calendar-cell');
                    for(let i = 1; i <= daysInCurrentMonth; i++ ) {
                        calendarCells[firstDayIDX + 5 + i].innerHTML = i;
                    }  
                } else {
                    for (i = 0; i < 7 ; i++) {
                        let cell = document.createElement('div');
                        cell.classList.add ('calendar-cell', 'col', 'col-lg-1', 'border')
                        calendarRow5.appendChild(cell);
                    }
                    calendarCells = document.querySelectorAll('.calendar-cell');
                    for(let i = 1; i <= daysInCurrentMonth; i++ ) {
                        calendarCells[firstDayIDX -2 + i].innerHTML = i;
                    }  
                } 
            }
        });

        calendarCells.forEach(cell => {
            cell.addEventListener('click', () => {
                //if selected day is not in this month, don't mark it.
                if (cell.innerHTML !== '') {
                    console.log('not empty')
                    holidayHours = parseInt(document.getElementById('holidayhours').innerHTML);
                    // If cell is not marked yet, mark it. Else remove mark.
                    if (cell.classList.contains('marked'))
                    {
                        cell.classList.remove('marked')
                        cell.style.background = '';
                        holidayHours += 8
                        document.getElementById('holidayhours').innerHTML = holidayHours;
                    } else {
                        cell.classList.add('marked');
                        holidayHours -= 8;
                        document.getElementById('holidayhours').innerHTML = holidayHours;
                    }
                    if (document.getElementById('holidayhours').innerHTML <= 0) {
                        document.getElementById('holidayhours').style.color = 'red'
                    } else {
                        document.getElementById('holidayhours').style.color = 'blue'
                    }
                }
            })
        });
    


        // Save data about the marked cells
        // When clicking prev or next, remove or add marked property
        // Cache everything?


    }
}); // Close DOMEventlistener

