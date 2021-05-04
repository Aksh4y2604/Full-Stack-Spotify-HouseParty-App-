from . import views
from django.urls import path
urlpatterns = [
    path('',views.RoomView.as_view(),name='main_function'),
    path('/create-room',views.CreateRoomView.as_view(),name='Create Room'),
    path('/get-room',views.getCodeData.as_view(),name='codeData'),
    path('/join-room',views.RoomJoin.as_view(),name="Join Room")
    
]