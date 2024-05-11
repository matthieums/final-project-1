from django import forms

class HolidayForm(forms.Form):
    hours = forms.IntegerField(label=False,
                               widget=forms.TextInput(attrs={
                                   'autocomplete': 'off',
                                    'placeholder':'80',
                                    'autofocus':'on'}),
                                min_value=1,
                                max_value=999)

class ShiftForm(forms.Form):
    shiftlength = forms.DecimalField(label=False,
                                     widget=forms.TextInput(attrs={
                                        'autocomplete': 'off',
                                        'placeholder':'7.5'}),
                                    min_value=1,
                                    max_digits=3,
                                    decimal_places=1)