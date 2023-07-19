from typing import Any
from django import http
from django.shortcuts import render
from AppLedEmotionsPower.models import *
from django.views.generic import ListView, View
from django.http import HttpRequest, HttpResponse, JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
import json
# Create your views here.
# Create your views here.

def consultaUsuario(request): 
    listarUsuario=Usuario.objects.all()
    return render(request,"Usuario.html", {"cli":listarUsuario})

def consultaComprbante(request): 
    listarComprbante=Comprbante.objects.all()
    return render(request,"Comprobante.html", {"cli":listarComprbante})

def consultaConexion_LED(request): 
    listarConexion_LED=Conexion_LED.objects.all()
    return render(request,"ConexionLED.html", {"cli":listarConexion_LED})

def consultaSesion_terapia(request): 
    listarSesion_terapia=Sesion_terapia.objects.all()
    return render(request,"SesionTerapia.html", {"cli":listarSesion_terapia})

def consultaEmociones(request): 
    listarEmociones=Emociones.objects.all()
    return render(request,"Emociones.html", {"cli":listarEmociones})

def consultasesion_Emo(request): 
    listarsesion_Emo=sesion_Emo.objects.all()
    return render(request,"SesionEmo.html", {"cli":listarsesion_Emo})

def consultaMultimedia(request): 
    listarMultimedia=Multimedia.objects.all()
    return render(request,"Multimedia.html", {"cli":listarMultimedia})

def consultaemo_multi(request): 
    listaremo_multi=emo_multi.objects.all()
    return render(request,"EmoMulti.html", {"cli":listaremo_multi})


def principal(request):
    return render(request, 'index.html')

#---------------------------------METODOS------------------------------
#---------------------------------METODOS USUARIO------------------------------
def frmformularioUsuarios(request):
    return render(request, 'gestionUsuario.html')



class listarUsuario(View):
    def get(self, request):
        datos = Usuario.objects.all().values()
        datosCli = list(datos)
        return JsonResponse(datosCli, safe=False)    
    

