from django.contrib import admin
from AppLedEmotionsPower.models import *

# Register your models here.

@admin.register(Usuario)
class UsuarioAdmin(admin.ModelAdmin):
    list_display = ("Id_usuario", "nombres", "apellidos", "contraseña", "fechaN", "codigoVer", "img_perfil", "estado_cu")


@admin.register(Comprbante)
class ComprbanteAdmin(admin.ModelAdmin):
    list_display = ("Id_Comrpobante", "Id_usuario", "fecha_autu", "factura", "valor")


@admin.register(Conexion_LED)
class Conexion_LEDAdmin(admin.ModelAdmin):
    list_display = ("Id_conexion", "Id_led", "C_estado")


@admin.register(Sesion_terapia)
class Sesion_terapiaAdmin(admin.ModelAdmin):
    list_display = ("Id_sesion", "Id_conexion", "Id_usuario", "Id_emocion", "fecha_sesi", "nivel_satif")


@admin.register(Emociones)
class EmocionesAdmin(admin.ModelAdmin):
    list_display = ("Id_emocion", "E_nombre", "E_coloBsc", "E_estadoA")


@admin.register(sesion_Emo)
class sesion_EmoAdmin(admin.ModelAdmin):
    list_display = ("Id_sesion_emo", "Id_sesion", "Id_emocion")


@admin.register(Multimedia)
class MultimediaAdmin(admin.ModelAdmin):
    list_display = ("Id_elemento", "Tipo_elemn", "ElementoM", "Autor", "M_estado")


@admin.register(emo_multi)
class emo_multiAdmin(admin.ModelAdmin):
    list_display = ("Id_emo_multi", "Id_emocion", "Id_elemento")