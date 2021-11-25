from django.urls import path, include
from . import views
from rest_framework import urls
from django.conf.urls.static import static
from django.conf import settings
urlpatterns =[
    path('signup/', views.signup),
    path('login/', views.login),
    path('api-auth/', include('rest_framework.urls')),
    path('test/', views.Test.as_view()),
 ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)