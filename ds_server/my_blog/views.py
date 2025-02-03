from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from .models import Post, BlogSubscriber, Message
import json
from datetime import datetime
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.shortcuts import get_object_or_404

# Create your views here.

@api_view(['GET'])
def home(request):
    return HttpResponse("Welcome to my blog!")

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
@api_view(["POST"])
@csrf_exempt
def toggle_like(request):
    if request.method =="POST":
        try:
            # Parse JSON data from the request
            data=json.loads(request.body)
            post_id=data.get('post_id') #Extarct the post id
            
            if not post_id:
                return JsonResponse({'error': 'Post ID is required'}, status=400)
            
            # Fetch the post
            post=Post.objects.filter(id=post_id).first()
            
            if not post:
                return JsonResponse({'error': 'Post not found'}, status=404)
            
            # Toggle the like count
            action=data.get('action',"").lower() #Get the action (like or unlike)
            if action=='like':
                post.likes += 1
            elif action=='unlike':
                post.likes =max(0,post.likes-1) #Ensure the likes dont get below zero
            else:
                return JsonResponse({"error":"Invalid action. Use 'like' or 'unlike"}, status=400)
            
            # Save post
            post.save()
            
            # Return the updated post details
            return JsonResponse({
                'id': post.id,
                'likes': post.likes,
            }, status=200)
            
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON payload'}, status=400)
        except Exception as e:
            return JsonResponse({'error': f'An error occurred: {str(e)}'}, status=500)
    else:
        return JsonResponse({'error': 'POST request required'}, status=405)

@csrf_exempt  # Exempting CSRF for API requests (can be handled better for production)
def login(request):
  if request.method == 'POST':
    try:
      # Parse JSON data from the request body
      data=json.loads(request.body)
      username = data.get("username")
      password = data.get("password")
      
      # Validate required fields
      if not all([username, password]):
          return JsonResponse({"error": "Username and password are required"}, status=400)
      
      # Check if the user exists
      # subscriber_exists = Subscriber.objects.filter(username=username).exists()
      # if not subscriber_exists:
      #     return JsonResponse({"error": "Invalid username or password"}, status=401)
        
      # Authenticate user
      # subscriber = authenticate(username=username, password=password)
      subscriber = authenticate(request, username=username, password=password)
      
      if subscriber is not None:
        # If using session-based authentication
        # django_login(request, subscriber)
        
        # Generate JWT token
        refresh = RefreshToken.for_user(subscriber)
                
        # Sucessfully authenticated
        return JsonResponse({
          'message': "Login successful",
          'token': str(refresh.access_token),
          'refresh_token': str(refresh),
          'subscriber': {
            'id': subscriber.id,
            'username': subscriber.username,
          }
        }, status=200)
      else:
        # Incorrect username or password
        return JsonResponse({"error": "Invalid username or password"}, status=401)
    except json.JSONDecodeError:
      return JsonResponse({"error":"Invalid JSOn payload"},status=400)
    except Exception as e:
      return JsonResponse({"error":str(e)},status=500)
  else:
    return JsonResponse({"error":"Post request required"},status=405)

