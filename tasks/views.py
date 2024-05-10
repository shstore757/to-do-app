from django.shortcuts import render
import requests
from django.http import JsonResponse

def proxy_task_request(requests):
    response = requests.get('https://api-to-do-blue.vercel.app/api/tasks/')
    return JsonResponse(response.json())


# Create your views here.
