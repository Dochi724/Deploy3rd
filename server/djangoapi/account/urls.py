from django.urls import path, include
from . import views
from rest_framework import urls

urlpatterns =[
    path('signup/', views.signup),
    path('login/', views.login),
    path('api-auth/', include('rest_framework.urls')),
    path('test/', views.Test.as_view()),
 ]