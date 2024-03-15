from django.db import models
# Create your models here.

class Base(models.Model):
    """
    Base model with boilerplate for all models.
    """

    name = models.CharField(max_length=200, blank=True, db_index=True, unique=True)
    slug = models.SlugField(null=True)

    class Meta:
        abstract = True
        ordering = ['name']

    def __str__(self):
        display_name = getattr(self, 'display_name', None)
        if display_name:
            return display_name
        return self.name

CONTINENT_CHOICES = (
    ('OC', 'Oceania'),
    ('EU', 'Europe'),
    ('AF', 'Africa'),
    ('NA', 'North America'),
    ('AN', 'Antarctica'),
    ('SA', 'South America'),
    ('AS', 'Asia'),
)

class Country(Base):
    """
    Country model.
    """
    display_name = models.CharField(max_length=200)
    code = models.CharField(max_length=3, null=True, blank=True, unique=True)
    continent = models.CharField(max_length=2, db_index=True, choices=CONTINENT_CHOICES)
    tld = models.CharField(max_length=5, blank=True, db_index=True)
    phone = models.CharField(max_length=20, null=True)

    class Meta(Base.Meta):
        verbose_name_plural = 'countries'

class Region(Base):
    """
    Region/State model.
    """

    display_name = models.CharField(max_length=200)
    code = models.CharField(max_length=5, null=True, blank=True, db_index=True)

    country = models.ForeignKey(Country, on_delete=models.CASCADE, verbose_name='country')

    class Meta(Base.Meta):
        unique_together = (('country', 'name'), ('country', 'slug'))
        verbose_name = 'region/state'
        verbose_name_plural = 'regions/states'

    def get_display_name(self):
        return '%s, %s' % (self.name, self.country.name)

class City(Base):
    """
    City model.
    """

    display_name = models.CharField(max_length=200)

    latitude = models.DecimalField(max_digits=8, decimal_places=5,
        null=True, blank=True)
    longitude = models.DecimalField(max_digits=8, decimal_places=5,
        null=True, blank=True)

    region = models.ForeignKey(Region, on_delete=models.CASCADE, verbose_name='region', blank=True, null=True)
    country = models.ForeignKey(Country, on_delete=models.CASCADE, verbose_name='country')
    code = models.CharField(max_length=5, null=True, blank=True, db_index=True)

    class Meta(Base.Meta):
        unique_together = (('region', 'name'), ('region', 'slug'))
        verbose_name_plural = 'cities'

    def get_display_name(self):
        if self.region_id:
            return '%s, %s, %s' % (self.name, self.region.name,
                self.country.name)