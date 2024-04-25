from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, "holidaycalculator/index.html")

def calendar(request):
    return render(request, "holidaycalculator/calendar.html")