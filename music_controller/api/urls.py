from . import views
from django.urls import path
urlpatterns = [
    path('',views.RoomView.as_view(),name='main_function'),
    path('/create-room',views.CreateRoomView.as_view(),name='Create Room'),
    path('/get-room',views.getCodeData.as_view(),name='codeData'),
    path('/join-room',views.RoomJoin.as_view(),name="Join Room"),
    path('/user-in-room',views.UserInRoom.as_view(),name="Check if user in room"),
    path('/leave-room',views.LeaveRoom.as_view(),name="leave room"),
    path('/room-settings',views.UpdateSettings.as_view(),name='Settings')  
]