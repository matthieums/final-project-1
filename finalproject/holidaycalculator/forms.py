from django import forms

class HolidayForm(forms.Form):
    hours = forms.IntegerField(label=False, widget=forms.TextInput(attrs={'autocomplete': 'off', 'placeholder':'0'}), min_value=0, max_value=999)

class ShiftForm(forms.Form):
    shiftlength = forms.DecimalField(label=False, widget=forms.TextInput(attrs={'autocomplete': 'off', 'placeholder':'0.0'}), max_digits=2, decimal_places=1)