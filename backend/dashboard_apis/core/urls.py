from django.urls import path
from . import views
from . import order_view
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    # jwt apis
    # path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('token/refresh/', TokenRefreshView.as_view(), name='taken_refresh'),

    # test api

    # auth api
    path('auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # product api
    path('product/<str:id>', order_view.order_detail.as_view()),
    path('product/<str:id>', order_view.order_image_update.as_view()),
    # path('upload/', views.upload.as_view()),
    # path('images/', views.imageView.as_view()),
    # path('uploadimages/', views.uploadImages.as_view()),

    path('orders/', order_view.get_all_orders.as_view()),

    # rider api
    # path('rider-rewards/', views.rider_rewards.as_view()),
    path('rider-management/', views.getRiderManagementMap.as_view()),
    path('orders/all', views.getOrders.as_view()),
    path('orders/json/<str:folder>', views.getFolder.as_view()),
    path('riders/all', views.getRiders.as_view()),
    path('orders/rider/<str:id>', views.getRiderOrders.as_view()),
    path('rider/<str:id>', views.getRiderById.as_view()),
    path('trip/<str:id>', views.getTripById.as_view()),
    path('orders/update/', views.updateOrder.as_view()),
    path('trips/update/', views.updateTrip.as_view()),
    path('bags/all', views.getBags.as_view()),
    path('manager', views.getManager.as_view()),
    path('orders/cancel', views.cancelOrder.as_view()),
    path('orders/upcoming', views.getUpcomingCount.as_view()),
    path('orders/add', views.addDynamicPickup.as_view()),
    path('count/riders', views.countRiders.as_view()),
    # To solve the first instance of VRP
    path('solve/', views.generateInitialSolution.as_view()),
    path('bin-packing/<str:id>', views.binPacking.as_view()),


    path('orders/add', views.addDynamicPickup.as_view()),
    path('solve_initial/', views.generateInitialSolution.as_view()),
    path('solve/',views.generateRerouteSolution.as_view()),
    path('check_task_status/<str:task_id>',views.checkCeleryStatus.as_view()),
    path('get_celery_result/<str:task_id>',views.getResultCelery.as_view()),

    # To solve the first instance of VRP
    path('populate/', views.populateData.as_view()),


    # task1 APIs
    path('start-process/', views.startButton.as_view()),
    path('bin-packing/<str:id>', views.binPacking.as_view()),

    path('geocode/', views.getGeoCode.as_view()),
    path('demo/', views.demo.as_view()),
    path('locations/rider', views.getRiderLocations.as_view()),

    #pagination urls
    path('pagination/rider/<int:limit>/<int:offset>', views.getRidersPaginate.as_view()),
    path('pagination/order/<int:limit>/<int:offset>', views.getOrdersPaginate.as_view()),
]