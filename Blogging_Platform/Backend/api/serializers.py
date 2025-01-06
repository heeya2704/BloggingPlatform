from rest_framework import serializers
from .models import User, Post
from django.conf import settings
from django.contrib.auth import get_user_model


User = get_user_model()

class UserloginSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=255)
    class Meta:
        model = User
        fields = ['username','password']

class PostSerializer(serializers.ModelSerializer):
    author = UserloginSerializer(read_only=True)
    
    class Meta:
        model = Post
        fields = ['id', 'title', 'image', 'date_posted', 'categories', 'author', 'content']


class UserregisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    
    class Meta:
        model = User
        fields = ['username','password', 'password2','is_Creator','is_Member']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def validate(self, data):
        p1 = data.get('password')
        p2 = data.get('password2')
        if p1 != p2:
            raise serializers.ValidationError('Password & confirm password do not match')
        return data

    def create(self, validated_data):
        # Remove the password2 field from validated_data as it's not needed for user creation
        validated_data.pop('password2', None)
        
        # Create the user with the remaining validated_data
        return User.objects.create_user(**validated_data)