from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=200, verbose_name='Название')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'


class SubCategory(models.Model):
    name = models.CharField(max_length=200, verbose_name='Название')
    category = models.ForeignKey(Category, on_delete=models.CASCADE,
                                 related_name='subcategories',
                                 verbose_name='Категория')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Подкатегория'
        verbose_name_plural = 'Подкатегории'


class Product(models.Model):
    name = models.CharField(max_length=200, verbose_name='Название')
    subcategory = models.ForeignKey(SubCategory,
                                    on_delete=models.CASCADE,
                                    related_name='products',
                                    verbose_name='Подкатегория')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Продукт'
        verbose_name_plural = 'Продукты'


class Tag(models.Model):
    name = models.CharField(max_length=200, verbose_name='Название')
    products = models.ManyToManyField(Product, related_name='tags',
                                      verbose_name='Продукты')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Тег'
        verbose_name_plural = 'Теги'