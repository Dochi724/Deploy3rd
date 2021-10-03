from rest_framework import serializers
from .models import Article, Comment,  PostImage

class ArticleListSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Article
        fields = ('id', 'title', )

class CommentSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Comment
        fields ='__all__'
        read_only_fields= ('article', ) # article 필드는 읽기전용으로 명시
        
class ArticleSerializer(serializers.ModelSerializer) :
    #comment_set = serializers.PrimaryKeyRelatedField(many=True, read_only=True) # 이러면 게시글 당 댓글키만 나오게됨
    comment_set = CommentSerializer(many=True, read_only=True) # CommentSerializer정의가 이 코드보다 밑에 있다면 에러가 발생할 수 있음. json 안에 json 이 있는 형태가 됨
    comment_count = serializers.IntegerField(source='comment_set.count', read_only=True) # 댓글 갯수
    # comment_first = serializers.CharField(source='comment_set.first', read_only=True) # 첫번째 댓글 Comment Object로 출력됨
    comment_first = CommentSerializer(source='comment_set.first', read_only=True) # 첫번째 댓글에 해당하는 직렬화되어 들어가게 됨
    comment_filter = serializers.SerializerMethodField('less_7') # 쿼리셋을 직렬화한 것을 반환하는 함수를 가지고 데이터 넣어주기
    
    def less_7(self, article) :
        qs = Comment.objects.filter(pk__lte=7, article=article)
        serializer= CommentSerializer(instance=qs, many=True)
        return serializer.data
    class Meta :
        model = Article
        fields = '__all__'

class PostImageSerializer(serializers.ModelSerializer):
   class Meta:
      model = PostImage
      fields = ['image']

class PostSerializer(serializers.ModelSerializer):
   images = PostImageSerializer(many=True, read_only=True)
  
   class Meta:
      model = Article
      fields = ['id', 'text', 'location', 'images']
      
   def create(self, validated_data):
       images_data = self.context['request'].FILES
       post = Article.objects.create(**validated_data)
       for image_data in images_data.getlist('image'):
           PostImage.objects.create(post=post, image=image_data)
       return post

