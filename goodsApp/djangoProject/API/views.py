from rest_framework.response import Response
from rest_framework.decorators import api_view
from base.models import Item
from base.models import User
from .serialisers import ItemSerializer
from .serialisers import UserSerializer
@api_view(['GET'])
def getData(request):
    items = Item.objects.all()
    serialiser = ItemSerializer(items, many=True)
    return Response(serialiser.data)

@api_view(['POST'])
def addItem(request):
    serialiser = ItemSerializer(data=request.data)
    if serialiser.is_valid():
        serialiser.save()
        return Response(serialiser.data)