@api_view(['POST'])
@csrf_exempt
def subscribe(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            
            existing_subscriber = BlogSubscriber.objects.filter(email=email).first()
            
            if not existing_subscriber:
                # Create a new subscriber
                new_subscriber = BlogSubscriber(email=email)
                new_subscriber.save()
                
                # Get the current date and time
                current_datetime = datetime.now()
                
                # Return the new subscriber as a JSON response
                return JsonResponse(
                    {
                    "id": new_subscriber.id,
                    "email": new_subscriber.email,
                    'subscribe_date': current_datetime,
                }, status=200)
            else:
                return JsonResponse({"error": "Email already exists"}, status=403)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON payload'}, status=400)
    else:
      return JsonResponse({'error': 'POST request required'}, status=405)

@api_view(['GET'])
@csrf_exempt
def view_subscribers(request):
    subscriber = BlogSubscriber.objects.all().values()
    return JsonResponse(list(subscriber), safe=False)

@api_view(['DELETE'])
@csrf_exempt
def delete_subscriber(request,id):
    if request.method == 'DELETE':
        try:
            subscriber = get_object_or_404(BlogSubscriber, id=id)
            subscriber.delete()
            return JsonResponse({"message": "Subscriber deleted successfully"}, status=200)
        except BlogSubscriber.DoesNotExist:
            return JsonResponse({"error": "Subscriber does not exist"}, status=404)
    else:
        return JsonResponse({"erro": "Delete request required"}, status=405)

@api_view(['DELETE'])
@csrf_exempt
def delete_post(request,id):
    if request.method == 'DELETE':
        try:
            post = get_object_or_404(Post, id=id)
            post.delete()
            return JsonResponse({"message": "Post deleted successfully"}, status=200)
        except Post.DoesNotExist:
            return JsonResponse({"error": "Post does not exist"}, status=404)
    else:
        return JsonResponse({"erro": "Delete request required"}, status=405)
    
@api_view(['POST'])
@csrf_exempt
def edit_post(request,id):
    """
    API to edit the title, category, content, and reading time of a post.
    """
    if request.method == "POST":
        try:
            # Pass the JSON payload
            data=json.loads(request.body)
            title=data.get("title")
            category=data.get("category")
            content=data.get("content")
            reading_time=data.get("reading_time")
            create_date=data.get("create_date")
            
            # Validate the input fields
            if not any([title, category, content, reading_time]):
                return JsonResponse(
                    {"error": "At least one of 'title', 'category', 'content', or 'reading_time' is required to update the post."},
                    status=400
                )
            
            # Fetch the post by ID
            post = get_object_or_404(Post, id=id)
            
            # Update the fields only if provided in the request
            if title:
                post.title = title
            if category:
                post.category = category
            if content:
                post.content = content
            if reading_time:
                post.reading_time = reading_time
                
            # Save changes
            post.save()
            
            # Return the updated post details
            return JsonResponse({
                'id': post.id,
                'title': post.title,
                'category': post.category,
                'content': post.content,
                'create_date': post.create_date,
                'reading_time': f"{post.reading_time}",
                'likes': post.likes,
                'comments': json.loads(post.comments) if post.comments else []
            }, status=200)
            
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON payload'}, status=400)
        except Exception as e:
            return JsonResponse({'error': f'An error occurred: {str(e)}'}, status=500)
    else:
        return JsonResponse({'error': 'POST request required'}, status=405)
    
@api_view(['DELETE'])
@csrf_exempt
def delete_comment(request):
    """ 
    API to delete a specific comment from a post.
    """
    
    if request.method == 'DELETE':
        try:
            #Parse the request body
           
            data=json.loads(request.body)
            id=data.get('id')
            print(f"Received request for post_id: {id}")
            comment_to_delete=data.get('comments')
            print(f"Comment to delete: {comment_to_delete}")
            
            if not comment_to_delete:
                return JsonResponse({"error": "Comment content are required"}, status=400)
            
            #Fetch the post
            post=get_object_or_404(Post,id=id)
            print(f"Post fetched: {post}")
            
            #Decode the comments field
            comments_list=json.loads(post.comments) if post.comments else [] 
            print(f"Existing comments: {comments_list}")
            print(f"Comment to delete: {comment_to_delete}")
            
            #Check if the comments exist
            if comment_to_delete not in comments_list:
                return JsonResponse({"error": "Comment not found"}, status=404)
            
            #Remove the comments
            comments_list.remove(comment_to_delete)
            print(f"Updated comments: {comments_list}")
            
            #Update and save the post
            post.comments = json.dumps(comments_list)
            post.save()
            print(f"Post saved successfully")
            
            #Return the updated comments list
            return JsonResponse({
                "id": post.id,
                "title": post.title,
                "comments": comments_list,
            }, status=200)            
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON Payload"}, status=400)
        except Exception as e:
            return JsonResponse({"error":f'An error occurred : {str(e)}'}, status=500)
    else:
        return JsonResponse({"error":"DELETE request is required"}, status=405)


@api_view(['GET'])
@csrf_exempt
def messages(request):
    messages = Message.objects.all()
    response_data = []
    for message in messages:
        response_data.append({
            'id': message.id,
            'name': message.name,
            'email': message.email,
            'phoneNumber': message.phoneNumber,
            'subject': message.subject,
            'message': message.message,
            'create_date': message.create_date,
        })
    return JsonResponse(response_data, safe=False)


@api_view(['POST'])
@csrf_exempt
def add_message(request):
    if request.method == "POST":
        try:
            data=json.loads(request.body)# Parse JSON data from the request body
            name=data.get("name") # Extract 'name' from the request payload
            email=data.get("email") # Extract 'email' from the request payload
            phone_Number=data.get("phoneNumber") # Extract 'phoneNumber' from the request payload
            subject=data.get("subject") # Extract 'subject' from the request payload
            message=data.get("message") # Extract 'name' from the request payload                   
        
            if message:            
                # Check if the user has already submitted the same message
                existing_message = Message.objects.filter(name=name, email=email, subject=subject, message=message).first()
                
                if not existing_message:               
                    # Create a new message
                    new_message = Message(name=name,email=email,phoneNumber=phone_Number, subject=subject, message=message)
                    new_message.save()
                    
                    # Get the current date and time
                    current_datetime = datetime.now()
                    
                    # Return the newly created message as JSON response
                    return JsonResponse({
                        'id': new_message.id,
                        'name': new_message.name,
                        'email': new_message.email,
                        'phoneNumber': new_message.phoneNumber,
                        'subject': new_message.subject,
                        'message': new_message.message,
                        'create_date': current_datetime,
                    }, status=201)  
                else:
                    return JsonResponse({'error': 'Message with the same content already exists'}, status=403)         
            else:
                return JsonResponse({'error': 'Message content is required'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON payload'}, status=400)
    else:
      return JsonResponse({'error': 'POST request required'}, status=405)

@api_view(['DELETE'])
@csrf_exempt
def delete_message(request,id):
    if request.method == 'DELETE':
        try:
            post = get_object_or_404(Message, id=id)
            post.delete()
            return JsonResponse({"message": "Message deleted successfully"}, status=200)
        except Message.DoesNotExist:
            return JsonResponse({"error": "Message does not exist"}, status=404)
    else:
        return JsonResponse({"erro": "Delete request required"}, status=405)