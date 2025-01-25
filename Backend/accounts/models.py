from django.contrib.auth.models import AbstractUser, BaseUserManager, PermissionsMixin
from django.db import models

class UserManager(BaseUserManager):
    def create_user(self, username, password=None, role='team_leader', **extra_fields):
        if not username:
            raise ValueError("The Username field is required")
        user = self.model(username=username, role=role,is_staff=True, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(username, password, role='admin', **extra_fields)


class User(AbstractUser):
    
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='accounts_user_set',  # Change related_name here
        blank=True
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='accounts_user_permissions_set',  # Change related_name here
        blank=True
    )
    ROLE_CHOICES = [
        ('director', 'Director'),
        ('team_leader', 'Team Leader'),
        ('admin',"Admin")
    ]
    role = models.CharField(max_length=20,default="team_leader", choices=ROLE_CHOICES)
    objects = UserManager()
    
    def __str__(self):
        return f"{self.username} ({self.role})"
