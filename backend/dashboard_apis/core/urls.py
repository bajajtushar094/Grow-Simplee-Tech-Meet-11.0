from django.urls import path
from . import views
from . import order_view
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    # test api

    # auth api
    path('auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # product api
    path('product/<str:id>', order_view.order_detail.as_view()),
    path('product/<str:id>', order_view.order_image_update.as_view()),
    path('upload/', views.upload.as_view()),
    # path('images/', views.imageView.as_view()),
    path('uploadimages/', views.uploadImages.as_view()),

    path('orders/', order_view.get_all_orders.as_view()),

    # rider api
    path('rider-rewards/', views.rider_rewards.as_view()),
    path('rider-management/', views.getRiderManagementMap.as_view()),
    path('orders/all', views.getOrder.as_view()),

    path('riders/all', views.getRiders.as_view()),
    path('orders/rider/<str:id>', views.getRiderOrders.as_view()),
    path('rider/<str:id>', views.getRiderById.as_view()),
    path('bags/all', views.getBags.as_view()),
    path('orders/cancel', views.cancelOrder.as_view()),

    path('orders/add', views.addDynamicPickup.as_view()),

    # To solve the first instance of VRP
    path('solve/', views.generateSolution.as_view()),
    path('populate/', views.populateData.as_view()),


    # task1 APIs
    path('start-process/', views.startButton.as_view()),
    path('bin-packing/<str:id>', views.binPacking.as_view()),

    path('geocode/', views.getGeoCode.as_view())
]
