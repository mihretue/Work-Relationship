# Generated by Django 5.0.4 on 2025-01-26 19:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('work_registration', '0008_alter_company_created_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='company',
            name='created_date',
            field=models.DateField(blank=True, null=True),
        ),
    ]
