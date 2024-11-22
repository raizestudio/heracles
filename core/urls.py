"""
URL configuration for core project.
"""

from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

urlpatterns = [
    path("admin/", admin.site.urls),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
