from django.db import models

# Create your models here.

class Usuario(models.Model):
    idUsuario = models.CharField(primary_key=True, max_length=20)
    nombres = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    contraseña= models.CharField(max_length=15)
    fechaN = models.DateField()
    codVerif = models.CharField(max_length=10)
    imgPerfil = models.CharField()
    estadoCuenta = models.CharField(max_length=255)


    def __str__(self):
        txt ="{0}{1}"
        return txt.format(self.Id_usuario,self.nombres, self.apellidos, self.contraseña, self.fechaN, self.codigoVer, self.img_perfil, self.estado_cu)


class Comprobante(models.Model):
    idComprobante = models.AutoField(primary_key=True)
    idUsuario = models.ForeignKey(Usuario, null=True)
    fechaActu = models.DateField()
    factura = models.CharField(max_length=255)
    valor = models.IntegerField()

    def __str__(self):
        txt ="{0}{1}"
        return txt.format(self.Id_Comrpobante,self.Id_usuario, self.fecha_autu, self.factura, self.valor)


class ConexionLED(models.Model):
    idConexion = models.AutoField(primary_key=True)
    idLed = models.CharField(max_length=255)
    cEstado = models.BooleanField()

    def __str__(self):
        txt ="{0}{1}"
        return txt.format(self.Id_conexion,self.Id_led, self.C_estado)



class SesionTerapia(models.Model):
    idSesion = models.AutoField(primary_key=True)
    idConexion = models.ForeignKey(ConexionLED, null=True)
    idUsuario = models.ForeignKey(Usuario, null=True)
    fechaSesion = models.DateField()
    nivelSatis = models.IntegerField()

    def __str__(self):
        txt ="{0}{1}"
        return txt.format(self.Id_sesion,self.Id_conexion, self.Id_usuario, self.Id_emocion, self.fecha_sesi, self.nivel_satif )



class Emocion(models.Model):
    idEmocion = models.AutoField(primary_key=True)
    eNombre = models.CharField(max_length=255)
    eColorRed = models.IntegerField()
    eColorGreen = models.IntegerField()
    eColorBlue = models.IntegerField()
    eEstadoA = models.BooleanField()

    def __str__(self):
        txt ="{0}{1}"
        return txt.format(self.Id_emocion,self.E_nombre, self.E_coloBsc, self.E_estadoA)



class SesionEmo(models.Model):
    idSeEmo = models.AutoField(primary_key=True)
    iDSesion = models.ForeignKey(SesionTerapia, null=True)
    idEmocion = models.ForeignKey(Emocion, null=True)

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
    Id_emocion = models.ForeignKey(Emocion, null=True, on_delete=models.CASCADE)
    Id_elemento = models.ForeignKey(Multimedia, null=True, on_delete=models.CASCADE)

    def __str__(self):
        txt ="{0}{1}"
        return txt.format(self.Id_emo_multi,self.Id_emocion, self.Id_elemento)


    