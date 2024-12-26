from django.contrib import admin
from .models import Post, BlogSubscriber

# Register your models here.
class PostAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "content", "create_date")

admin.site.register(Post, PostAdmin)

class BlogSubscriberAdmin(admin.ModelAdmin):
    list_display = ("email", "subscribe_date")
admin.site.register(BlogSubscriber, BlogSubscriberAdmin)