from rest_framework import viewsets, status
from rest_framework.response import Response  
from rest_framework.decorators import action,permission_classes
from .models import Company, Project
from .serializers import ProjectSerializer, CompanySerializer , ProjectStatusUpdateSerializer
from rest_framework.exceptions import ValidationError
from .permissions import IsTeamLeader, IsDirector, IsTeamLeaderOrDirector
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView



class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.prefetch_related('projects').all()
    serializer_class = CompanySerializer
    permission_classes = [IsAuthenticated , IsTeamLeaderOrDirector]
    
    def get(self,request):
        data ={
            "message":"this dat is only for team leader"
        
        }
        return Response(data,status=status.HTTP_200_OK)
    # @permission_classes([IsAuthenticated, IsTeamLeader|IsDirector])
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
    
    # @permission_classes([IsDirector])
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
        #Check for Unfinished Projects in other companies with the same tin
        other_unfinished_projects_same_tin = (Project.objects.filter(company__tin_number=company.tin_number).exclude(company=company.id).filter(status="unfinished").distinct())
        if unfinished_projects.exists() or other_unfinished_projects_same_tin.exists():
            # Require a remark for unfinished projects
            if not remark:
                return Response({"error": "Remark is required because the company is taking another projects without finishing previous projects."}, status=400)
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

    @action(detail=True,methods=["post"])
    def forward_to_director(self,request,pk=None):
        company = self.get_object()
        company.forwarded_to_director=True
        company.forwarded_by = request.user
        company.save()
        return Response({"message": "Company forwarded to director successfully."}, status=status.HTTP_200_OK)
    
    
    
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        # Handle top-level company fields
        company_data = {key: value for key, value in request.data.items() if key != "projects"}
        serializer = self.get_serializer(instance, data=company_data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        # Handle nested projects
        projects_data = request.data.get("projects", [])
        for project_data in projects_data:
            project_id = project_data.get("id")  # Use 'id' to differentiate existing/new projects
            if project_id:
                # Update existing project
                try:
                    project_instance = Project.objects.get(id=project_id, company=instance)
                    project_serializer = ProjectSerializer(project_instance, data=project_data, partial=partial)
                    project_serializer.is_valid(raise_exception=True)
                    project_serializer.save()
                except Project.DoesNotExist:
                    return Response({"error": f"Project with id {project_id} does not exist."}, status=400)
            else:
                # Create a new project
                project_data["company"] = instance.id  # Link to the company
                project_serializer = ProjectSerializer(data=project_data)
                project_serializer.is_valid(raise_exception=True)
                project_serializer.save()

        # Return updated company data
        return Response(self.get_serializer(instance).data, status=200)
    
@permission_classes([IsDirector])
@action(detail=False, methods=["get"])
def forwarded_companies(self,request):
    forwarded_company = Company.objects.filter(forwarded_to_director=True)
    serializer = self.get_serializer(forwarded_company,many=True)
    return Response(serializer.data,status=status.HTTP_200_OK)
        

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.select_related('company').all()
    serializer_class = ProjectSerializer

    @permission_classes([IsAuthenticated,IsTeamLeader | IsDirector])
    def create(self, request, *args, **kwargs):
        # Ensure the company exists before creating a project
        company_id = request.data.get("company")
        if not Company.objects.filter(id=company_id).exists():
            return Response({"error": "Invalid company ID."}, status=400)


        # Call the default implementation of create
        return super().create(request, *args, **kwargs)
    

class DeleteProjectView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, company_id, project_id):
        try:
            # Fetch the company and project
            company = Company.objects.get(id=company_id)
            project = company.projects.get(id=project_id)

            # Mark the project as deleted (soft delete)
            project.deleted = True
            project.save()

            return Response({"message": "Project marked as deleted."}, status=status.HTTP_200_OK)
        except Company.DoesNotExist:
            return Response({"error": "Company not found."}, status=status.HTTP_404_NOT_FOUND)
        except Project.DoesNotExist:
            return Response({"error": "Project not found."}, status=status.HTTP_404_NOT_FOUND)