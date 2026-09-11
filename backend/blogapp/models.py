from django.db import models
from django.contrib.auth.models import User


class Post(models.Model):
    """A single blog post."""
    title = models.CharField(max_length=255)
    content = models.TextField()
    author = models.CharField(max_length=150, blank=True, default='Anonymous')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title
