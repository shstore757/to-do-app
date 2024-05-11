from django.shortcuts import render
from django.http import JsonResponse
import requests

from .models import Task

def task_list(request):
    # Obtener todas las tareas de la base de datos
    tasks = Task.objects.all()
    
    # Serializar las tareas (esto depende de cómo hayas definido tus modelos y serializers)
    serialized_tasks = [{'id': task.id, 'name': task.name} for task in tasks]
    
    # Devolver las tareas serializadas como respuesta
    return JsonResponse({'tasks': serialized_tasks})

def proxy_task_request(request):
    response = requests.get('https://backend-to-do-chi.vercel.app/api/tasks/')
    return JsonResponse(response.json())


# Create your views here.
