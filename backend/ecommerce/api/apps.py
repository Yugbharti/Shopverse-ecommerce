from django.apps import AppConfig


class OrdersConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "api"  # Change this to your actual app name

    def ready(self):
        # This import is vital; it registers the signals when Django starts
        import api.signals
