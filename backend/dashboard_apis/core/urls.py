from django.urls import path
from . import views
from . import order_view


urlpatterns = [
    # test api
    path('', views.getData),

    # product api
    path('product/<str:id>', order_view.order_detail),
    path('product/<str:id>', order_view.order_image_update),
    path('upload/', views.upload),

    path('order/', views.order),
    # rider api
    path('rider-rewards/', views.rider_rewards)
    path('rider-stats/', views.rider_rewards),
    path('rider-management/', views.getRiderManagementMap)
]    
