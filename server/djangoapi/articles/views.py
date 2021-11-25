from django.http.response import HttpResponse
from django.shortcuts import get_list_or_404, get_object_or_404, render

from account.serializers import UserSerializer
from .serializers import ArticleListSerializer,ArticleDetailSerializer,CommentSerializer, LikeSerializer,ArticleSerializer
from rest_framework import status, mixins
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes,authentication_classes
# Create your views here.
from .models import Article,Comment,Like
from django.contrib.auth.decorators import login_required
from rest_framework.permissions import IsAuthenticatedOrReadOnly,IsAuthenticated
from .permissions import IsOwnerOrReadOnly
from rest_framework import filters
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework import generics, filters
from rest_framework.authentication import TokenAuthentication,SessionAuthentication, BasicAuthentication
from django.http import HttpResponseRedirect

#게시글

class PostViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    authentication_classes = [TokenAuthentication]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

@permission_classes([IsAuthenticated]) 
class Test(mixins.ListModelMixin, mixins.CreateModelMixin,generics.GenericAPIView):
    serializer_class = ArticleSerializer
    queryset = Article.objects.all()
    def get(self, request, *args, **kwargs):
            return self.list(request)

    def post(self,request,*args,**kwargs):
        return self.create(request)

@api_view(['GET','POST'])
# @permission_classes([IsAuthenticatedOrReadOnly])
def article_list(request):
    if request.method =='POST':
        serializer = ArticleListSerializer(data=request.data)
        if not serializer.is_valid(raise_exception=True):
            return Response({"message": "Request Body Error."}, status=status.HTTP_409_CONFLICT)
        else :
            serializer.save()
            return Response({"message": "success!"}, status=status.HTTP_201_CREATED)
    if request.method == 'GET':
        articles = get_list_or_404(Article)
        serializer = ArticleListSerializer(articles, many=True)
        return Response(serializer.data)


@api_view(['GET', 'DELETE', 'PUT'])
@permission_classes([IsAuthenticatedOrReadOnly,IsOwnerOrReadOnly])
def article_detail(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)
    if request.method=='GET':
        serializer = ArticleDetailSerializer(article)
        return Response(serializer.data)
    
    elif request.method=='DELETE':
        article.delete()
        data = {
            'delete' : f'데이터 {article_pk}번이 삭제 되었습니다.'
          }
        return Response(data, status=status.HTTP_204_NO_CONTENT)
    
    elif request.method == 'PUT':
        serializer = ArticleDetailSerializer(article, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

#댓글

@api_view(['GET'])
def comment_list(request):
    comment = get_list_or_404(Comment)
    serializer = CommentSerializer(comment, many=True)
    return Response(serializer.data)

@api_view(['GET', 'DELETE', 'PUT'])
@permission_classes([IsAuthenticatedOrReadOnly,IsOwnerOrReadOnly])
def comment_detail(request, comment_pk):
    comment = get_object_or_404(Comment, pk=comment_pk)
    if request.method == 'GET':
        serializer = CommentSerializer(comment)
        return Response(serializer.data)

    elif request.method == 'DELETE':
        comment.delete()
        data = {
            'delete': f'댓글 {comment_pk}번이 삭제되었습니다.'
        }
        return Response(data, status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'PUT':
        serializer = CommentSerializer(comment, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

#댓글생성
@api_view(['POST'])
def comment_create(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)
    serializer = CommentSerializer(data=request.data) 
    if serializer.is_valid(raise_exception=True):
        serializer.save(article=article)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@login_required
@api_view(['POST'])
def likes(request, article_pk) :
        article = get_object_or_404(Article, pk=article_pk)
        serializer = LikeSerializer(data=request.data)
        if article.like_users.filter(pk = request.user.pk).exist() : # 동작은 똑같지만, 하나가 있는지 없는지 찾을 떄는 이렇게 써야 부담이 덜 가고 빠름
        # if request.user in article.like_users.all() : # article에 좋아요를 누른 모든 유저 안에 user 가 있을시
            # 좋아요 취소
            article.like_users.remove(request.user)
        else : # user가 이 글에 좋아요를 누르지 않은 유저라면 
            # 좋아요 추가
            article.like_users.add(request.user)
        if serializer.is_valid(raise_exception=True):
            serializer.save(article=article)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class PostList(generics.ListAPIView):
    serializer_class = ArticleSerializer
    def get_queryset(self):
        user = self.request.user
        return Article.objects.filter(author=user)

class PostSearch(generics.ListAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleDetailSerializer
    filter_backends = [filters.SearchFilter]
    search_fields =['^tags']