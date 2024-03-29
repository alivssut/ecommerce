# Generated by Django 5.0.3 on 2024-03-23 11:30

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0002_alter_product_options_category_product_category'),
    ]

    operations = [
        migrations.CreateModel(
            name='Attribute',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('slug', models.SlugField(allow_unicode=True, max_length=250, unique=True, verbose_name='slug')),
            ],
            options={
                'verbose_name': 'Attribute',
                'verbose_name_plural': 'Attributes',
            },
        ),
        migrations.CreateModel(
            name='ProductAttribute',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=200, null=True)),
                ('value', models.CharField(max_length=200)),
                ('attribute', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='attribute', to='product.attribute', verbose_name='attribute')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='product_attribute', to='product.product', verbose_name='product')),
            ],
            options={
                'verbose_name': 'Product Attribute',
                'verbose_name_plural': 'Product Attributes',
            },
        ),
        migrations.CreateModel(
            name='Variant',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sku', models.CharField(blank=True, max_length=200, null=True)),
                ('quantity', models.IntegerField(default=1, verbose_name='quantity')),
                ('price', models.IntegerField(default=0, verbose_name='price')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='variation', to='product.product', verbose_name='product')),
                ('product_attribute', models.ManyToManyField(related_name='product_attribute', to='product.productattribute', verbose_name='product attribute')),
            ],
            options={
                'verbose_name': 'Variant',
                'verbose_name_plural': 'Variants',
            },
        ),
    ]
