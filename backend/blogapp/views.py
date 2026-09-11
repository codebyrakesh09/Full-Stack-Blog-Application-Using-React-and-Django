from django.db.models import Q
from rest_framework import viewsets
from .models import Post
from .serializers import PostSerializer


class PostViewSet(viewsets.ModelViewSet):
    """
    Provides full CRUD for blog posts:
    - list    -> GET    /api/posts/
    - create  -> POST   /api/posts/
    - retrieve-> GET    /api/posts/{id}/
    - update  -> PUT    /api/posts/{id}/
    - partial -> PATCH  /api/posts/{id}/
    - delete  -> DELETE /api/posts/{id}/

    Also supports search via a ?search= query param that matches
    against the title, content, and author fields.
    """
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def get_queryset(self):
        queryset = Post.objects.all()
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) |
                Q(content__icontains=search) |
                Q(author__icontains=search)
            )
        return queryset
