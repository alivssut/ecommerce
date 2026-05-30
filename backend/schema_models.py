# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class AccountEmailaddress(models.Model):
    email = models.CharField(unique=True, max_length=254)
    verified = models.BooleanField()
    primary = models.BooleanField()
    user = models.ForeignKey('AccountsUser', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'account_emailaddress'
        unique_together = (('user', 'email'),)


class AccountEmailconfirmation(models.Model):
    created = models.DateTimeField()
    sent = models.DateTimeField(blank=True, null=True)
    key = models.CharField(unique=True, max_length=64)
    email_address = models.ForeignKey(AccountEmailaddress, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'account_emailconfirmation'


class AccountsUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField()
    id = models.UUIDField(primary_key=True)

    class Meta:
        managed = False
        db_table = 'accounts_user'


class AccountsUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AccountsUser, models.DO_NOTHING)
    group = models.ForeignKey('AuthGroup', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'accounts_user_groups'
        unique_together = (('user', 'group'),)


class AccountsUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AccountsUser, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'accounts_user_user_permissions'
        unique_together = (('user', 'permission'),)


class AccountsUseraddress(models.Model):
    id = models.BigAutoField(primary_key=True)
    full_name = models.CharField(max_length=60)
    phone = models.CharField(max_length=20)
    address = models.CharField(max_length=250)
    post_code = models.IntegerField(blank=True, null=True)
    selected = models.BooleanField()
    city = models.ForeignKey('LocationCity', models.DO_NOTHING)
    country = models.ForeignKey('LocationCountry', models.DO_NOTHING)
    province = models.ForeignKey('LocationRegion', models.DO_NOTHING)
    user = models.ForeignKey(AccountsUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'accounts_useraddress'


class AccountsUserprofile(models.Model):
    id = models.UUIDField(primary_key=True)
    phone = models.CharField(max_length=20)
    national_code = models.CharField(max_length=20)
    image = models.CharField(max_length=100, blank=True, null=True)
    user = models.OneToOneField(AccountsUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'accounts_userprofile'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthtokenToken(models.Model):
    key = models.CharField(primary_key=True, max_length=40)
    created = models.DateTimeField()
    user = models.OneToOneField(AccountsUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'authtoken_token'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.SmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AccountsUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class LocationCity(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(unique=True, max_length=200)
    slug = models.CharField(max_length=50, blank=True, null=True)
    display_name = models.CharField(max_length=200)
    latitude = models.DecimalField(max_digits=8, decimal_places=5, blank=True, null=True)
    longitude = models.DecimalField(max_digits=8, decimal_places=5, blank=True, null=True)
    code = models.CharField(max_length=5, blank=True, null=True)
    country = models.ForeignKey('LocationCountry', models.DO_NOTHING)
    region = models.ForeignKey('LocationRegion', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'location_city'
        unique_together = (('region', 'slug'), ('region', 'name'),)


class LocationCountry(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(unique=True, max_length=200)
    slug = models.CharField(max_length=50, blank=True, null=True)
    display_name = models.CharField(max_length=200)
    code = models.CharField(unique=True, max_length=3, blank=True, null=True)
    continent = models.CharField(max_length=2)
    tld = models.CharField(max_length=5)
    phone = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'location_country'


class LocationRegion(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(unique=True, max_length=200)
    slug = models.CharField(max_length=50, blank=True, null=True)
    display_name = models.CharField(max_length=200)
    code = models.CharField(max_length=5, blank=True, null=True)
    country = models.ForeignKey(LocationCountry, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'location_region'
        unique_together = (('country', 'name'), ('country', 'slug'),)


class OrderOrder(models.Model):
    id = models.BigAutoField(primary_key=True)
    address_post_code = models.IntegerField(blank=True, null=True)
    code = models.CharField(max_length=10)
    status = models.CharField(max_length=20)
    full_name = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    phone = models.CharField(max_length=100)
    ip = models.CharField(max_length=20)
    created = models.DateTimeField()
    updated = models.DateTimeField()
    address = models.ForeignKey(AccountsUseraddress, models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AccountsUser, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'order_order'


class OrderOrderitem(models.Model):
    id = models.BigAutoField(primary_key=True)
    quantity = models.IntegerField()
    price = models.IntegerField()
    amount = models.IntegerField()
    status = models.CharField(max_length=30)
    created = models.DateTimeField()
    updated = models.DateTimeField()
    order = models.ForeignKey(OrderOrder, models.DO_NOTHING)
    product = models.ForeignKey('ProductProduct', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AccountsUser, models.DO_NOTHING, blank=True, null=True)
    variant = models.ForeignKey('ProductVariant', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'order_orderitem'


class PaymentPayment(models.Model):
    id = models.BigAutoField(primary_key=True)
    amount = models.IntegerField()
    status = models.CharField(max_length=30)
    created = models.DateTimeField()
    updated = models.DateTimeField()
    order = models.ForeignKey(OrderOrder, models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AccountsUser, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'payment_payment'


class ProductAttribute(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=200)
    slug = models.CharField(unique=True, max_length=250)

    class Meta:
        managed = False
        db_table = 'product_attribute'


class ProductBrand(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(unique=True, max_length=100)
    slug = models.CharField(unique=True, max_length=250)
    description = models.TextField(blank=True, null=True)
    is_active = models.BooleanField()
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'product_brand'


class ProductCategory(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=200, blank=True, null=True)
    slug = models.CharField(max_length=50, blank=True, null=True)
    image = models.CharField(max_length=100)
    description = models.CharField(max_length=150, blank=True, null=True)
    is_active = models.BooleanField()
    created = models.DateTimeField()
    updated = models.DateTimeField()
    parent = models.ForeignKey('self', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'product_category'


class ProductProduct(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=200)
    sku = models.CharField(max_length=200, blank=True, null=True)
    image = models.CharField(max_length=100)
    price = models.IntegerField()
    amount = models.IntegerField()
    slug = models.CharField(unique=True, max_length=250)
    status = models.CharField(max_length=50)
    product_type = models.CharField(max_length=50)
    visibility = models.CharField(max_length=50)
    created = models.DateTimeField()
    updated = models.DateTimeField()
    description = models.TextField(blank=True, null=True)
    brand = models.ForeignKey(ProductBrand, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'product_product'


class ProductProductCategory(models.Model):
    id = models.BigAutoField(primary_key=True)
    product = models.ForeignKey(ProductProduct, models.DO_NOTHING)
    category = models.ForeignKey(ProductCategory, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'product_product_category'
        unique_together = (('product', 'category'),)


class ProductProductattribute(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=200, blank=True, null=True)
    value = models.CharField(max_length=200)
    attribute = models.ForeignKey(ProductAttribute, models.DO_NOTHING, blank=True, null=True)
    product = models.ForeignKey(ProductProduct, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'product_productattribute'


class ProductProductimage(models.Model):
    id = models.BigAutoField(primary_key=True)
    image = models.CharField(max_length=100)
    alt_text = models.CharField(max_length=255)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    product = models.ForeignKey(ProductProduct, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'product_productimage'


class ProductReviewrating(models.Model):
    id = models.BigAutoField(primary_key=True)
    subject = models.CharField(max_length=100)
    review = models.TextField()
    rating = models.SmallIntegerField()
    status = models.CharField(max_length=20)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    product = models.ForeignKey(ProductProduct, models.DO_NOTHING)
    user = models.ForeignKey(AccountsUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'product_reviewrating'


class ProductVariant(models.Model):
    id = models.BigAutoField(primary_key=True)
    sku = models.CharField(max_length=200, blank=True, null=True)
    quantity = models.IntegerField()
    price = models.IntegerField()
    product = models.ForeignKey(ProductProduct, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'product_variant'


class ProductVariantProductAttribute(models.Model):
    id = models.BigAutoField(primary_key=True)
    variant = models.ForeignKey(ProductVariant, models.DO_NOTHING)
    productattribute = models.ForeignKey(ProductProductattribute, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'product_variant_product_attribute'
        unique_together = (('variant', 'productattribute'),)
