from django.contrib.auth.models import update_last_login
from django.db import models
from django.db.models.deletion import CASCADE

from account.models import User

# Create your models here.


class Article(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    like_users = models.ManyToManyField(User, blank=True, related_name='like_articles' )
    tags = models.TextField(max_length=10, blank=True)
    image = models.ImageField(blank=True, upload_to="uploads")

    def like_count(self):
        return self.like_users.count()


class Comment(models.Model):
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Like(models.Model):
    user = models.ForeignKey(User, on_delete=CASCADE)
    article = models.ForeignKey(Article, on_delete=CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = (
            ('user', 'article')
        )