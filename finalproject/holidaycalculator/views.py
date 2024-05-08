from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect, HttpResponse
from .forms import HolidayForm, ShiftForm

# Create your views here.
def index(request):
    holidayform = HolidayForm()
    shiftform = ShiftForm()
    return render(request, "holidaycalculator/index.html", {
        'holidayform':holidayform,
        'shiftform':shiftform
    })

    
def calendar(request):
    ROWS = {x for x in range(5)}
    COLS = {x for x in range(7)}
    DAYS = ['Mon', 'Tu', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    
    if request.method == 'GET':
        return render(request, "holidaycalculator/calendar.html", {
            "rows":ROWS,
            "cols":COLS,
            "days":DAYS,
        })
    
    if request.method == 'POST':
        holidayform = HolidayForm(request.POST)
        shiftform = ShiftForm(request.POST)

        if holidayform.is_valid() and shiftform.is_valid():
            holidayhours = holidayform.cleaned_data['hours']
            shiftlength = shiftform.cleaned_data['shiftlength']
            return render(request, "holidaycalculator/calendar.html", {
            "rows":ROWS,
            "cols":COLS,
            "days":DAYS,
            "holidayhours":holidayhours,
            "shiftlength":shiftlength
            })
        
        else:
            #Raise validation error?
            return render(request, "holidaycalculator/index.html", {
                        'holidayform':holidayform,
                        'shiftform':shiftform
            })
        

            
