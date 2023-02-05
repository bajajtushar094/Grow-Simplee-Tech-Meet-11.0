from django.urls import path
from . import views
from . import order_view


urlpatterns = [
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
    path('orders/cancel', views.cancelOrder.as_view()),
    path('orders/add', views.addDynamicPickup.as_view()),
    path('solve_initial/', views.generateInitialSolution.as_view()),
    path('solve/',views.generateSolution.as_view()),
    path('check_task_status/<str:task_id>',views.checkCeleryStatus.as_view()),
    path('get_celery_result/<str:task_id>',views.getResultCelery.as_view())
]    
