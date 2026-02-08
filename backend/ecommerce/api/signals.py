from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import OrderItem, Cart
from django.conf import settings
from django.db.models import Sum


@receiver([post_save, post_delete], sender=OrderItem)
def update_order_totals(sender, instance, **kwargs):
    """
    Automatically recalculates Order totals whenever an OrderItem
    is saved, updated, or deleted.
    """
    order = instance.order
    aggregate = order.order_items.aggregate(Sum("total_price"))
    order.total_amount = aggregate["total_price__sum"] or 0

    order.final_amount = order.calculate_final_amount()

    order.save(update_fields=["total_amount", "final_amount"])


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_user_cart(sender, instance, created, **kwargs):
    if created:
        Cart.objects.create(user=instance)
