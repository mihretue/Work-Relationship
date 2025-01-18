# Generated by Django 4.2.9 on 2025-01-17 22:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('work_registration', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='company',
            name='approved',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='project',
            name='remark',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='project',
            name='status',
            field=models.CharField(choices=[('finished', 'Finished'), ('unfinished', 'Unfinished')], default='unfinished', max_length=50),
        ),
    ]
