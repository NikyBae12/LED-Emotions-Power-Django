from django.db import models

# Create your models here.

class Usuario(models.Model):
    Id_usuario = models.CharField(primary_key=True, max_length=20)
    nombres = models.CharField(max_length=255)
    apellidos = models.CharField(max_length=255)
    contraseña= models.CharField(max_length=15)
    fechaN = models.CharField(max_length=10)
    codigoVer = models.CharField(max_length=10)
    img_perfil = models.CharField(max_length=255)
    estado_cu = models.CharField(max_length=255)


class Comprbante(models.Model):
    Id_Comrpobante = models.CharField(primary_key=True, max_length=255)
    Id_usuario = models.ForeignKey(Usuario, null=True, on_delete=models.CASCADE)
    fecha_autu = models.CharField(max_length=10)
    factura = models.CharField(max_length=255)
    valor = models.IntegerField()




class Conexion_LED(models.Model):
    Id_conexion = models.IntegerField(primary_key=True)
    Id_led = models.CharField(max_length=255)
    C_estado = models.BooleanField()



class Sesion_terapia(models.Model):
    Id_sesion = models.IntegerField(primary_key=True)
    Id_conexion = models.ForeignKey(Conexion_LED, null=True, on_delete=models.CASCADE)
    Id_usuario = models.ForeignKey(Usuario, null=True, on_delete=models.CASCADE)
    Id_emocion = models.IntegerField()
    fecha_sesi = models.DateField()
    nivel_satif = models.IntegerField()



class Emociones(models.Model):
    Id_emocion = models.IntegerField(primary_key=True)
    E_nombre = models.CharField(max_length=255)
    E_coloBsc = models.CharField(max_length=255)
    E_estadoA = models.BooleanField()



class sesion_Emo(models.Model):
    Id_sesion_emo = models.IntegerField(primary_key=True)
    Id_sesion = models.ForeignKey(Sesion_terapia, null=True, on_delete=models.CASCADE)
    Id_emocion = models.ForeignKey(Emociones, null=True, on_delete=models.CASCADE)




class Multimedia(models.Model):
    Id_elemento = models.IntegerField(primary_key=True)
    Tipo_elemn = models.CharField(max_length=255)
    ElementoM = models.CharField(max_length=255)
    Autor = models.CharField(max_length=255)
    M_estado = models.BooleanField()



class emo_multi(models.Model):
    Id_emo_multi = models.IntegerField(primary_key=True)
    Id_emocion = models.ForeignKey(Emociones, null=True, on_delete=models.CASCADE)
    Id_elemento = models.ForeignKey(Multimedia, null=True, on_delete=models.CASCADE)


    