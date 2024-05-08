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
        key = keyGen(year, month, index);

        remainingHours = parseFloat(document.getElementById('holidayhours').innerHTML)
        remainingHours = parseFloat(remainingHours.toFixed(1))

    // If cell is not marked yet, mark it. Else remove mark.
        if (cell.classList.contains('marked')) {
            cell.classList.remove('marked')
            cell.style.backgroundColor = '';
            remainingHours += shiftLength;
            remainingHours = remainingHours.toFixed(1)
            document.getElementById('holidayhours').innerHTML = remainingHours;
            
            //Delete from local storage
            localStorage.setItem('holidayHours', remainingHours)
            localStorage.removeItem(key)

        } else {
            cell.classList.add('marked');
            cell.style.backgroundColor = 'blue'
            remainingHours -= shiftLength;
            remainingHours = remainingHours.toFixed(1)
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


function keyGen(year, month, index) {
    return `_${year}_${month}_${index}`;
}
 
function checkLocalStorage(cells, hours, currentYear, currentMonthIDX) {
    cells.forEach((cell, index) => {
        let key = keyGen(currentYear, currentMonthIDX, index)
        if(localStorage.getItem(key)) {
            cell.classList.add('marked')
            
            // Check if holiday hours is < 0, then all marked cells should be displayed in red.
            if (hours < 0) {
                cell.style.backgroundColor = 'red';
            } else {
                    cell.style.backgroundColor = 'blue'
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

function resetCalendar (calendarCells) {
    calendarCells.forEach(cell => {
        cell.innerHTML = ''
        cell.classList.remove('marked')
        cell.style.backgroundColor = ''
    })
}

function setCellData(calendarCells, YearAndMonth) {
    calendarCells.forEach(cell => {
    cell.setAttribute('data-custom', YearAndMonth);
    })
}

function populateCells(calendarCells, firstDayIDX, daysInCurrentMonth, additionalRow) {
    if (firstDayIDX >= 1 && firstDayIDX + daysInCurrentMonth < 37) {
        for(let i = 1; i <= daysInCurrentMonth; i++ ) {
            calendarCells[firstDayIDX + i - 2].innerHTML = i;
        }  
        additionalRow.classList.add('d-none')
    } else {
        additionalRow.classList.remove('d-none')
        additionalRow.classList.add('d-flex')
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
}

function getHolidayHours (element) {
    let holidayHours =  parseFloat(element)
    holidayHours = holidayHours.toFixed(1)
    return holidayHours
}

function formatShiftLength (element) {
    element = parseFloat(element)
    return element
}

function displayCurrentMonth(element, months, currentMonthIDX, currentYear) {
    element = `${months[currentMonthIDX]} ${currentYear}`;
    return element
}

function getDataOnNewCurrentMonth(currentYear, currentMonthIDX) {
    const dayCount = (year, month) => new Date(year, month, 0).getDate();
    let daysInCurrentMonth = dayCount(currentYear, currentMonthIDX + 1)
    let firstDayOfMonth = new Date(`${currentMonthIDX + 1} 1, ${currentYear}`); 
    let firstDayIDX = firstDayOfMonth.getDay(currentYear, currentMonthIDX + 1);
    return [daysInCurrentMonth, firstDayIDX ]
}

export {
    setEventListeners,
    handleClick,
    keyGen,
    checkLocalStorage,
    darkenWeekendAndEmptyCells,
    resetCalendar,
    setCellData,
    populateCells,
    getHolidayHours,
    formatShiftLength,
    displayCurrentMonth,
    getDataOnNewCurrentMonth
};