# Generated by Django 4.1.5 on 2023-06-13 20:16

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Game',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('game_type', models.CharField(max_length=10)),
                ('moves', models.IntegerField()),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('black_player', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='black_player', to=settings.AUTH_USER_MODEL)),
                ('white_player', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='white_player', to=settings.AUTH_USER_MODEL)),
                ('winner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='winner', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='GameReview',
            fields=[
                ('game', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, related_name='review', serialize=False, to='games.game')),
                ('moves', models.TextField()),
            ],
        ),
    ]
