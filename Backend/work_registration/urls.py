from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CompanyViewSet, ProjectViewSet

# Initialize the router
router = DefaultRouter()
router.register(r'companies', CompanyViewSet, basename='company')
router.register(r'projects', ProjectViewSet, basename='project')

# App-specific URLs
urlpatterns = [
    path('', include(router.urls)),  
    path('companies/<int:pk>/approve/', CompanyViewSet.as_view({'post': 'approve'}), name='company-approve'),
    path('companies/<int:company_id>/projects/<int:project_id>/status/', CompanyViewSet.as_view({'patch': 'update_project_status'})),
]
