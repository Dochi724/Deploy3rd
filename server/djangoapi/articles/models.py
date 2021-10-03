from django.db import models

class Article(models.Model):
    title = models.CharField(max_length=100)
    content = models.CharField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)   


class Comment(models.Model) :
    article = models.ForeignKey(Article, on_delete=models.CASCADE) #comment_set 으로 만들어짐
    # article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name='comments')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

   
class PostImage(models.Model):
   post = models.ForeignKey(Article, on_delete=models.CASCADE)
   image = models.ImageField(upload_to="post/%Y/%m/%d")