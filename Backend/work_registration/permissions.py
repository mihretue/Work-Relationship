from rest_framework import permissions

class IsTeamLeader(permissions.BasePermission):

    def has_permission(self, request, view):
        
        user = request.user
        if user.is_authenticated and user.role == 'team_leader':
            return True
        return False
class IsDirector(permissions.BasePermission):
    def has_permission(self, request, view):
        user = request.user
        if user.is_authenticated and user.role == 'director':
            return True
        return False