from django import forms

class OrderForm(forms.Form):
    # rider = forms.ForeignKey(Rider)
    order_name = forms.CharField(max_length=500)
    shape = forms.CharField(max_length=50)
    volume = forms.CharField(max_length=50)
    length = forms.CharField(max_length=50)
    width = forms.CharField(max_length=50)
    height = forms.CharField(max_length=50)
    sku = forms.CharField(max_length=50)
    address_id = forms.CharField(max_length=500)
    # delivery_action = forms.CharField(
    #     _("delivery action"), max_length=50, choices=DELIVERY_ACTION, 
    # )
    # order_status = forms.CharField(
    #     _("order status"), max_length=50, choices=ORDER_STATUS, 
    # )
    # edd = forms.DateField(_("EDD date"), , null=True)
    # owner = forms.ForeignKey(Owner, , null=True)
    image = forms.FileField()

class RiderRewardsForm(forms.Form):
    rider_id = forms.CharField(max_length=100, label='Id')
    rider_name = forms.CharField(max_length=100, label='Name')
    successful_deliveries = forms.IntegerField(label='Successful Deliveries')
    earnings = forms.IntegerField(label='Earnings')