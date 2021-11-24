
from .models import Article,Comment,Like, Image, Tag

from rest_framework import serializers
from taggit.serializers import (TagListSerializerField, TaggitSerializer)

class ImageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)
    class Meta:
        model = Image
        fields = ['image']

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'


class ArticleListSerializer(TaggitSerializer, serializers.ModelSerializer):

    images = serializers.SerializerMethodField()
    tags = TagListSerializerField()
    def get_images(self, obj):
        image = obj.image_set.all()
        return ImageSerializer(instance=image, many=True, context=self.context).data

    class Meta:
        model = Article
        fields = ('id', 'title', 'images','tags','like_users')
        
    def create(self, validated_data):
        instance = Article.objects.create(**validated_data)
        image_set = self.context['request'].FILES

        # to_be_tagged, validated_data = self._pop_tags(validated_data)
        # tag_object = super(TaggitSerializer, self).create(validated_data)
        # feed = self._save_tags(tag_object, to_be_tagged)
        # 추후수정

        for image_data in image_set.getlist('image'):
            Image.objects.create(article=instance, image=image_data)
        return instance
class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ('article',) #읽기 전용 필드


class ArticleDetailSerializer(TaggitSerializer, serializers.ModelSerializer):
    comment_set = CommentSerializer(many=True, read_only=True)
    images = serializers.SerializerMethodField()
    tags = TagListSerializerField()
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

