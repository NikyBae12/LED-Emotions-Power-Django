from django.contrib import admin
from django.urls import path, include
from AppLedEmotionsPower.views import*   

urlpatterns = [
    path('admin/', admin.site.urls),
    #path('consultaUsuario/', consultaUsuario), 
    #path('consultaComprbante/', consultaComprbante), 
    #path('consultaConexion_LED/', consultaConexion_LED), 
    #path('consultaSesion_terapia/', consultaSesion_terapia), 
    #path('consultaEmociones/', consultaEmociones), 
    #path('consultasesion_Emo/', consultasesion_Emo), 
    #path('consultaMultimedia/', consultaMultimedia), 
    #path('consultaemo_multi/', consultaemo_multi), 
    path( '', include('AppLedEmotionsPower.urls')),

    

    
    ]