class InsertarUsuario(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request: HttpRequest, *args: Any, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    
    def post(self, request):
        datos = json.loads(request.body)
        request.POST.get('Id_usuario')
        request.POST.get('nombres') 
        request.POST.get('apellidos')
        request.POST.get('contraseña')
        request.POST.get('fechaN')
        request.POST.get('codigoVer')
        request.POST.get('img_perfil')
        request.POST.get('estado_cu')

        print('Datos del Usuario', request.POST)

        cli = Usuario.objects.create(Id_usuario=datos['Id_usuario'],   nombres=datos['nombres'],   apellidos=datos['apellidos'],   contraseña=datos['contraseña'],   fechaN=datos['fechaN'],   codigoVer=datos['codigoVer'],   img_perfil=datos['img_perfil'],   estado_cu=datos['estado_cu'])
        cli.save()
        return JsonResponse({'Mensaje':'Datos guardados'})
    

class actualizarUsuario(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request: HttpRequest, *args: Any, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    
    def put(self, request, pk):
        try:
            registro = Usuario.objects.get(pk=pk)

        except Usuario.DoesNotExist:
            return JsonResponse({'ERROR':'El id no existe'})
        
        data = json.loads(request.body)
        registro.Id_usuario = data.get('Id_usuario')
        registro.nombres = data.get('nombres')
        registro.apellidos = data.get('apellidos')
        registro.contraseña = data.get('contraseña')
        registro.fechaN = data.get('fechaN')
        registro.codigoVer = data.get('codigoVer')
        registro.img_perfil = data.get('img_perfil')
        registro.estado_cu = data.get('estado_cu')

        registro.save()
        return JsonResponse({'Mensaje':'Datos actualizados'})
    


class EliminarUsuario(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request: HttpRequest, *args: Any, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    
    def delete(self, request, pk):
        try:
            registro = Usuario.objects.get(pk=pk)

        except Usuario.DoesNotExist:
            return JsonResponse({'Error':'El id no existe'})
        

        registro.delete()
        return JsonResponse({'Mensaje':'Datos eliminados'})
    


#---------------------------------METODOS DE COMPROBANTE------------------------------

def frmformularioComprobante(request):
    return render(request, 'gestionComprobante.html')

class listarComrpobante(View):
    def get(self, request):
        datos = Comprbante.objects.all().values()
        datosComprobane = list(datos)
        return JsonResponse(datosComprobane, safe=False)
    

#class InsertarComprobante(View):
    #@method_decorator(csrf_exempt)
    #def dispatch(self, request: HttpRequest, *args: Any, **kwargs):
    #    return super().dispatch(request, *args, **kwargs)
    
    #def post(self, request):
    #    datos = json.loads(request.body)
    #    request.POST.get('Id_Comrpobante')
    #    request.POST.get('Id_usuario')
    #    request.POST.get('fecha_autu')
    #    request.POST.get('factura')
    #    request.POST.get('valor')
    #    print("Datos del Coprobante", request.POST)

    #    Compro = Comprbante.objects.create(Id_Comrpobante = datos['Id_Comrpobante'], Id_usuario=datos['Id_usuario'],  fecha_autu=datos['fecha_autu'],  factura=datos['factura'], valor=datos['valor'])
    #    Compro.save()
    #    return JsonResponse({'Mensaje':'Datos del comprobante guiardados'})

class InsertarComprobante(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request: HttpRequest, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request):
        datos = json.loads(request.body)
        Id_Comrpobante = datos.get('Id_Comrpobante')
        Id_usuario = datos.get('Id_usuario')
        fecha_autu = datos.get('fecha_autu')
        factura = datos.get('factura')
        valor = datos.get('valor')

        usuario = Usuario.objects.get(Id_usuario=Id_usuario)  # Obtener el objeto Usuario
        comprobante = Comprbante.objects.create(
            Id_Comrpobante=Id_Comrpobante,
            Id_usuario=Id_usuario,  # Asignar el objeto Usuario al campo de clave foránea
            fecha_autu=fecha_autu,
            factura=factura,
            valor=valor
        )
        comprobante.save()
        return JsonResponse({'Mensaje': 'Datos del comprobante guardados'})


class ActualizarComprobante(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request: HttpRequest, *args: Any, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    
    def put(self, request, pk):

        try:
            registro = Comprbante.objects.get(pk=pk)

        except Comprbante.DoesNotExist:
            return JsonResponse({'ERROR':'El Comprobante no existe'})
        

        data = json.loads(request.body)
        registro.Id_Comrpobante = data.get('Id_Comrpobante')
        registro.Id_usuario = data.get('Id_usuario')
        registro.fecha_autu = data.get('fecha_autu')
        registro.factura = data.get('factura')
        registro.valor = data.get('valor')

        registro.save()
        return JsonResponse({'Mensaje':'Datos cel comprobante actualizados'})
    

class EliminarComprobante(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request: HttpRequest, *args: Any, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    
    def delete(self, request, pk):
        try:
            registro = Comprbante.objects.get(pk=pk)

        except Comprbante.DoesNotExist:
            return JsonResponse({'Error':'El ID del comprobante no existe'})
        
        registro.delete()
        return JsonResponse({'Mensaje':'Comprobante eliminado'})






#---------------------------------METODOS DE SESION TERAPIA------------------------------
def frmformularioSesionTerapia(request):
    return render(request, 'gestionSesionTerapia.html')

class Listar_Sesion_Terapia(View):
    def get(self, request):
        datos = Sesion_terapia.objects.all().values()
        datosSesion = list(datos)
        return JsonResponse(datosSesion, safe=False)

class Isnertar_Sesion_Terapia(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request: HttpRequest, *args: Any, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    
    def post(self, request):
        datos = json.loads(request.body)
        request.POST.get('Id_sesion')
        request.POST.get('Id_conexion')
        request.POST.get('Id_usuario')
        request.POST.get('fecha_sesi')
        request.POST.get('nivel_satif')
        print('Datos de la Sesion de Terpia', request.POST)

        Sesion = Sesion_terapia.objects.create(Id_sesion=datos['Id_sesion'], Id_conexion=datos['Id_conexion'],   Id_usuario=datos['Id_usuario'],   fecha_sesi=datos['fecha_sesi'], nivel_satif=datos['nivel_satif'])
        Sesion.save()
        return JsonResponse({'Mensaje':'Datos de la Sesion de Terapia guaradados'})
    

class Actualizar_Sesion_Terpia(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request: HttpRequest, *args: Any, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    

    def put(self, request, pk):

        try:
            registro = Sesion_terapia.objects.get(pk=pk)

        except Sesion_terapia.DoesNotExist:
            return JsonResponse({'Error':'La ID de la sesión no existe'})
        
        data = json.loads(request.body)
        registro.Id_sesion = data.get('Id_sesion')
        registro.Id_conexion = data.get('Id_conexion')
        registro.Id_usuario = data.get('Id_usuario')
        registro.fecha_sesi = data.get('fecha_sesi')
        registro.nivel_satif = data.get('nivel_satif')

        registro.save()
        return JsonResponse({'Mensaje':'Datos de la Sesion de Terapi actualizados'})
    


class Eliminar_Sesion_terapia(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request: HttpRequest, *args: Any, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    
    def delete(self, request, pk):
        try:
            registro = Sesion_terapia.objects.get(pk=pk)

        except Sesion_terapia.DoesNotExist:
            return JsonResponse({'Error':'El ID de la sesion No se encuentra registrado'})
        
        registro.delete()
        return JsonResponse({'Mensaje':'Sesion de Terapia Eliminada'})
    


#---------------------------------METODOS DE CONEXION LED------------------------------
def frmformularioCoxionLed(request):
    return render(request, "gestionConexionLed.html")

class Listar_Conexiones_Led(View):
    def get(self, request):
        datos = Conexion_LED.objects.all().values()
        datos_Conexion = list(datos)
        return JsonResponse(datos_Conexion, safe=False)
    


class Insertar_Conexion_LED(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request: HttpRequest, *args: Any, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    

    def post(self, request):
        datos = json.loads(request.body)
        request.POST.get('Id_conexion')
        request.POST.get('Id_led')
        request.POST.get('C_estado')

        print('Datos de la Conexion LED', request.POST)

        Conexion_led = Conexion_LED.objects.create(Id_conexion=datos['Id_conexion'],  Id_led=datos['Id_led'],  C_estado=datos['C_estado'])
        Conexion_led.save()

        return JsonResponse({'mensaje':'Datos de la conexión guardados'})
    

class Actualizar_Conexion_Led(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request: HttpRequest, *args: Any, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    
    def put(self, request, pk):

        try:
            registro = Conexion_LED.objects.get(pk=pk)

        except Conexion_LED.DoesNotExist:
            return JsonResponse({'Error':'El ID de la conexión LED no existe para actualizar'})
        
        data = json.loads(request.body)
        registro.Id_conexion = data.get('Id_conexion')
        registro.Id_led = data.get('Id_led')
        registro.C_estado = data.get('C_estado')

        registro.save()
        return JsonResponse({'Mensaje':'Datos de la Conexion Actualizados'})
    

class Elimianr_Conexion(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request: HttpRequest, *args: Any, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    

    def delete(self, request, pk):

        try:
            registro = Conexion_LED.objects.get(pk=pk)

        except Conexion_LED.DoesNotExist:
            return JsonResponse({'Error':'El ID de la conexion no Existe para eliminmar'})
        
        registro.delete()
        return JsonResponse({'Mensaje':'Datos de la conexion LED eliminados'})
    

#---------------------------------METODOS DE SESIÓN EMOCIONAL------------------------------

def frmformularioSesionEmo(request):
    return render(request, "gestionSesionEmo.html")

class Listar_Sesion_Emocional(View):
    def get(self, request):
        datos = sesion_Emo.objects.all().values()
        datos_Sesion_emo = list(datos)
        return JsonResponse(datos_Sesion_emo, safe=False)

    

class Insertar_Sesion_Emocional(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request: HttpRequest, *args: Any, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    

    def post(self, request):

        datos = json.loads(request.body)
        request.POST.get('Id_sesion_emo')
        request.POST.get('Id_sesion')
        request.POST.get('Id_emocion')

        print('Datos de la Sesion Emocional', request.POST)

        Ses_emo = sesion_Emo.objects.create(Id_sesion_emo = datos['Id_sesion_emo'], Id_sesion=datos['Id_sesion'],  Id_emocion=datos['Id_emocion'])
        Ses_emo.save()
        return JsonResponse({'mensaje':'Datos de la sesion Emocional guardados'})
    

class Actualizar_Sesion_emocional(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request: HttpRequest, *args: Any, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    

    def put(self, request, pk):

        try:
            registro = sesion_Emo.objects.get(pk=pk)

        except sesion_Emo.DoesNotExist:
            return JsonResponse({'Error':'El ID de la sesion Emocoaional no existe'})
        

        data = json.loads(request.body)
        registro.Id_sesion_emo = data.get('Id_sesion_emo')
        registro.Id_sesion = data.get('Id_sesion')
        registro.Id_emocion = data.get('Id_emocion')

        registro.save()
        return JsonResponse({'Mensaje':'Datos de la Sesion Emocional actualizados'})
    

class Eliminar_Sesion_Emocional(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request: HttpRequest, *args: Any, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    

    def delete(self, request, pk):

        try:
            registro = sesion_Emo.objects.get(pk=pk)

        except sesion_Emo.DoesNotExist:
            return JsonResponse({'Error':'ID de Sesion Emocional no existente'})
        


#---------------------------------METODOS DE EMOCIONES------------------------------

def frmformularioEmociones(request):
    return render(request, "gestionEmociones.html")

class listar_Emociones(View):
    def get(self, request):
        datos = Emociones.objects.all().values()
        datos_Emociones = list(datos)
        return JsonResponse(datos_Emociones, safe=False)
    

class Insertar_Emocion(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request: HttpRequest, *args: Any, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    

    def post(self, request):
        datos = json.loads(request.body)
        request.POST.get('Id_emocion')
        request.POST.get('E_nombre')
        request.POST.get('E_coloBsc')
        request.POST.get('E_estadoA')
        print('Datos de la Emoción', request.POST)

        Emo = Emociones.objects.create(Id_emocion=datos['Id_emocion'],  E_nombre=datos['E_nombre'],  E_coloBsc=datos['E_coloBsc'],  E_estadoA=datos['E_estadoA'])
        Emo.save()
        return JsonResponse({'Mensaje':'Datos De emocion guardados'})
    

class Actualizar_Emociones(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request: HttpRequest, *args: Any, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    
    def put(self, request, pk):

        try:
            registro = Emociones.objects.get(pk=pk)

        except Emociones.DoesNotExist:
            return JsonResponse({'Error':'Id de la emocion no existente'})
        
        data = json.loads(request.body)
        registro.Id_emocion = data.get('Id_emocion')
        registro.E_nombre = data.get('E_nombre')
        registro.E_coloBsc = data.get('E_coloBsc')
        registro.E_estadoA = data.get('E_estadoA')

        registro.save()
        return JsonResponse({'Mensaje':'Datos de emoción Actualizados'})


class Elminar_Emociones(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request: HttpRequest, *args: Any, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    

    def delete(self, request, pk):

        try:
            registro = Emociones.objects.get(pk=pk)

        except Emociones.DoesNotExist:
            return JsonResponse({'Error':'Id de la emoción no existente'})
        
        registro.delete()
        return JsonResponse({'Mensaje':'Datos de la emocion Eliminados'})
    


#---------------------------------METODOS DE EMO MULTIMEDIA------------------------------
def frmformularioEmoMultimedia(request):
    return render(request, "gestionEmoMulti.html")

class Listar_Emo_Multimedia(View):
    def get(self, request):
        datos = emo_multi.objects.all().values()
        datos_Emo = list(datos)
        return JsonResponse(datos_Emo, safe=False)
    

class Insertar_Emo_Multiemdia(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request: HttpRequest, *args: Any, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    
    def post(self, request):
        datos = json.loads(request.body)
        request.POST.get('Id_emo_multi')
        request.POST.get('Id_emocion')
        request.POST.get('Id_elemento')
        print('Datos de la Emo_Multiemdia', request.POST)

        emo_m = emo_multi.objects.create(Id_emo_multi=datos['Id_emo_multi'],  Id_emocion=datos['Id_emocion'],   Id_elemento=datos['Id_elemento'])
        emo_m.save()
        return JsonResponse({'Mensaje':'Datos de emo_Multi guardados'})
    

class Actualizar_EMO_multi(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request: HttpRequest, *args: Any, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    
    def put(self, request, pk):

        try:
            registro = emo_multi.objects.get(pk=pk)
        
        except emo_multi.DoesNotExist:
            return JsonResponse({'Error':'ID de emo_multi no existente'})
        
        data = json.loads(request.body)
        registro.Id_emo_multi = data.get('Id_emo_multi')
        registro.Id_emocion = data.get('Id_emocion')
        registro.Id_elemento = data.get('Id_elemento')
        
        registro.save()
        return JsonResponse({'Mensaje':'Datos de Emo_multi Actualizados'})
    

class Eliminar_emo_Multi(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request: HttpRequest, *args: Any, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    
    def delete(self, request, pk):
        try:
            registro = emo_multi.objects.get(pk=pk)

        except emo_multi.DoesNotExist:
            return JsonResponse({'Error':'ID de emo_multi no existente'})
        
        registro.delete()
        return JsonResponse({'Mensaje':'Dato de emo_multi Eliminados'})
    


#---------------------------------METODOS DE MULTIMEDIA------------------------------
def frmformularioMultimedia(request):
    return render(request, "gestionMultimedia.html")

class listar_Multiemdia(View):
    def get(self, request):
        datos = Multimedia.objects.all().values()
        datos_Multimedia = list(datos)
        return JsonResponse(datos_Multimedia, safe=False)
    

class Insertar_Multimedia(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request: HttpRequest, *args: Any, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    

    def post(self, request):
        datos = json.loads(request.body)
        request.POST.get('Id_elemento')
        request.POST.get('Tipo_elemn')
        request.POST.get('ElementoM')
        request.POST.get('Autor')
        request.POST.get('M_estado')
        print('Datos de multimedia', request.POST)


        multi = Multimedia.objects.create(Id_elemento=datos['Id_elemento'],   Tipo_elemn=datos['Tipo_elemn'],  ElementoM=datos['ElementoM'],   Autor=datos['Autor'],  M_estado=datos['M_estado'])
        multi.save()
        return JsonResponse({'Mensaje':'Elemento multimedia insertador'})


class Actualizar_Mulrimedia(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request: HttpRequest, *args: Any, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    

    def put(self, request, pk):
        try:
            registro = Multimedia.objects.get(pk=pk)

        except Multimedia.DoesNotExist:
            return JsonResponse({'Error':'ID de elemento multimedia no existente'})
        
        data = json.loads(request.body)
        registro.Id_elemento = data.get('Id_elemento')
        registro.Tipo_elemn = data.get('Tipo_elemn')
        registro.ElementoM = data.get('ElementoM')
        registro.Autor = data.get('Autor')
        registro.M_estado = data.get('M_estado')

        registro.save()
        return JsonResponse({'Mensaje':'Elemento multimedia Actualizado'})
    

class Eliminar_Multimedia(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request: HttpRequest, *args: Any, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    
    def delete(self, request, pk):
        try:
            registro = Multimedia.objects.get(pk=pk)

        except Multimedia.DoesNotExist:
            
            return JsonResponse({'Error':'ID de elemento Multimedia no existente Para eliminar'})
        
        registro.delete()
        return JsonResponse({'Mensaje':'Elemento multiemdia eliminado'})