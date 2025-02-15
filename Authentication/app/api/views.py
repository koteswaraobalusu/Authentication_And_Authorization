from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import *
from app.models import *

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['email']=user.email
        # ...

        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class=MyTokenObtainPairSerializer




@api_view(['POST'])
def createUser(request):
    serializer=UserSerializer(data=request.data)
    if serializer.is_valid():
        user=serializer.save()
        return Response(serializer.data,status=status.HTTP_201_CREATED)


@api_view(['GET'])
def getRoutes(request):
    Routes=[
        'api/token/',
        'api/token/refresh/'
    ]

    return Response(Routes)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getNotes(request):
    user=request.user
    notes=Note.objects.filter(user=user)
    serializer=NoteSerializer(notes,many=True)
    return Response(serializer.data)