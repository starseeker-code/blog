from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

class Post(models.Model):
    
    class Status(models.TextChoices):  # Status para un post
        BORRADOR = "DF", "Draft"
        PUBLICADO = "PB", "Published"
    
    titulo = models.CharField(max_length=245)
    slug = models.SlugField(max_length=100)
    autor = models.ForeignKey(User, on_delete=models.CASCADE, related_name="blog_posts")  # Relacion N:1 con User (importado de auth.models)
    body = models.TextField()
    publicado = models.DateTimeField(default=timezone.now)  # Cuando se publico el post en la base de datos
    creado = models.DateTimeField(auto_now_add=True)  # Cuando se creo el post
    actualizado = models.DateTimeField(auto_now=True)  # Ultimo cambio en el post
    status = models.CharField(max_length=2, choices=Status.choices, default=Status.BORRADOR)  # Uso de la clase TextChoices (Status)
    
    def __str__(self):
        return f"Post: {self.slug}"
    
    class Meta:
        ordering = ["-publicado"]  # Muestra los posts de acuerdo a cuando se publicaron
        indexes = [
            models.Index(fields=["-publicado"])  # Indexa los posts
        ]