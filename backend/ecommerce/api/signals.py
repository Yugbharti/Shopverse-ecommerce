# api/signals.py
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import OrderItem


@receiver([post_save, post_delete], sender=OrderItem)
def update_order_totals(sender, instance, **kwargs):
    order = instance.order
    order.total_amount = order.calculate_total_amount()
    order.final_amount = order.calculate_final_amount()
    order.save(update_fields=["total_amount", "final_amount"])
