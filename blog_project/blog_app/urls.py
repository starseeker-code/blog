from django.contrib import admin
from django.urls import path

urlpatterns = [
    path('', views.home, name='home'),
    path('/posts', views.all_posts, name='all'),
    path('/post/id', views.detailed_post, name='detailed'),
    path('/about', views.about, name='about')  # REVIEW: Link a CV y dejar en forma de funcion
]
