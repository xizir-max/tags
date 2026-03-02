from django.shortcuts import render
from .models import *

def index(request):
    template = 'mainapp/index.html'
    context = {}
    return render(request, template, context)

def category_list(request):
    template = 'mainapp/category_list.html'
    context = {
        'categories': Category.objects.all()
    }
    return render(request, template, context)

def category_detail(request, category_id):
    template = 'mainapp/category_detail.html'
    context = {
        'category': Category.objects.get(id=category_id)
    }
    return render(request, template, context)

def subcategory_detail(request, category_id, subcategory_id):
    template = 'mainapp/subcategory_detail.html'
    context = {
        'subcategory': SubCategory.objects.get(id=subcategory_id)
    }
    return render(request, template, context)

def product_detail(request, category_id, subcategory_id,
                   product_id):
    template = 'mainapp/product_detail.html'
    context = {
        'product': Product.objects.get(id=product_id)
    }
    return render(request, template, context)

def tag_list(request):
    template = 'mainapp/tag_list.html'
    context = {
        'tags': Tag.objects.all()
    }
    return render(request, template, context)

def tag_detail(request, tag_id):
    template = 'mainapp/tag_detail.html'
    tag = Tag.objects.get(id=tag_id)
    context = {
        'tag': tag,
        'products': tag.products.all()
    }
    return render(request, template, context)

