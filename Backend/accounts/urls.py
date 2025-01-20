from django.urls import path
from .views import UserSignupView, UserLoginView, AdminDashboardView, TeamLeaderDashboardView, DirectorDashboardView

urlpatterns = [
    path('signup/', UserSignupView.as_view(), name='signup'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('dashboard/admin/', AdminDashboardView.as_view(), name='admin-dashboard'),
    path('dashboard/team-leader/', TeamLeaderDashboardView.as_view(), name='team-leader-dashboard'),
    path('dashboard/director/', DirectorDashboardView.as_view(), name='director-dashboard'),
]
