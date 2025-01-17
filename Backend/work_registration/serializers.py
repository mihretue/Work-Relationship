from rest_framework import serializers
from .models import Company, Project

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id','project_name', 'project_cost', 'year', 'categories', 'status', 'remark']


class CompanySerializer(serializers.ModelSerializer):
    projects = ProjectSerializer(many=True)  # Accept nested project data

    class Meta:
        model = Company
        fields = fields = ['id','tin_number', 'manager_name', 'company_name', 'phone_number', 'company_type', 'grade', 'organization', 'performance', 'remark', 'approved', 'projects']

    def create(self, validated_data):
        projects_data = validated_data.pop('projects', [])
        company = Company.objects.create(**validated_data)
        for project_data in projects_data:
            Project.objects.create(company=company, **project_data)
        return company


class ProjectStatusUpdateSerializer(serializers.ModelSerializer):
    status = serializers.ChoiceField(choices=Project.STATUS_CHOICES)
    
    class Meta:
        model = Project
        fields = ["status"]