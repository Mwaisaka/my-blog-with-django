from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('posts/add_post/', views.add_post, name='add_post'),
     path('posts/', views.posts, name='posts'),
]