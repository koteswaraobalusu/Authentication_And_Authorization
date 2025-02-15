from rest_framework.serializers import ModelSerializer
from app.models import *
from django.contrib.auth.models import User

class NoteSerializer(ModelSerializer):
    class Meta:
        model=Note
        fields='__all__'

class UserSerializer(ModelSerializer):
    class Meta:
        model=User
        fields=['username','password']
    def create(self, validated_data):
        user=User.objects.create_user(**validated_data)
        return user
    