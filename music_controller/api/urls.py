from . import views
from django.urls import path
urlpatterns = [
    path('',views.RoomView.as_view(),name='main_function'),
    path('/create-room',views.CreateRoomView.as_view(),name='Create Room')
]