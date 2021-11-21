from django.urls import path, include
from . import views
from rest_framework import urls

urlpatterns =[
    path('', views.article_list),
    path('<int:article_pk>/', views.article_detail),
    
    path('comment/', views.comment_list), #댓글보기
    path('comment/<int:comment_pk>/', views.comment_detail), #댓글상세(수정)
    path('<int:article_pk>/comment/', views.comment_create),   #댓글생성 

    path('<int:article_pk>/likes/', views.likes, name='likes' ),


 ]