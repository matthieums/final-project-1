from django import forms

class HolidayForm(forms.Form):
    hours = forms.IntegerField(widget=forms.TextInput, min_value=0, max_value=999)