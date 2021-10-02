from .models import User
from django.contrib.auth import get_user_model
from rest_framework import serializers

from django.contrib.auth.models import update_last_login
from django.contrib.auth import authenticate
from rest_framework_jwt.settings import api_settings

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)
    favorite_place = serializers.CharField(required=True)

    def create(self, validated_data):
        user = User.objects.create_user(
            email = validated_data['email'],
            username = validated_data['username'],
            favorite_place = validated_data['favorite_place'],
            password = validated_data['password']
        )
        return user
    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'favorite_place']

        

JWT_PAYLOAD_HANDLER = api_settings.JWT_PAYLOAD_HANDLER
JWT_ENCODE_HANDLER = api_settings.JWT_ENCODE_HANDLER


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=64)
    password = serializers.CharField(max_length=128, write_only=True)
    token = serializers.CharField(max_length=255, read_only=True)

    def validate(self, data):
        username = data.get("username", None)
        password = data.get("password", None)
        user = authenticate(username=username, password=password)

        if user is None:
            return {
                'username': 'None'
            }
        try:
            payload = JWT_PAYLOAD_HANDLER(user)
            jwt_token = JWT_ENCODE_HANDLER(payload)
            update_last_login(None, user)
        except User.DoesNotExist:
            raise serializers.ValidationError(
                'User with given id and password does not exists'
            )
        return {
            'username': user.username,
            'token': jwt_token
        }        