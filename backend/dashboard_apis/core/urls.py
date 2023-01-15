from django.urls import path
from . import views
from . import order_view


urlpatterns = [
    # test api
    path('', views.getData),

    # product api
    path('product/<str:id>', order_view.order_detail),
    path('product/<str:id>', order_view.order_image_process),
    path('upload/', views.upload),
]    
