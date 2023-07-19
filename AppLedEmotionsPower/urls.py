from django.urls import path
from .views import *
from. import views


urlpatterns = [
    path('', views.principal, name = 'principal'),

    #USUARIOS
    path('usuario',listarUsuario.as_view(), name = "usuario"),
    path('insertarUsu/',InsertarUsuario.as_view(), name = "insertarUsu"),
    path('actualizarUsu/<pk>',actualizarUsuario.as_view(), name = "actualizarUsu"),
    path('eliminarUsu/<pk>',EliminarUsuario.as_view(), name = "eliminarUsu"),
    path('frmformularioUsuarios/', views.frmformularioUsuarios, name = 'frmformularioUsuarios'),
    

    #COMPROBANTE
    path('comprobante',listarComrpobante.as_view(), name = "comprobante"),
    path('insertarCompro/',InsertarComprobante.as_view(), name = "insertarCompro"),
    path('actualizarCompro/<pk>',ActualizarComprobante.as_view(), name = "actualizarCompro"),
    path('eliminarCompro/<pk>',EliminarComprobante.as_view(), name = "eliminarCompro"),
    path('frmformularioComprobante/', views.frmformularioComprobante, name = 'frmformularioComprobante'),

    #CONEXION LED
    path('conexionLed',Listar_Conexiones_Led.as_view(), name = "conexionLed"),
    path('insertarConLed/',Insertar_Conexion_LED.as_view(), name = "insertarConLed"),
    path('actualizarConLed/<pk>',Actualizar_Conexion_Led.as_view(), name = "actualizarConLed"),
    path('eliminarConLed/<pk>',Elimianr_Conexion.as_view(), name = "eliminarConLed"),
    path('frmformularioCoxionLed/', views.frmformularioCoxionLed, name = 'frmformularioCoxionLed'),


    #SESION TERAPIA
    path('sesionterapia',Listar_Sesion_Terapia.as_view(), name = "sesionterapia"),
    path('insertarSesionTera/',Isnertar_Sesion_Terapia.as_view(), name = "insertarSesionTera"),
    path('actualizarSesionTera/<pk>',Actualizar_Sesion_Terpia.as_view(), name = "actualizarSesionTera"),
    path('eliminarSesionTera/<pk>',Eliminar_Sesion_terapia.as_view(), name = "eliminarSesionTera"),
    path('frmformularioSesionTerapia/', views.frmformularioSesionTerapia, name = 'frmformularioSesionTerapia'),


    #EMOCIONES
    path('emocion',listar_Emociones.as_view(), name = "emocion"),
    path('insertarEmo/',Insertar_Emocion.as_view(), name = "insertarEmo"),
    path('actualizarEmo/<pk>',Actualizar_Emociones.as_view(), name = "actualizarEmo"),
    path('eliminarEmo/<pk>',Elminar_Emociones.as_view(), name = "eliminarEmo"),
    path('frmformularioEmociones/', views.frmformularioEmociones, name = 'frmformularioEmociones'),


    #SESION EMO
    path('sesionemo',Listar_Sesion_Emocional.as_view(), name = "sesionemo"),
    path('insertarSesionEmo/',Insertar_Sesion_Emocional.as_view(), name = "insertarSesionEmo"),
    path('actualizarSesionEmo/<pk>',Actualizar_Sesion_emocional.as_view(), name = "actualizarSesionEmo"),
    path('eliminarSesionEmo/<pk>',Eliminar_Sesion_Emocional.as_view(), name = "eliminarSesionEmo"),
    path('frmformularioSesionEmo/', views.frmformularioSesionEmo, name = 'frmformularioSesionEmo'),



    #MULTIMEDIA
    path('multimedia',listar_Multiemdia.as_view(), name = "multimedia"),
    path('insertarMultimedia/',Insertar_Multimedia.as_view(), name = "insertarMultimedia"),
    path('actualizarMultimedia/<pk>',Actualizar_Mulrimedia.as_view(), name = "actualizarMultimedia"),
    path('eliminarMultimedia/<pk>',Eliminar_Multimedia.as_view(), name = "eliminarMultimedia"),
    path('frmformularioMultimedia/', views.frmformularioMultimedia, name = 'frmformularioMultimedia'),


    # EMO MULTIMEDIA
    path('emomultimedia',Listar_Emo_Multimedia.as_view(), name = "emomultimedia"),
    path('insertarEmoMultimedia/',Insertar_Emo_Multiemdia.as_view(), name = "insertarEmoMultimedia"),
    path('actualizarEmoMultimedia/<pk>',Actualizar_EMO_multi.as_view(), name = "actualizarEmoMultimedia"),
    path('eliminarEmoMultimedia/<pk>',Eliminar_emo_Multi.as_view(), name = "eliminarEmoMultimedia"),
    path('frmformularioEmoMultimedia/', views.frmformularioEmoMultimedia, name = 'frmformularioEmoMultimedia'),
]
