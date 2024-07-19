from django.contrib import admin
from home import views
from django.urls import path

urlpatterns = [
    path("",views.index,name="homepage"),
    path("loign",views.loginuser,name="loginpage"),
    path('logout/', views.logout_view, name='logout'),
    path("add",views.add,name="add"),
]