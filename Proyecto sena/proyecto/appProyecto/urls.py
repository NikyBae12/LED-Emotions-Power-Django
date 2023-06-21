from django.urls import path
from .views import *


urlpatterns = [
    #path('admin/', admin.site.urls),
    path('ListarUsuario', listarUsuario.as_view(), name='ListarUsuario'),
    path('InsertarUsuario', InsertarUsuario.as_view(), name='InsertarUsuario'),
    path('ActualizarUsuario/<pk>', actualizarUsuario.as_view(), name='ActualizarUsuario'),
    path('EliminarUsuario/<pk>', EliminarUsuario.as_view(), name='EliminarUsuario'),


    # Urls de comprobante---------------------
    path('ListarComprobante', listarComrpobante.as_view(), name='ListarComprobante'),
    path('InsertarComprobante', InsertarComprobante.as_view(), name='InsertarComprobante'),
    path('ActualizarComprobante/<pk>', ActualizarComprobante.as_view(), name='ActualizarComprobante'),
    path('EliminarComprobante', EliminarComprobante.as_view(), name='EliminarComprobante')
]