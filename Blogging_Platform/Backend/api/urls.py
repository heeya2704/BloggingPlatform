from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from backenddemo import settings
from django.conf.urls.static import static
from .views import LatestBlogsView, TrendingBlogsView

urlpatterns = [
    path('post/', views.PostAPIView.as_view(), name='post-create'),
    path('post/latest/', LatestBlogsView.as_view(), name='latest-blogs'),
    path('post/trending/', TrendingBlogsView.as_view(), name='trending-blogs'),
    path('post/<int:id>/', views.PostAPIView.as_view(), name='post-detail'),  # For both GET and PUT
    path('login/',views.UserLogin.as_view(),  name='login'),
    path("sign-up/",views.UserRegister.as_view(),name="user-sign-up"),
    path('filter-blogs/', views.filter_blogs_by_category, name='filter-blogs'),  # Add this line
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('media/<path:path>/', views.serve_media, name='serve_media'),
] 

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)