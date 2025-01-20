from rest_framework.permissions import BasePermission

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'admin'

class IsTeamLeader(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'team_leader'

class IsDirector(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'director'
