from django.urls import path
from . import views
urlpatterns = [
    path('', views.index, name='index'),
    path('add_user/', views.add_user,name='add_user'),
    path('get_all_users/', views.get_all_users, name='get_all_users'),
    path('delete_user/<str:user_id>/', views.delete_user, name='delete_user'),
    path('get_user/<str:user_id>/', views.get_user, name='get_user')
]