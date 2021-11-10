
from .models import Article,Comment,Like, Image

from rest_framework import serializers


class ImageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)
    class Meta:
        model = Image
        fields = ['image']

class ArticleListSerializer(serializers.ModelSerializer):

    images = serializers.SerializerMethodField()

    def get_images(self, obj):
        image = obj.image_set.all()
        return ImageSerializer(instance=image, many=True, context=self.context).data

    class Meta:
        model = Article
        fields = ('id', 'title', 'images')
    def create(self, validated_data):
        instance = Article.objects.create(**validated_data)
        image_set = self.context['request'].FILES
        for image_data in image_set.getlist('image'):
            Image.objects.create(diary=instance, image=image_data)
        return instance

class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ('article',) #읽기 전용 필드


class ArticleDetailSerializer(serializers.ModelSerializer):
    comment_set = CommentSerializer(many=True, read_only=True)
    images = serializers.SerializerMethodField()
    def get_images(self, obj):
        image = obj.image_set.all()
        return ImageSerializer(instance=image, many=True, context=self.context).data

    class Meta:
        model = Article
        fields = '__all__'


class LikeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Like
        fields = '__all__'
        read_only_fields = ('article',) #읽기 전용 필드

