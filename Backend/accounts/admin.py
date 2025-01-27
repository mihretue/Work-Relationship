from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User  # Make sure to import your custom User model

# Register your custom User model with the UserAdmin
admin.site.register(User, UserAdmin)