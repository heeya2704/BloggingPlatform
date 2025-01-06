from django.contrib import admin
from .models import User,Post

# Register your models here.
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'is_Creator', 'is_Member']
    search_fields = ['username', 'email']

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'categories','date_posted']
    search_fields = ['title', 'author__username']
    list_filter = ['categories']