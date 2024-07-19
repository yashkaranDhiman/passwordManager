from django.contrib.auth.models import User
from django.shortcuts import render, redirect
from home.models import *
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json


# Create your views here.
def index(request):
    if not request.user.is_authenticated:
        allManages = ""
        allpins = ""
    else:
        allManages = Manage.objects.filter(user=request.user)
        allpins = pin.objects.filter(user=request.user)
    if request.method == "POST":
        fname = request.POST['fname']
        lname = request.POST['lname']
        username = request.POST['fname']
        password = request.POST['password']
        confirm_password = request.POST['passwordcon']
        Pin = request.POST['pin']

        if password == confirm_password:
            if User.objects.filter(username=username).exists():
                messages.error(request, 'Username is already taken.')
            else:
                # Create the user
                user = User.objects.create_user(username=username, password=password, first_name=fname, last_name=lname)
                user.save()
                user_profile = pin(user=user, pin=Pin)
                user_profile.save()
                if user is not None:
                    
                    login(request, user)
                    return redirect("homepage")
                
        else:
            messages.error(request, 'Passwords do not match.')
        
    context = {'allManages': allManages,"allpins":allpins}
    return render(request, 'home/index.html', context)

def loginuser(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(username=username, password=password)

        if user is not None:
            login(request, user)
            messages.success(request,"You are logged in successfully")
            return redirect("homepage")
        else:
            messages.error(request, 'Invalid credentials')
    return render(request, 'home/index.html')

def add(request):
    if request.method == "POST":
        username = request.user
        email = request.POST.get('email-inp')
        password = request.POST.get('password-inp')
        website = request.POST.get('web-inp')
        newManage = Manage(user=username, email_or_username=email, password=password, website=website)
        newManage.save()
        messages.info(request,"Information added successfully")
        return redirect("/")
    return render(request, 'home/index.html')

def logout_view(request):
    logout(request)
    return redirect('/')