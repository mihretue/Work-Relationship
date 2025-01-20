from rest_framework import viewsets, status
from rest_framework.response import Response  
from rest_framework.decorators import action
from .models import Company, Project
from .serializers import ProjectSerializer, CompanySerializer , ProjectStatusUpdateSerializer
from rest_framework.exceptions import ValidationError

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.prefetch_related('projects').all()
    serializer_class = CompanySerializer

    def create(self, request, *args, **kwargs):
        # Custom validation for Company creation
        tin_number = request.data.get("tin_number")
        projects = request.data.get("projects",[])
        if Company.objects.filter(tin_number=tin_number).exists():
            return Response({"error": "A company with this TIN number already exists."}, status=400)
        if len(projects) > 1:
            raise ValidationError("Only one project can be added per request.")
        return super().create(request, *args, **kwargs)

    # updating status
    @action(detail=True, methods=['patch'], url_path='projects/(?P<project_id>[^/.]+)/status')
    def update_project_status(self, request, pk=None, project_id=None):
        try:
            # Retrieve the company and the project
            company = self.get_object()
            project = company.projects.get(id=project_id)
        except Company.DoesNotExist:
            raise NotFound('Company not found.')
        except Project.DoesNotExist:
            raise NotFound('Project not found.')

        # Serialize and validate the status update
        serializer = ProjectStatusUpdateSerializer(project, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()  # Save the updated project status
            return Response(serializer.data)
        else:
            raise ValidationError(serializer.errors)
    
    @action(detail=False, methods=['get'], url_path='search-by-tin')
    def search_by_tin(self, request):
        tin_number = request.query_params.get("tin_number")
        if not tin_number:
            return Response({'error': "TIN number is required."}, status=status.HTTP_400_BAD_REQUEST)
        try:
            company = Company.objects.get(tin_number=tin_number)
            serializer = self.get_serializer(company)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Company.DoesNotExist:
            return Response({'error': "Company not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            # Catch any unexpected errors
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        company = self.get_object()  # Query is optimized with prefetch_related
        remark = request.data.get("remark", None)

        # Check for unfinished projects
        unfinished_projects = company.projects.filter(status="unfinished")

        if unfinished_projects.exists():
            # Require a remark for unfinished projects
            if not remark:
                return Response({"error": "Remark is required because there are unfinished projects."}, status=400)
            company.remark = remark
        else:
            # No remark needed for first project
            company.remark = remark if remark else "First project; no remark required."

        # Approve the company
        company.approved = True
        company.save()
        return Response({"message": "Company approved successfully.", "remark": company.remark})

    @action(detail=True, methods=['post'])
    def reject(self, request, pk=None):
        company = self.get_object()
        remark = request.data.get("remark", None)

        # Add a remark when rejecting
        company.remark = remark if remark else "No specific reason provided."
        company.approved = False
        company.save()
        return Response({"message": "Company rejected successfully.", "remark": company.remark})


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.select_related('company').all()
    serializer_class = ProjectSerializer

    def create(self, request, *args, **kwargs):
        # Ensure the company exists before creating a project
        company_id = request.data.get("company")
        if not Company.objects.filter(id=company_id).exists():
            return Response({"error": "Invalid company ID."}, status=400)


        # Call the default implementation of create
        return super().create(request, *args, **kwargs)

# class CompanySearchByTINView(viewsets.ModelViewSet):
#     queryset = Company.objects.all()
#     serializer_class = CompanySerializer
    
#     @action(detail=False, methods=['get'],url_path='search-by-tin')
#     def search_by_tin(self, request):
#         tin_number = request.query_params.get("tin_number")
        
#         if not tin_number:
#             return Response({'error': "TIN Number is Required"}, status=status.HTTP_400_BAD_REQUEST)
        
#         try:
#             company = Company.objects.get(tin_number=tin_number)
#             serializer = self.get_serializer(company)
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         except Company.DoesNotExist:
#             return Response({'error': "Company not found"}, status=status.HTTP_404_NOT_FOUND)