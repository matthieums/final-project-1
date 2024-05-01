document.addEventListener('DOMContentLoaded', function () {
    
    const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"]
    const currentDate = new Date();
    const calendarCells = document.querySelectorAll('.calendar-cell');
    const dayCount = (year, month) => new Date(year, month, 0).getDate();

     // Display current month above calendar:
    let currentMonthIDX = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    let daysInCurrentMonth = dayCount(currentYear, currentMonthIDX + 1); //+1 to get the IRL month number

    document.querySelector('#current-month').innerHTML = `${months[currentMonthIDX]} ${currentYear}`;

    let firstDayOfMonth = new Date(`${currentMonthIDX + 1} 1, ${currentYear}`); // Create date for the next function
    let firstDayIDX = firstDayOfMonth.getDay(currentYear, currentMonthIDX + 1); // returns the weekday index (0 = sunday)

    if (firstDayIDX >= 1) {
        //  1 up to daysincurrentmonth starting from cell 1 - 6 (MON - SAT)
        for(let i = 1; i <= daysInCurrentMonth; i++ ) {
            calendarCells[firstDayIDX + i - 2].innerHTML = i;
        }  
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
        let totalCells = document.querySelectorAll('.calendar-cell');
        for(let i = 1; i <= daysInCurrentMonth; i++ ) {
            totalCells[firstDayIDX + 5 + i].innerHTML = i;
        }    
    };

    document.querySelector('#previous-month').addEventListener('click', () => {
        calendarCells.forEach((cell) => cell.innerHTML = '');
        document.getElementById('calendar-row-5')?.remove()
        currentMonthIDX = (currentMonthIDX - 1);
        if (currentMonthIDX < 0) {
            currentMonthIDX = 11
            currentYear -= 1
            console.log("Year switch")
        }

        document.querySelector('#current-month').innerHTML = `${months[currentMonthIDX]} ${currentYear}`;
        daysInCurrentMonth = dayCount(currentYear, currentMonthIDX + 1)
        firstDayOfMonth = new Date(`${currentMonthIDX + 1} 1, ${currentYear}`); 

        firstDayIDX = firstDayOfMonth.getDay(currentYear, currentMonthIDX + 1);
        if (firstDayIDX >= 1 && firstDayIDX + daysInCurrentMonth < 37) {
            //  1 up to daysincurrentmonth starting from cell 1 - 6 (MON - SAT)
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
                    let totalCells = document.querySelectorAll('.calendar-cell');
                    for(let i = 1; i <= daysInCurrentMonth; i++ ) {
                        totalCells[firstDayIDX + 5 + i].innerHTML = i;
                    }  
                } else {
                    for (i = 0; i < 7 ; i++) {
                        let cell = document.createElement('div');
                        cell.classList.add ('calendar-cell', 'col', 'col-lg-1', 'border')
                        calendarRow5.appendChild(cell);
                    }
                    let totalCells = document.querySelectorAll('.calendar-cell');
                    for(let i = 1; i <= daysInCurrentMonth; i++ ) {
                        totalCells[firstDayIDX -2 + i].innerHTML = i;
                    }  
                } 
            }   
    });



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
            //  1 up to daysincurrentmonth starting from cell 1 - 6 (MON - SAT)
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
                    let totalCells = document.querySelectorAll('.calendar-cell');
                    for(let i = 1; i <= daysInCurrentMonth; i++ ) {
                        totalCells[firstDayIDX + 5 + i].innerHTML = i;
                    }  
                } else {
                    for (i = 0; i < 7 ; i++) {
                        let cell = document.createElement('div');
                        cell.classList.add ('calendar-cell', 'col', 'col-lg-1', 'border')
                        calendarRow5.appendChild(cell);
                    }
                    let totalCells = document.querySelectorAll('.calendar-cell');
                    for(let i = 1; i <= daysInCurrentMonth; i++ ) {
                        totalCells[firstDayIDX -2 + i].innerHTML = i;
                    }  
                } 
            }   
        });

    });

