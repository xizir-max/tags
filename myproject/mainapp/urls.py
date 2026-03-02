from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('catalog/', views.category_list),
    path('catalog/<int:category_id>/', views.category_detail),
    path('catalog/<int:category_id>/<int:subcategory_id>/',
         views.subcategory_detail),
    path('catalog/<int:category_id>/<int:subcategory_id>/'
         '<int:product_id>/', views.product_detail),
    path('tags/', views.tag_list),
    path('tags/<int:tag_id>/', views.tag_detail),
]