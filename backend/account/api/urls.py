from django.urls import path
from account.api import views


urlpatterns = [
    path('v1/users/', views.UserListView.as_view(), name="users"),
]