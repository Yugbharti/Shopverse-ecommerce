import django_filters
from .models import Product


class ProductFilter(django_filters.FilterSet):
    # This manually handles the 'category' query parameter
    category = django_filters.CharFilter(
        field_name="category__category_name", lookup_expr="icontains"
    )

    class Meta:
        model = Product
        fields = []
