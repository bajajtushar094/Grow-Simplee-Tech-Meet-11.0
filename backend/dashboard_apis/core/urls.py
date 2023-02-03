from django.urls import path
from . import views
from . import order_view
# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
#     TokenRefreshView,
# )


urlpatterns = [
    # jwt apis
    # path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('token/refresh/', TokenRefreshView.as_view(), name='taken_refresh'),

    # test api
    path('', views.getData.as_view()),

    # product api
    path('product/<str:id>', order_view.order_detail.as_view()),
    path('product/<str:id>', order_view.order_image_update.as_view()),
    path('upload/', views.upload.as_view()),

    path('orders/', order_view.get_all_orders.as_view()),
    # rider api
    path('rider-rewards/', views.rider_rewards.as_view()),
    path('rider-management/', views.getRiderManagementMap.as_view()),
    path('orders/all', views.getOrder.as_view()),
    path('riders/all', views.getRider.as_view()),
    path('bags/all', views.getBags.as_view()),
    path('manager', views.getManager.as_view()),
    path('orders/cancel', views.cancelOrder.as_view()),
    path('orders/add', views.addDynamicPickup.as_view()),
    path('count/riders', views.countRiders.as_view()),
]    

