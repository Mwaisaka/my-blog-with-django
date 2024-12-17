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
    posts = Post.objects.all()
    response_data = []
    for post in posts:
        response_data.append({
            'id': post.id,
            'title': post.title,
            'category': post.category,
            'content': post.content,
            'create_date': post.create_date,
            'reading_time': post.reading_time,
            'likes': post.likes,
            'comments': json.loads(post.comments) if post.comments else [],  # Ensure it's an array
        })
    return JsonResponse(response_data, safe=False)

@api_view(['POST'])
@csrf_exempt
def add_comment(request):
    if request.method == "POST":
        try:
                    
            # Parse JSON data from the request body
            data = json.loads(request.body)
            post_id = data.get("post_id")  # Extract the ID of the post
            new_comment = data.get("comment")  # Extract the new comment
            
            if not post_id or not new_comment:
                return JsonResponse({'error': 'Post ID and comment are required'}, status=400)

            # Fetch the existing post
            post = Post.objects.filter(id=post_id).first()
            if not post:
                return JsonResponse({'error': 'Post not found'}, status=404)
            
            # Decode comments
            comments_list = json.loads(post.comments) if post.comments else []

            # Add the new comment
            comments_list.append(new_comment)

            # Update the post's comments
            post.comments = json.dumps(comments_list)
            post.save()

            # Return the updated post details
            return JsonResponse({
                'id': post.id,
                'title': post.title,
                'category': post.category,
                'content': post.content,
                'comments': comments_list,
                'likes': post.likes,
                'reading_time': post.reading_time,
            }, status=200)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON payload'}, status=400)
        except Exception as e:
            return JsonResponse({'error': f'An error occurred: {str(e)}'}, status=500)
    else:
        return JsonResponse({'error': 'POST request required'}, status=405)