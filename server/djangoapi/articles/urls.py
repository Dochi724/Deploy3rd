from django.urls import path, include
from . import views
from rest_framework import urls
from django.conf.urls.static import static
from django.conf import settings


urlpatterns =[
    path('', views.article_list),
    path('<int:article_pk>/', views.article_detail),
    
    path('board/', views.PostViewSet.as_view({'get': 'list'})),
    path('myarticle/', views.PostList.as_view()),

    path('test/', views.Test.as_view()),


    path('comment/', views.comment_list), #댓글보기
    path('comment/<int:comment_pk>/', views.comment_detail), #댓글상세(수정)
    path('<int:article_pk>/comment/', views.comment_create),   #댓글생성 

    path('search/',views.PostSearch.as_view()),
    path('<int:article_pk>/likes/', views.likes, name='likes' ),

]
