// Click event handler
function handleClick(cell, index) {

    if (cell.innerHTML) {
        let combinedValue = cell.getAttribute('data-custom');
        let [year, month] = combinedValue.split(',');
        key = keyGen(year, month, index);

        holidayHours = document.getElementById('holidayhours').innerHTML
        remainingHours = parseInt(holidayHours)

    // If cell is not marked yet, mark it. Else remove mark.
        if (cell.classList.contains('marked')) {
            cell.classList.remove('marked')
            cell.style.backgroundColor = '';
            remainingHours += 8;
            document.getElementById('holidayhours').innerHTML = remainingHours;
            
            //Delete from local storage
            sessionStorage.setItem('holidayHours', remainingHours)
            sessionStorage.removeItem(key)

        } else {
            cell.classList.add('marked');
            cell.style.backgroundColor = 'blue'
            remainingHours -= 8;
            document.getElementById('holidayhours').innerHTML = remainingHours;

            //Add to local storage
            sessionStorage.setItem('holidayHours', remainingHours)
            sessionStorage.setItem(key, index);
        }


        // Visuals for the remaining number of hours
        if (document.getElementById('holidayhours').innerHTML <= 0) {
            document.getElementById('holidayhours').style.color = 'red'
        } else {
            document.getElementById('holidayhours').style.color = 'blue'
        }
    }
}

function setEventListeners(cells) { 
    cells.forEach((cell, index) => {
        const clickHandler = () => handleClick(cell, index);
        cell.addEventListener('click', clickHandler);
    })
}

function keyGen(year, month, index) {
    return `_${year}_${month}_${index}`;
}
 
function checksessionStorage(cell, key) {
    if(sessionStorage.getItem(key)) {
        cell.classList.add('marked')
        cell.backgroundColor = 'blue'
    }
}



