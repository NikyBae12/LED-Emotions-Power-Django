# Generated by Django 4.1.7 on 2023-05-19 20:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('appProyecto', '0004_sesion_terapia'),
    ]

    operations = [
        migrations.CreateModel(
            name='sesion_Emo',
            fields=[
                ('Id_sesion_emo', models.IntegerField(primary_key=True, serialize=False)),
                ('Id_emocion', models.IntegerField()),
                ('Id_sesion', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='appProyecto.sesion_terapia')),
            ],
        ),
    ]