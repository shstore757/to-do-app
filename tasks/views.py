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
    try:
        # Realizar solicitud a la API externa usando la URL proxy
        # response = requests.get('http://127.0.0.1:8000/api/tasks/') 
        response = requests.get('https://backend-to-do-bice.vercel.app/api/tasks/') 
        
        # Verificar si la solicitud fue exitosa (código de estado 200)
        if response.status_code == 200:
            # Devolver los datos obtenidos de la API externa como respuesta
            return JsonResponse(response.json())
        else:
            # Si la solicitud falla, devolver un mensaje de error
            return JsonResponse({'error': 'Failed to fetch tasks from external API'}, status=response.status_code)
    except Exception as e:
        # Manejar cualquier excepción que pueda ocurrir durante la solicitud
        return JsonResponse({'error': str(e)}, status=500)
