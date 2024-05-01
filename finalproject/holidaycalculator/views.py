from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, "holidaycalculator/index.html")

def calendar(request):
    ROWS = {x for x in range(5)}
    COLS = {x for x in range(7)}
    DAYS = ['Mon', 'Tu', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    return render(request, "holidaycalculator/calendar.html", {
        "rows":ROWS,
        "cols":COLS,
        "days":DAYS,
    })