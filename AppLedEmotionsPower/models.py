from django.db import models

# Create your models here.

class Usuario(models.Model):
    Id_usuario = models.CharField(primary_key=True, max_length=20)
    nombres = models.CharField(max_length=255)
    apellidos = models.CharField(max_length=255)
    contraseña= models.CharField(max_length=15)
    fechaN = models.DateField()
    codigoVer = models.CharField(max_length=10)
    img_perfil = models.CharField(max_length=255)
    estado_cu = models.CharField(max_length=255)


    def __str__(self):
        txt ="{0}{1}"
        return txt.format(self.Id_usuario,self.nombres, self.apellidos, self.contraseña, self.fechaN, self.codigoVer, self.img_perfil, self.estado_cu)


class Comprbante(models.Model):
    Id_Comrpobante = models.CharField(primary_key=True, max_length=255)
    Id_usuario = models.ForeignKey(Usuario, null=True, on_delete=models.CASCADE)
    fecha_autu = models.CharField(max_length=10)
    factura = models.CharField(max_length=255)
    valor = models.IntegerField()

    def __str__(self):
        txt ="{0}{1}"
        return txt.format(self.Id_Comrpobante,self.Id_usuario, self.fecha_autu, self.factura, self.valor)


class Conexion_LED(models.Model):
    Id_conexion = models.IntegerField(primary_key=True)
    Id_led = models.CharField(max_length=255)
    C_estado = models.BooleanField()

    def __str__(self):
        txt ="{0}{1}"
        return txt.format(self.Id_conexion,self.Id_led, self.C_estado)



class Sesion_terapia(models.Model):
    Id_sesion = models.IntegerField(primary_key=True)
    Id_conexion = models.ForeignKey(Conexion_LED, null=True, on_delete=models.CASCADE)
    Id_usuario = models.ForeignKey(Usuario, null=True, on_delete=models.CASCADE)
    Id_emocion = models.IntegerField()
    fecha_sesi = models.DateField()
    nivel_satif = models.IntegerField()

    def __str__(self):
        txt ="{0}{1}"
        return txt.format(self.Id_sesion,self.Id_conexion, self.Id_usuario, self.Id_emocion, self.fecha_sesi, self.nivel_satif )



class Emociones(models.Model):
    Id_emocion = models.IntegerField(primary_key=True)
    E_nombre = models.CharField(max_length=255)
    E_coloBsc = models.CharField(max_length=255)
    E_estadoA = models.BooleanField()

    def __str__(self):
        txt ="{0}{1}"
        return txt.format(self.Id_emocion,self.E_nombre, self.E_coloBsc, self.E_estadoA)



class sesion_Emo(models.Model):
    Id_sesion_emo = models.IntegerField(primary_key=True)
    Id_sesion = models.ForeignKey(Sesion_terapia, null=True, on_delete=models.CASCADE)
    Id_emocion = models.ForeignKey(Emociones, null=True, on_delete=models.CASCADE)

    def __str__(self):
        txt ="{0}{1}"
        return txt.format(self.Id_sesion_emo,self.Id_sesion, self.Id_emocion)




class Multimedia(models.Model):
    Id_elemento = models.IntegerField(primary_key=True)
    Tipo_elemn = models.CharField(max_length=255)
    ElementoM = models.CharField(max_length=255)
    Autor = models.CharField(max_length=255)
    M_estado = models.BooleanField()

    def __str__(self):
        txt ="{0}{1}"
        return txt.format(self.Id_elemento,self.Tipo_elemn, self.ElementoM, self.Autor, self.M_estado)



class emo_multi(models.Model):
    Id_emo_multi = models.IntegerField(primary_key=True)
    Id_emocion = models.ForeignKey(Emociones, null=True, on_delete=models.CASCADE)
    Id_elemento = models.ForeignKey(Multimedia, null=True, on_delete=models.CASCADE)

    def __str__(self):
        txt ="{0}{1}"
        return txt.format(self.Id_emo_multi,self.Id_emocion, self.Id_elemento)


    