from django.db import models
from django.utils import timezone

# Create your models here.
class Post(models.Model):
    titulo = models.CharField(max_length=245)
    slug = models.SlugField(max_length=100)
    body = models.TextField()
    publicado = models.DateTimeField(default=timezone.now)  # Cuando se publico el post en la base de datos
    creado = models.DateTimeField(auto_now_add=True)  # Cuando se creo el post
    actualizado = models.DateTimeField(auto_now=True)  # Ultimo cambio en el post
    
    def __str__(self):
        return f"Post: {self.slug}"
    
    class Meta:
        ordering = ["-publicado"]  # Muestra los posts de acuerdo a cuando se publicaron
        indexes = [
            models.Index(fields=["-publicado"])  # Indexa los posts
        ]