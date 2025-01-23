from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate

# class UserSignupSerializer(serializers.ModelSerializer):
#     password = serializers.CharField(write_only=True)

#     class Meta:
#         model = User
#         fields = ['username', 'password', 'role']

#     def validate_role(self, value):
#         valid_roles = [role[0] for role in User.ROLE_CHOICES]
#         if value not in valid_roles:
#             raise serializers.ValidationError("Invalid role")
#         return value

#     def create(self, validated_data):
#         return User.objects.create_user(
#             username=validated_data['username'],
#             password=validated_data['password'],
#             role=validated_data.get('role', 'team_leader')
#         )

class UserSignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'role']

    def validate_role(self, value):
        if value not in dict(User.ROLE_CHOICES):
            raise serializers.ValidationError("Invalid role.")
        return value

    def create(self, validated_data):
        return User.objects.create_user(
            username=validated_data.get('username'),
            password=validated_data['password'],
            role=validated_data.get('role')
        )
        
class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        username = data.get("username")
        password = data.get("password")

        # Authenticate the user
        user = authenticate(username=username, password=password)
        if not user:
            raise serializers.ValidationError({"non_field_errors": ["Invalid username or password"]})

        # Ensure the user is active
        if not user.is_active:
            raise serializers.ValidationError({"non_field_errors": ["This account is deactivated."]})

        # Pass the authenticated user to the validated data
        data['user'] = user
        return data