from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import OrderItem
from django.db.models import Sum


@receiver([post_save, post_delete], sender=OrderItem)
def update_order_totals(sender, instance, **kwargs):
    """
    Automatically recalculates Order totals whenever an OrderItem
    is saved, updated, or deleted.
    """
    order = instance.order

    # 1. Recalculate Total Amount (Sum of all items)
    # We use 'or 0' to handle the case where all items are deleted
    aggregate = order.order_items.aggregate(Sum("total_price"))
    order.total_amount = aggregate["total_price__sum"] or 0

    # 2. Recalculate Final Amount using your existing logic
    order.final_amount = order.calculate_final_amount()

    # 3. Save only the financial fields to avoid triggering other signals
    order.save(update_fields=["total_amount", "final_amount"])
