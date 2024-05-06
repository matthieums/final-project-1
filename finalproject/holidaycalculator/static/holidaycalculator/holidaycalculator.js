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
            localStorage.setItem('holidayHours', remainingHours)
            localStorage.removeItem(key)

        } else {
            cell.classList.add('marked');
            cell.style.backgroundColor = 'blue'
            remainingHours -= 8;
            document.getElementById('holidayhours').innerHTML = remainingHours;

            //Add to local storage
            localStorage.setItem('holidayHours', remainingHours)
            localStorage.setItem(key, index);
        }
        
        // Visuals for the remaining number of hours and marked cells
        let markedCells = document.querySelectorAll('.calendar-cell.marked')
        if (document.getElementById('holidayhours').innerHTML < 0) {
            document.getElementById('holidayhours').style.color = 'red'

            markedCells.forEach(cell => {
                cell.style.backgroundColor = 'red'
            })
        } else {
            document.getElementById('holidayhours').style.color = 'blue'
            markedCells.forEach(cell => {
                cell.style.backgroundColor = ''
            })
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
 
function checklocalStorage(cell, key) {
    if(localStorage.getItem(key)) {
        cell.classList.add('marked')
        cell.backgroundColor = 'blue'
    }
}

function darkenEmptyCells (cells) {
    const weekend = [5, 6, 12, 13, 19, 20, 26, 27, 33, 34, 41, 42]
    cells.forEach((cell, index) => {
        if (!cell.innerHTML) {
            cell.classList.add('empty')
        } else {
            cell.classList.remove('empty')
            if (weekend.includes(index)) {
                cell.classList.add('weekend')
            } else {
                cell.classList.remove('weekend')
            }
        }
    })
}



document.addEventListener('DOMContentLoaded', function () {

    // clear previous session
    localStorage.clear()

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

        localStorage.setItem('holidayHoursOriginal', document.getElementById('holidayhours').innerHTML)
        
        if (localStorage.getItem('holidayHours')) {
            localStorage.setItem('holidayHours', document.getElementById('holidayhours').innerHTML)
            holidayHours = parseInt(localStorage.getItem('holidayHours'))
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
        checklocalStorage(cell, key)
        darkenEmptyCells (calendarCells)
        })

        setEventListeners(calendarCells, currentYear, currentMonthIDX)

        // Reset button logic
        resetButton = document.getElementById('reset')
        resetButton.addEventListener('click', () => {
            location.reload()

            // localStorage.clear()
        })


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
                checklocalStorage(cell, key) 
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
            darkenEmptyCells(calendarCells)

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
                checklocalStorage(cell, key) 
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
            darkenEmptyCells(calendarCells)

        });

    } // Close calendar-container logic
    
}); // Close DOMEventlistener
     
