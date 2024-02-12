from django.shortcuts import render, get_object_or_404
from .models import Post

def post_list(request):
    posts = Post.publicado.all()  # Lista todos los posts
    return render(request, "blog/post/all_posts.html", {"posts": posts})

def post_detail(request, id):
    post = get_object_or_404(
        Post, id=id,  # Extrae por ID
        status=Post.Status.PUBLICADO  # Solo los posts publicados
    )
    return render(request, "blog/post/post_detail.html", {"post": post})