from rest_framework import generics, status
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User
from .models import Post, UserProfile, Like, Comment
from .serializers import MyTokenObtainPairSerializer,UserSerializer,PostSerializer, CommentSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
    def perform_create(self, serializer):
        user = serializer.save()
        UserProfile.objects.create(user=user)
        
class PostCreateView(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        today = timezone.now().date()

        try:
            user_profile = UserProfile.objects.get(user=user)
        except UserProfile.DoesNotExist:
            return Post.objects.none()  # Return no posts if UserProfile doesn't exist

        if user_profile.last_post_date != today:
            if user_profile.last_post_date == today - timezone.timedelta(days=1):
                # If posted yesterday, increment streak
                user_profile.streak += 1
            else:
                # If not posted yesterday, reset streak to 1
                user_profile.streak = 1

            user_profile.last_post_date = today
            user_profile.save()

        serializer.save(author=self.request.user)

class PostUpdateView(generics.UpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        serializer.save(author=self.request.user)

class PostDeleteView(generics.DestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

class PostListView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    
    def get(self, request, *args, **kwargs):
        slug = kwargs.get('slug')
        if slug:
            post = get_object_or_404(self.queryset, slug=slug)
            serializer = self.get_serializer(post)
            return Response(serializer.data)
        else:
            return super().get(request, *args, **kwargs)

class UserPostsView(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Post.objects.filter(author=user)
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)

        # Get the user's streak
        try:
            user_profile = UserProfile.objects.get(user=request.user)
            streak = user_profile.streak
        except UserProfile.DoesNotExist:
            streak = 0

        # Create the custom response data
        response_data = {
            'streak': streak,
            'posts': serializer.data
        }

        return Response(response_data)

class LikePostView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        user = request.user
        try:
            post = Post.objects.get(id=pk)
        except Post.DoesNotExist:
            return Response({'error': 'Post not found'}, status=status.HTTP_404_NOT_FOUND)

        like, created = Like.objects.get_or_create(user=user, post=post)
        if not created:
            # If the like already exists, it means the user is unliking the post
            like.delete()
            post.likes_count -= 1
            post.save()
            return Response({'status': 'unliked', 'likes_count': post.likes_count}, status=status.HTTP_204_NO_CONTENT)

        # Increment the likes count
        post.likes_count += 1
        post.save()

        return Response({'status': 'liked', 'likes_count': post.likes_count}, status=status.HTTP_201_CREATED)

class CommentCreateView(generics.CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class CommentListView(generics.ListAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        post_id = self.kwargs.get('post_id')
        return Comment.objects.filter(post_id=post_id)

class CommentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    
    