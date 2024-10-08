from rest_framework import pagination

class ProductsPagination(pagination.PageNumberPagination):
    page_size = 10
    
class ReviewsPagination(pagination.PageNumberPagination):
    page_size = 5