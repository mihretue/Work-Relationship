from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate

class UserSignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'role']

    def validate_role(self, value):
        valid_roles = [role[0] for role in User.ROLE_CHOICES]
        if value not in valid_roles:
            raise serializers.ValidationError("Invalid role")
        return value

    def create(self, validated_data):
        return User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            role=validated_data.get('role', 'team_leader')
        )


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(username=data['username'], password=data['password'])
        if user is None:
            raise serializers.ValidationError("Invalid username or password")
        if not user.is_active:
            raise serializers.ValidationError("User account is deactivated")
        return user