from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.authtoken.models import Token
from .serializers import UserLoginSerializer
from .serializers import UserSerializer
from .models import User
from rest_framework import generics

@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if not serializer.is_valid(raise_exception=True):
            return Response({"message": "Request Body Error."}, status=status.HTTP_409_CONFLICT)

        if User.objects.filter(username=serializer.validated_data['username']).first() is None:
            serializer.save()
            
            return Response({"message": "success!"}, status=status.HTTP_201_CREATED)
        return Response({"message": "아이디가 중복되었습니다."}, status=status.HTTP_409_CONFLICT)


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    if request.method == 'POST':
        serializer = UserLoginSerializer(data=request.data)

        if not serializer.is_valid(raise_exception=True):
            return Response({"message": "Request Body Error."}, status=status.HTTP_409_CONFLICT)
        if serializer.validated_data['username'] == "None":
            return Response({'message': 'fail'}, status=status.HTTP_200_OK)

        response = {
            "id": serializer.data.get('id'), 
            'success': 'True',
            'token': serializer.data['token']
        }
        return Response(response, status=status.HTTP_200_OK)        

@permission_classes([IsAuthenticated]) 
class Test(generics.GenericAPIView):
    serializer_class = UserSerializer
    def get(self, request, *args, **kwargs):
        return Response({'message':'good'},status=status.HTTP_200_OK)