from django.urls import path
from . import views
from . import order_view


urlpatterns = [
    #test api
    path('',views.getData),

    #product api
    path('product/<str:id>',order_view.order_detail)
]
