from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect, HttpResponse
from .forms import HolidayForm

# Create your views here.
def index(request):
    form = HolidayForm()
    return render(request, "holidaycalculator/index.html", {
        'holidayform':form
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
        form = HolidayForm(request.POST)
        if form.is_valid():
            holidayhours = form.cleaned_data['hours']
            return render(request, "holidaycalculator/calendar.html", {
            "rows":ROWS,
            "cols":COLS,
            "days":DAYS,
            "holidayhours":holidayhours
            })
        
        else:
            #Raise validation error?
            return render(request, "holidaycalculator/index.html", {
                        'holidayform':form
            })
    
def setHours(request):
     pass

            
