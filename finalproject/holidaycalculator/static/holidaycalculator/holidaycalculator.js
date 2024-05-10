// MAIN FUNCTION
document.addEventListener('DOMContentLoaded', function () {

    sessionStorage.clear()

    // Only display the calendar when everything has loaded to avoid flickering
    window.onload = function() {
        document.getElementById('calendar-container').classList.remove('d-none')
    }

    if (document.getElementById('calendar-container')) {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"];
        const allCalendarCells = document.querySelectorAll('.calendar-cell');
        const currentMonthDisplay = document.querySelector('#current-month');
        const optionalRow = document.getElementById('calendar-row-5');

        // Gather the form's data
        const holidayHoursElement = document.getElementById('holidayhours');
        const shiftLength = formatShiftLength(document.getElementById('shift-length').innerHTML);

        //Gather data about today's date
        const today = new Date();
        let currentMonthIDX = today.getMonth();
        let currentYear = today.getFullYear();
   

        // Event listeners for each cell
        setEventListeners(allCalendarCells, shiftLength)     

        // variable that contains the functions to properly display the current month 
        const initializeCurrentMonthView = () => {
            // Display current month above calendar:
            displayCurrentMonth(currentMonthDisplay, monthNames, currentMonthIDX, currentYear)

            // Get first day of given month and the index associated with the day (sunday = 0)
            let [daysInCurrentMonth, firstDayIDX] = getDataOnNewCurrentMonth(currentYear, currentMonthIDX)

            // Set each cell's attribute to current month and year
            setCellData(allCalendarCells, currentYear, currentMonthIDX)

            // Populate calendar
            populateCells(allCalendarCells, firstDayIDX, daysInCurrentMonth, optionalRow)

            //At the moment, data is reset each time I refresh the page
            // Check if there was a previous session
            
            checksessionStorage(allCalendarCells, holidayHoursElement, currentYear, currentMonthIDX)

            // Apply visuals to weekend and empty cells
            darkenWeekendAndEmptyCells (allCalendarCells)
        }

        initializeCurrentMonthView()
        
        // Reset button logic
        const resetButton = document.getElementById('reset')
        resetButton.addEventListener('click', () => {
            location.reload()
            sessionStorage.clear()
        })

        // Previous and next buttons logic
        document.querySelectorAll('.month-switch-button').forEach(button => {
            button.addEventListener('click', function() {
            if (this.id === 'previous-month') {
                currentMonthIDX -= 1 ;
                if (currentMonthIDX < 0) {
                    currentMonthIDX = 11
                    currentYear -= 1
                } 
            } else if (this.id === 'next-month') {
                currentMonthIDX += 1
                if (currentMonthIDX > 11) {
                    currentMonthIDX = 0;
                    currentYear += 1;
                }
            }

            // Reset cell backgrounds and classes
            resetCalendar(allCalendarCells)
            initializeCurrentMonthView()
            });
        })

    } // Close calendar-container logic
}); // Close DOMEventlistener


// SECONDARY FUNCTION
// Function to add event listeners to the cells
function setEventListeners(cells, shiftLength) { 
    cells.forEach((cell, index) => {
        const clickHandler = () => handleClick(cell, index, shiftLength);
        cell.addEventListener('click', clickHandler);
    })
}

// Click event handler
function handleClick(cell, index, shiftLength) {
    if (cell.innerHTML) {
        let combinedValue = cell.getAttribute('data-custom');
        let [year, month] = combinedValue.split(',');
        let key = keyGen(year, month, index);

        let remainingHours = parseFloat(document.getElementById('holidayhours').innerHTML)
        remainingHours = parseFloat(remainingHours.toFixed(1))

    // If cell is not marked yet, mark it. Else remove mark.
        if (cell.classList.contains('marked')) {
            cell.classList.remove('marked', 'subzero')
            remainingHours += shiftLength;
            remainingHours = remainingHours.toFixed(1)
            document.getElementById('holidayhours').innerHTML = remainingHours;
            
            //Delete from local storage
            sessionStorage.setItem('holidayHours', remainingHours)
            sessionStorage.removeItem(key)

        } else {
            cell.classList.add('marked');
            remainingHours -= shiftLength;
            remainingHours = remainingHours.toFixed(1)
            document.getElementById('holidayhours').innerHTML = remainingHours;

            //Add to local storage
            sessionStorage.setItem('holidayHours', remainingHours)
            sessionStorage.setItem(key, index);
        }
        
        // Visuals for the remaining number of hours and marked cells
        let markedCells = document.querySelectorAll('.calendar-cell.marked')
        if (document.getElementById('holidayhours').innerHTML < 0) {
            document.getElementById('holidayhours').classList.add('subzero')
            markedCells.forEach(cell => {
                cell.classList.add('subzero')
            })
        } else {
            document.getElementById('holidayhours').classList.remove('subzero')
            markedCells.forEach(cell => {
                cell.classList.remove('subzero')
            })
        }
    }
}
     
