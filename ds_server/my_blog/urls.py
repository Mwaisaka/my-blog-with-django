from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('posts/add_post/', views.add_post, name='add_post'),
    path('posts/', views.posts, name='posts'),
    path('posts/add_comment/', views.add_comment, name='add_comment'),
    path('posts/toggle_like/', views.toggle_like, name='toggle_like'),
    path('login/', views.login, name="login"),
    path('subscribe/', views.subscribe, name='subscribe'),
    path('subscribers/', views.view_subscribers, name='subscribers'),
     path('subscribers/delete_subscriber/<int:id>/', views.delete_subscriber, name='delete_subscriber'), 
]