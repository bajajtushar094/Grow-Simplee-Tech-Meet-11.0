from django.db import models


class Post(models.Model):
    file = models.FileField(upload_to='post_file')


    def __str__(self):
        return self.title