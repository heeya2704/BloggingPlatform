from django.shortcuts import render
from api.models import User, Post
from rest_framework import views
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import status
from api.serializers import *
from rest_framework.permissions import IsAuthenticated
from api.custom_permission import *
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from api.serializers import PostSerializer
from django.http import Http404
from rest_framework import generics

# Create your views here.
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    # Add custom claims to the access token
    refresh['is_Creator'] = user.is_Creator
    refresh['is_Member'] = user.is_Member
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


def filter_blogs_by_category(request):
    category = request.GET.get('category', None)
    if category:
        blogs = Post.objects.filter(categories__icontains=category)  # Case-insensitive search
        blogs_list = list(blogs.values())  # Convert to JSON serializable format
        return JsonResponse({'blogs': blogs_list})
    return JsonResponse({'error': 'Category not provided'}, status=400)



class UserLogin(views.APIView):
    def post(self, request, format=None):
        serializer = UserloginSerializer(data=request.data)
        print("serializer", serializer)
        if serializer.is_valid(raise_exception=True):
            username = serializer.data.get('username')
            password = serializer.data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                token = get_tokens_for_user(user)
                return Response({'token':token,'data':'Login success'}, status=status.HTTP_200_OK)
            else:
                return Response({'errors':{'non_field_errors':['username or password not a valid']}},
                status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        
class Userprofile(views.APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    def get(self, request, format=None):
        ser = UserloginSerializer(request.user)
        return Response(ser.data, status=status.HTTP_200_OK)


class UserRegister(views.APIView):
    def post(self, request, format=None):
        serializer = UserregisterSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            return Response({'Data':'User Registred'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class LatestBlogsView(generics.ListAPIView):
    queryset = Post.objects.order_by('-date_posted')[:5]  # Fetch the latest 5 blogs
    serializer_class = PostSerializer

class TrendingBlogsView(generics.ListAPIView):
    queryset = Post.objects.filter(is_trending=True).order_by('-date_posted')  # Fetch blogs marked as trending
    serializer_class = PostSerializer

class PostAPIView(views.APIView):
    permission_classes = [AllowAny]  # You can modify this as per your auth needs
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
    def get_object(self, id):
        try:
            return Post.objects.get(id=id)
        except Post.DoesNotExist:
            raise Http404

    def post(self, request, format=None):
        # Check if there is an image file in the request
        image = request.FILES.get('image')
        if not image:
            return Response({"error": "Image file is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            # Save blog post with image
            serializer.save(image=image)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, id=None, format=None):
        # Single post retrieval by id or all posts by user
        if id is not None:
            query = self.get_object(id)
            serializer = PostSerializer(query)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        query = Post.objects.all()  # Optionally, filter by user or category here
        serializer = PostSerializer(query, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, id=None, format=None):
        # Handle editing an existing post
        post = self.get_object(id)
        serializer = PostSerializer(post, data=request.data, partial=True)  # Allows partial updates
        
        if serializer.is_valid():
            # Check if there is a new image provided in the request
            image = request.FILES.get('image')
            if image:
                serializer.save(image=image)  # Update post with new image if provided
            else:
                serializer.save()  # Save without updating the image
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
from django.http import HttpResponse
import os

def serve_media(request, path):
    media_root = settings.MEDIA_ROOT
    full_path = os.path.join(media_root, path)
    
    if os.path.exists(full_path):
        with open(full_path, 'rb') as f:
            return HttpResponse(f.read(), content_type="image/jpeg")
    else:
        return HttpResponse("File not found", status=404)