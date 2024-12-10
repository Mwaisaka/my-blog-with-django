from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from .models import Post
import json
from datetime import datetime

# Create your views here.

@api_view(['GET'])
def home(request):
    return HttpResponse("Hello from Django!")

@api_view(['POST'])
@csrf_exempt
def add_post(request):
    if request.method == "POST":
        try:
            data=json.loads(request.body)# Parse JSON data from the request body
            title=data.get("title") # Extract 'task' from the request payload
            category=data.get("category") # Extract 'category' from the request payload
            content=data.get("content") # Extract 'content' from the request payload
            reading_time=data.get("reading_time") # Extract 'reading_time' from the request payload
            likes=data.get("likes") # Extract 'likes' from the request payload
            comments=data.get("comments") # Extract 'comments' from the request payload
            
        
            if content:            
                # Check if the user has already submitted the same post
                existing_post = Post.objects.filter(title=title, category=category, content=content).first()
                
                if not existing_post:               
                    # Create a new review
                    new_post = Post(title=title,category=category,content=content,reading_time=reading_time,likes=likes,comments=comments)
                    new_post.save()
                    
                    # Get the current date and time
                    current_datetime = datetime.now()
                    
                    # Return the newly created review as JSON response
                    return JsonResponse({
                        'id': new_post.id,
                        'title': new_post.title,
                        'category': new_post.category,
                        'content': new_post.content,
                        'create_date': current_datetime,
                        'reading_time': new_post.reading_time,
                        'likes': new_post.likes,
                        'comments': new_post.comments
                    }, status=201)  
                else:
                    return JsonResponse({'error': 'Post with the same content already exists'}, status=403)         
            else:
                return JsonResponse({'error': 'Post name is required'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON payload'}, status=400)
    else:
      return JsonResponse({'error': 'POST request required'}, status=405)
  
@api_view(['GET'])
@csrf_exempt
def posts(request):
    posts = Post.objects.all().values()
    return JsonResponse(list(posts), safe=False)
