// Click event handler
function handleClick(cell, index) {
    console.log("clickHandler was called")

    if (cell.innerHTML) {
        let combinedValue = cell.getAttribute('data-custom');
        let [year, month] = combinedValue.split(',');
        key = keyGen(year, month, index);
        console.log(key)

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
            console.log("key removed")

        } else {
            cell.classList.add('marked');
            cell.style.backgroundColor = 'blue'
            remainingHours -= 8;
            document.getElementById('holidayhours').innerHTML = remainingHours;

            //Add to local storage
            localStorage.setItem('holidayHours', remainingHours)
            localStorage.setItem(key, index);
            console.log('key added')
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
    // if values already stored locally for the current month, apply visuals
    
    cells.forEach((cell, index) => {
        const clickHandler = () => handleClick(cell, index);
        cell.addEventListener('click', clickHandler);
    })
}

function keyGen(year, month, index) {
    return `_${year}_${month}_${index}`;
}
 
function checkLocalStorage(cell, key) {
    
    if(localStorage.getItem(key)) {
        cell.classList.add('marked')
        cell.backgroundColor = 'blue'
}
}
  



document.addEventListener('DOMContentLoaded', function () {
    
    if (document.getElementById('calendar-container')) {
        
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

        // Remaining hours display if local storage
        if (localStorage.getItem('holidayHours')) {
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
        }

        calendarCells.forEach((cell, index) => {
        key = keyGen(currentYear, currentMonthIDX, index)
        checkLocalStorage(cell, key)
        })
        setEventListeners(calendarCells, currentYear, currentMonthIDX)





        // Previous month button logic
        document.querySelector('#previous-month').addEventListener('click', () => {

            document.getElementById('calendar-row-5')?.remove();

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
                checkLocalStorage(cell, key) 
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
                    let calendarRow4 = document.getElementById('calendar-row-4').parentNode
                    let calendarRow5 = document.createElement('div');
                    calendarRow5.id = "calendar-row-5"
                    calendarRow5.classList.add("row", "m-lg-2", "justify-content-center");
                    calendarRow4.appendChild(calendarRow5);


                    if (firstDayIDX < 1) {
                        for (i = 0; i < 7 ; i++) {
                            let newCell = document.createElement('div');
                            newCell.classList.add ('calendar-cell', 'col', 'col-lg-1', 'border')
                            calendarRow5.appendChild(newcell);
                        }
                        let calendarCells = document.querySelectorAll('.calendar-cell');
                        for(let i = 1; i <= daysInCurrentMonth; i++ ) {
                            calendarCells[firstDayIDX + 5 + i].innerHTML = i;
                        }  

                    } else {
                        for (i = 0; i < 7 ; i++) {
                            let newCell = document.createElement('div');
                            newCell.classList.add ('calendar-cell', 'col', 'col-lg-1', 'border')
                            calendarRow5.appendChild(newCell);
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
           
            document.getElementById('calendar-row-5')?.remove()
            
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
                checkLocalStorage(cell, key) 
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

    } // Close calendar-container logic
    
}); // Close DOMEventlistener
     