function keyGen(year, month, index) {
    return `_${year}_${month}_${index}`;
}
 
function checksessionStorage(cells, holidayHoursElement, currentYear, currentMonthIDX) {
    let holidayHours = getHolidayHours(holidayHoursElement)
    cells.forEach((cell, index) => {
        let key = keyGen(currentYear, currentMonthIDX, index)
        if(sessionStorage.getItem(key)) {
            cell.classList.add('marked')
            
            // Check if holiday hours is < 0, then all marked cells should be displayed in red.
            if (holidayHours < 0) {
                cell.classList.add('subzero');
            } 
        };
    })
}  

function darkenWeekendAndEmptyCells (cells) {
    const weekend = [5, 6, 12, 13, 19, 20, 26, 27, 33, 34, 40, 41]
    cells.forEach((cell, index) => {
        if (!cell.innerHTML) {
            cell.classList.add('empty')
        } else {
            cell.classList.remove('empty')
            
        }
        if (weekend.includes(index)) {
            cell.classList.add('weekend')
        } else {
            cell.classList.remove('weekend')
        }
    })
}

function resetCalendar (cells) {
    cells.forEach(cell => {
        cell.innerHTML = ''
        cell.classList.remove('marked', 'subzero')
    })
}

function setCellData(cells, year, monthIDX) {
    let YearAndMonth = year + ',' + monthIDX;
    cells.forEach(cell => {
    cell.setAttribute('data-custom', YearAndMonth);
    })
}

function populateCells(cells, firstDayIDX, daysInCurrentMonth, optionalRow) {
    if (firstDayIDX >= 1 && firstDayIDX + daysInCurrentMonth < 37) {
        for(let i = 1; i <= daysInCurrentMonth; i++ ) {
            cells[firstDayIDX + i - 2].innerHTML = i;
        }  
        optionalRow.classList.add('d-none')
    } else {
        optionalRow.classList.remove('d-none')
        optionalRow.classList.add('d-flex')
        if (firstDayIDX < 1) {
            for(let i = 1; i <= daysInCurrentMonth; i++ ) {
                cells[firstDayIDX + 5 + i].innerHTML = i;
            }  
        } else {
            for(let i = 1; i <= daysInCurrentMonth; i++ ) {
                cells[firstDayIDX -2 + i].innerHTML = i;
            }  
        } 
    }
}

function getHolidayHours (element) {
    let holidayHours =  parseFloat(element.innerHTML)
    holidayHours = holidayHours.toFixed(1)
    return holidayHours
}

function formatShiftLength (element) {
    element = parseFloat(element)
    return element
}

function displayCurrentMonth(element, monthNames, currentMonthIDX, currentYear) {
    element.innerHTML = `${monthNames[currentMonthIDX]} ${currentYear}`;
}

function getDataOnNewCurrentMonth(currentYear, currentMonthIDX) {
    const dayCount = (year, month) => new Date(year, month, 0).getDate();
    let daysInCurrentMonth = dayCount(currentYear, currentMonthIDX + 1)
    let firstDayOfMonth = new Date(`${currentMonthIDX + 1} 1, ${currentYear}`); 
    let firstDayIDX = firstDayOfMonth.getDay(currentYear, currentMonthIDX + 1);
    return [daysInCurrentMonth, firstDayIDX ]
}