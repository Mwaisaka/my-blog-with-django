from django.db import models
from django.utils.timezone import now

# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=255, null=False)
    category = models.CharField(max_length=255, null=False)
    content = models.TextField(null=False)  # TextField for larger content   
    create_date = models.DateTimeField(null=False, blank=True, default=now)
    reading_time = models.CharField(max_length=50, null=False)  # To hold reading time (e.g., "1 min", "5 mins")
    likes = models.IntegerField(default=0)  # To store the number of likes
    comments = models.JSONField(default=list, blank=True)  # To store comments as a list of objects (or empty list)
        
    def __str__(self):
        return f'{self.title} - {self.category} - {self.content} - {self.create_date.strftime("%Y-%m-%d %H:%M:%S")}'

