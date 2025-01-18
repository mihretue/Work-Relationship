from django.db import models

# Company Model
class Company(models.Model):
    tin_number = models.CharField(max_length=50, unique=True)
    manager_name = models.CharField(max_length=100)
    company_name = models.CharField(max_length=150)
    phone_number = models.CharField(max_length=20)
    company_type = models.CharField(max_length=50)
    grade = models.CharField(max_length=20)
    organization = models.CharField(max_length=100)
    performance = models.TextField()
    remark = models.TextField(blank=True, null=True)  # Optional field for remarks
    approved = models.BooleanField(default=False)
    
    def __str__(self):
        return self.company_name
    
        
# Project Model
class Project(models.Model):
    STATUS_CHOICES = [
        ("finished", "Finished"),
        ("unfinished", "Unfinished")
    ]
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='projects')  # Link to Company
    project_name = models.CharField(max_length=100)
    project_cost = models.DecimalField(max_digits=12, decimal_places=2)
    year = models.IntegerField()  # Assuming the year is stored as a 4-digit integer
    categories = models.CharField(max_length=200)  # Could be changed to ManyToManyField if categories are predefined
    status = models.CharField(max_length=50, choices=STATUS_CHOICES,default="unfinished")
    remark = models.TextField(blank=True, null=True)
    def __str__(self):
        return self.project_name
