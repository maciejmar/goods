from django.urls import path
from . import views
urlpatterns = [
    path('', views.index, name='index'),
    path('add_user/', views.add_user,name='add_user'),
    path('get_all_users/', views.get_all_users, name='get_all_users'),
]