# Generated by Django 5.0.6 on 2024-06-20 16:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_remove_post_excerpt_remove_post_status'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='categories',
        ),
        migrations.RemoveField(
            model_name='post',
            name='tags',
        ),
    ]
