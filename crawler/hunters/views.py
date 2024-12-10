from django.http import JsonResponse, HttpResponseNotAllowed
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def squad_statistics_receive_view(request):
    if request.method == "POST":
        try:
            # 바이트 데이터를 JSON으로 변환
            body_data = json.loads(request.body.decode('utf-8'))
            print("Received SQUAD data:", body_data)  # 제대로 디코딩된 데이터 출력
        except json.JSONDecodeError as e:
            print(f"Error decoding JSON: {e}")
            return JsonResponse({"error": "Invalid JSON"}, status=400)

        return JsonResponse({"message": "OK"}, status=200)
    return HttpResponseNotAllowed(["POST"])

@csrf_exempt
def duo_statistics_receive_view(request):
    if request.method == "POST":
        try:
            # 바이트 데이터를 JSON으로 변환
            body_data = json.loads(request.body.decode('utf-8'))
            print("Received DUO data:", body_data)  # 제대로 디코딩된 데이터 출력
        except json.JSONDecodeError as e:
            print(f"Error decoding JSON: {e}")
            return JsonResponse({"error": "Invalid JSON"}, status=400)

        return JsonResponse({"message": "OK"}, status=200)
    return HttpResponseNotAllowed(["POST"])
