from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSignupSerializer, CustomTokenObtainPairSerializer
from .models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.permissions import BasePermission, IsAuthenticated
# from rest_framework_simplejwt.views import TokenObtainPairView
class UserSignupView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            body = json.loads(request.body)
            username = body.get("username")
            password = body.get("password")
            role = body.get("role")  # Capture the role

            # Check if the username already exists
            if User.objects.filter(username=username).exists():
                return JsonResponse({'error': 'Username already exists'}, status=400)

            # Create the user
            user = User(username=username)
            user.set_password(password)  # Hash the password
            user.is_active = True  # Set user as active
            user.save()

            # Handle role assignment if using a custom user model or related model
            # e.g., UserProfile.objects.create(user=user, role=role)

            return JsonResponse({'message': 'User created successfully'}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
@method_decorator(csrf_exempt, name='dispatch')
class CustomTokenObtainPairView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = CustomTokenObtainPairSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.validated_data)
        return Response(serializer.errors, status=400)
    
    
# class IsTeamLeaderOrDirector(BasePermission):
#     def has_permission(self,request, view):
#         user = request.user
#         if user.is_authenticated:
#             if user.role == 'team_leader' or user.role == 'director':
#                 return True
            
# class CompaniesBie