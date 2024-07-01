from django.contrib.auth.models import User
from django.utils import timezone
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import UserProfile, Category, Tag, Post, Comment, Like

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['id'] = user.id      
        return token
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = UserProfile
        fields = ['user', 'bio', 'email', 'streak', 'last_date_posted']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'created_at', 'updated_at']

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name', 'slug', 'created_at', 'updated_at']
        
class CommentSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()
    post = serializers.PrimaryKeyRelatedField(queryset=Post.objects.all())

    class Meta:
        model = Comment
        fields = ['id', 'post', 'author', 'content', 'created_at']
        
    def get_author(self,obj):
        try:
            return User.objects.get(id=obj.author_id).username
        except User.DoesNotExist:
            return None
        
class PostSerializer(serializers.ModelSerializer):
    author_name = serializers.SerializerMethodField()
    slug = serializers.SerializerMethodField()
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = [
            'id', 'title', 'content', 'slug', 'author_name', 'published_date', 
            'created_at', 'updated_at', 'likes_count', 'comments'
        ] 
        
    def get_author_name(self, obj):
        try:
            return User.objects.get(id=obj.author_id).username
        except User.DoesNotExist:
            return None
        
    def get_slug(self,obj):
        return Post.objects.get(id=obj.id).slug
    
    def get_likes_count(self, obj):
        return obj.like_set.count()

class LikeSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    post = serializers.PrimaryKeyRelatedField(queryset=Post.objects.all())

    class Meta:
        model = Like
        fields = ['id', 'post', 'user', 'created_at']
