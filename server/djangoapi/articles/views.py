from django.shortcuts import render, get_list_or_404, get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Article
from . serializers import ArticleListSerializer,ArticleSerializer

from .models import Comment
from .serializers import CommentSerializer

from rest_framework.viewsets import ModelViewSet
from .serializers import PostSerializer
from .models import Post

@api_view(['GET', 'POST'])
def article_list(request) : 
    if request.method=="GET" :
        articles = get_list_or_404(Article)
        serializer = ArticleListSerializer(articles, many=True)
        return Response(serializer.data)
    elif request.method=="POST" :
        serializer = ArticleSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True) : 
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED) # 저장성공을 알림
            # return Response(serializer.error, status = status.HTTP_400_BAD_REQUEST) # 저장 실패를 알림

@api_view(['GET', 'DELETE', 'PUT'])
def article_detail(request, article_pk) :
    article = get_object_or_404(Article, pk=article_pk)
    if request.method == "GET" :        # 글 상세보기
        serializer = ArticleSerializer(article)
        return Response(serializer.data)
    elif request.method == "DELETE" :        # 글 삭제
        article.delete()
        data = {
            'delete' : f'데이터 {article_pk}번이 삭제되었습니다.'
        }
        return Response(data, status=status.HTTP_204_NO_CONTENT)
    elif request.method == "PUT" : # 글 수정하기
        serializer = ArticleSerializer(article, data=request.data)
        if serializer.is_valid(raise_exception=True) : # 실패시 에러발생시키기
            serializer.save()
            return Response(serializer.data)

@api_view(['GET'])
def comment_list(request) :
    comments = get_list_or_404(Comment)
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)

@api_view(['GET', 'DELETE', 'PUT'])
def comment_detail(request, comment_pk) :
    comments = get_list_or_404(Comment, pk = comment_pk)
    if request.method == 'GET' :
        serializer = CommentSerializer(comments)
        return Response(serializer.data)
    elif request.method == "DELETE" :
        comments.delete()
        data= {
            'delete' :f'댓글 {comment_pk}번이 삭제 되었습니다.'
        }
        return Response(data, status=status.HTTP_204_NO_CONTENT)
    elif request.method == "PUT" :
        serializer = CommentSerializer(instance=comments, data=request.data)
        if serializer.is_valid(raise_exception=True) :
            serializer.save()
            return Response(serializer.data)

@api_view(['POST'])
def comment_create(request, article_pk) :
    article = get_list_or_404(Article, pk = article_pk)
    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True) :
        serializer.save(article=article) # 해당 글에 댓글쓰기
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class PostViewSet(ModelViewSet):
   queryset = Post.objects.all()
   serializer_class = PostSerializer