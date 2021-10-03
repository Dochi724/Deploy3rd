from django.urls import path, include
from . import views
from rest_framework import urls

from rest_framework.routers import DefaultRouter
from . import views

urlpatterns =[
path('/', views.article_list),
path('/<int:article_pk>/', views.article_detail),
path('comment/', views.comment_list),
path('comment/<int:comment_pk>', views.comment_detail),
path('<int:comment_pk>/comments/', views.comment_create),

]

router = DefaultRouter()
router.register('posts', views.PostViewSet)

urlpatterns = [
   path('', include(router.urls)),
]