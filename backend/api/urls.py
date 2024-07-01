from django.urls import path
from .views import PostCreateView, PostUpdateView, PostDeleteView, PostListView, UserPostsView, LikePostView, CommentCreateView, CommentDetailView

urlpatterns = [
    path('posts/', PostListView.as_view(), name='post-list'),
    path('posts/user/', UserPostsView.as_view(), name='user-posts'),
    path('posts/create/', PostCreateView.as_view(), name='post-create'),
    path('posts/<slug>/', PostListView.as_view(), name='post-detail'),
    path('posts/update/<int:pk>/', PostUpdateView.as_view(), name='post-update'),
    path('posts/delete/<int:pk>/', PostDeleteView.as_view(), name='post-delete'),
    path('posts/<int:pk>/like/', LikePostView.as_view(), name='like-post'),
    path('comments/create/', CommentCreateView.as_view(), name='comment-create'),
    path('comments/<int:pk>/', CommentDetailView.as_view(), name='comment-detail'),
]