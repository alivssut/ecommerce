# Generated by Django 5.0.3 on 2024-03-24 12:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0003_attribute_productattribute_variant'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='product_type',
            field=models.CharField(choices=[('Simple', 'Simple'), ('Variable', 'Variable')], default='Simple', max_length=50, verbose_name='product type'),
        ),
    ]