document.addEventListener('DOMContentLoaded', function () {

    // clear previous session
    sessionStorage.clear()

    if (document.getElementById('calendar-container')) {
        const additionalRow = document.getElementById('calendar-row-5')
        additionalRow.style.display = 'none'
        
        // Get data to populate calendar and set each cells' value
        const months = ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"]
        const dayCount = (year, month) => new Date(year, month, 0).getDate();

        //Gather data about today's date
        const today = new Date();
        let currentMonthIDX = today.getMonth();
        let currentYear = today.getFullYear();
        let daysInCurrentMonth = dayCount(currentYear, currentMonthIDX + 1);

        // Display current month above calendar:
        let currentMonthElement = document.querySelector('#current-month');
        currentMonthElement.innerHTML = `${months[currentMonthIDX]} ${currentYear}`;

        sessionStorage.setItem('holidayhours', document.getElementById('holidayhours').innerHTML)
        
        // WHAT SHOULD BE DISPLAYED? HOW TO HANDLE THE DATA WHEN USER
        // COMES FROM POST REQUEST OR GET REQUEST?
        if (sessionStorage.getItem('holidayHours')) {
            sessionStorage.setItem('holidayHours', document.getElementById('holidayhours').innerHTML)
            holidayHours = parseInt(sessionStorage.getItem('holidayHours'))
            document.getElementById('holidayhours').innerHTML = holidayHours;
        }
    
        // Get first day of given month and the index associated with the day (sunday = 0)
        let firstDayOfMonth = new Date(`${currentMonthIDX + 1} 1, ${currentYear}`); 
        let firstDayIDX = firstDayOfMonth.getDay(currentYear, currentMonthIDX + 1);

        //Display appropriate numbers in cells
        const calendarCells = document.querySelectorAll('.calendar-cell');

        // Set each cell's attribute to current month and year
        calendarCells.forEach(cell => {
            let YearAndMonth = currentYear + ',' + currentMonthIDX;
            cell.setAttribute('data-custom', YearAndMonth);
        })

        // Populate calendar
        if (firstDayIDX >= 1) {
            additionalRow.style.display = 'none'
            //  if from monday -> saturday
            for(let i = 1; i <= daysInCurrentMonth; i++ ) {
                calendarCells[firstDayIDX + i - 2].innerHTML = i;
            }  

            // if sunday, create another row with 7 cells
        } else {         
            additionalRow.style.display = 'flex';

            for(let i = 1; i <= daysInCurrentMonth; i++ ) {
                calendarCells[firstDayIDX + 5 + i].innerHTML = i;
            }   
        }

        // Check if there was a previous session
        calendarCells.forEach((cell, index) => {
        key = keyGen(currentYear, currentMonthIDX, index)
        checksessionStorage(cell, key)
        })

        setEventListeners(calendarCells, currentYear, currentMonthIDX)





        // Previous month button logic
        document.querySelector('#previous-month').addEventListener('click', () => {

            additionalRow.style.display = 'none';

            currentMonthIDX = currentMonthIDX - 1 ;
            if (currentMonthIDX < 0) {
                currentMonthIDX = 11
                currentYear -= 1
            } 

            // Set each cell's attribute to current month and year
            calendarCells.forEach((cell, index) => {
                cell.innerHTML = ''
                cell.classList.remove('marked')
                cell.style.backgroundColor = ''
                let YearAndMonth = currentYear + ',' + currentMonthIDX;
                cell.setAttribute('data-custom', YearAndMonth);
                key = keyGen(currentYear, currentMonthIDX, index)
                checksessionStorage(cell, key) 
            })
            
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
                additionalRow.style.display = 'flex';
                    
                if (firstDayIDX < 1) {
                    for(let i = 1; i <= daysInCurrentMonth; i++ ) {
                        calendarCells[firstDayIDX + 5 + i].innerHTML = i;
                    }  
                } else {
                    for(let i = 1; i <= daysInCurrentMonth; i++ ) {
                        calendarCells[firstDayIDX -2 + i].innerHTML = i;
                    }  
                } 
            }
        });






        //Next month button logic
        document.querySelector('#next-month').addEventListener('click', () => {
            additionalRow.style.display = 'none';
            currentMonthIDX += 1

            if (currentMonthIDX > 11) {
                currentMonthIDX = 0;
                currentYear += 1;
            }

            calendarCells.forEach((cell, index) => {
                cell.innerHTML = ''
                cell.classList.remove('marked')
                cell.style.backgroundColor = ''
                let YearAndMonth = currentYear + ',' + currentMonthIDX;
                cell.setAttribute('data-custom', YearAndMonth);
                let key = keyGen(currentYear, currentMonthIDX, index)
                checksessionStorage(cell, key) 
            })

            document.querySelector('#current-month').innerHTML = `${months[currentMonthIDX]} ${currentYear}`;

            daysInCurrentMonth = dayCount(currentYear, currentMonthIDX + 1)
            firstDayOfMonth = new Date(`${currentMonthIDX + 1} 1, ${currentYear}`); 

            firstDayIDX = firstDayOfMonth.getDay(currentYear, currentMonthIDX + 1);
            if (firstDayIDX >= 1 && firstDayIDX + daysInCurrentMonth < 37) {
                for(let i = 1; i <= daysInCurrentMonth; i++ ) {
                    calendarCells[firstDayIDX + i - 2].innerHTML = i;
                }  
            } else {
                additionalRow.style.display = 'flex';
                    
                if (firstDayIDX < 1) {
                    for(let i = 1; i <= daysInCurrentMonth; i++ ) {
                        calendarCells[firstDayIDX + 5 + i].innerHTML = i;
                    }  
                } else {
                    for(let i = 1; i <= daysInCurrentMonth; i++ ) {
                        calendarCells[firstDayIDX -2 + i].innerHTML = i;
                    }  
                } 
            }
        });

    } // Close calendar-container logic
    
}); // Close DOMEventlistener
     
