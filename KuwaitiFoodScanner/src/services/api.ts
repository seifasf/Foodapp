import { Product, User, PriceSubmission, ApiResponse, PaginatedResponse } from '../types';

const API_BASE_URL = 'https://api.kuwaitifoodscanner.com/v1';

class ApiService {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  // Set authentication token
  setToken(token: string | null) {
    this.token = token;
  }

  // Generic request method
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
      };

      if (this.token) {
        headers.Authorization = `Bearer ${this.token}`;
      }

      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || 'An error occurred',
        };
      }

      return {
        success: true,
        data: data.data || data,
        message: data.message,
      };
    } catch (error) {
      console.error('API request error:', error);
      return {
        success: false,
        error: 'Network error occurred',
      };
    }
  }

  // Product endpoints
  async getProductByBarcode(barcode: string): Promise<ApiResponse<Product>> {
    return this.request<Product>(`/products/barcode/${barcode}`);
  }

  async getProduct(productId: string): Promise<ApiResponse<Product>> {
    return this.request<Product>(`/products/${productId}`);
  }

  async searchProducts(query: string, page: number = 1, limit: number = 20): Promise<ApiResponse<PaginatedResponse<Product>>> {
    return this.request<PaginatedResponse<Product>>(
      `/products/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`
    );
  }

  async addProduct(product: Partial<Product>): Promise<ApiResponse<Product>> {
    return this.request<Product>('/products', {
      method: 'POST',
      body: JSON.stringify(product),
    });
  }

  async updateProduct(productId: string, updates: Partial<Product>): Promise<ApiResponse<Product>> {
    return this.request<Product>(`/products/${productId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  // User endpoints
  async registerUser(userData: Partial<User>): Promise<ApiResponse<User>> {
    return this.request<User>('/users/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async loginUser(email: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> {
    return this.request<{ user: User; token: string }>('/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async getUser(userId: string): Promise<ApiResponse<User>> {
    return this.request<User>(`/users/${userId}`);
  }

  async updateUser(userId: string, updates: Partial<User>): Promise<ApiResponse<User>> {
    return this.request<User>(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteUser(userId: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/users/${userId}`, {
      method: 'DELETE',
    });
  }

  // Price submission endpoints
  async submitPrice(priceData: Partial<PriceSubmission>): Promise<ApiResponse<PriceSubmission>> {
    return this.request<PriceSubmission>('/prices', {
      method: 'POST',
      body: JSON.stringify(priceData),
    });
  }

  async getPricesForProduct(productId: string): Promise<ApiResponse<PriceSubmission[]>> {
    return this.request<PriceSubmission[]>(`/prices/product/${productId}`);
  }

  async getUserPriceSubmissions(userId: string): Promise<ApiResponse<PriceSubmission[]>> {
    return this.request<PriceSubmission[]>(`/prices/user/${userId}`);
  }

  async verifyPrice(priceId: string, verified: boolean): Promise<ApiResponse<PriceSubmission>> {
    return this.request<PriceSubmission>(`/prices/${priceId}/verify`, {
      method: 'PATCH',
      body: JSON.stringify({ verified }),
    });
  }

  async reportPrice(priceId: string, reason: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/prices/${priceId}/report`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  }

  // Health score endpoints
  async calculateHealthScore(nutritionalFacts: any): Promise<ApiResponse<any>> {
    return this.request<any>('/health-score/calculate', {
      method: 'POST',
      body: JSON.stringify({ nutritionalFacts }),
    });
  }

  // Halal verification endpoints
  async verifyHalalStatus(productId: string): Promise<ApiResponse<{ halal: boolean; certification?: string }>> {
    return this.request<{ halal: boolean; certification?: string }>(`/halal/verify/${productId}`);
  }

  // Analytics endpoints
  async trackScan(productId: string, userId: string): Promise<ApiResponse<void>> {
    return this.request<void>('/analytics/scan', {
      method: 'POST',
      body: JSON.stringify({ productId, userId }),
    });
  }

  async trackPriceSubmission(priceId: string, userId: string): Promise<ApiResponse<void>> {
    return this.request<void>('/analytics/price-submission', {
      method: 'POST',
      body: JSON.stringify({ priceId, userId }),
    });
  }

  // Search and filter endpoints
  async getProductsByCategory(categoryId: string, page: number = 1, limit: number = 20): Promise<ApiResponse<PaginatedResponse<Product>>> {
    return this.request<PaginatedResponse<Product>>(
      `/products/category/${categoryId}?page=${page}&limit=${limit}`
    );
  }

  async getProductsByHealthScore(score: string, page: number = 1, limit: number = 20): Promise<ApiResponse<PaginatedResponse<Product>>> {
    return this.request<PaginatedResponse<Product>>(
      `/products/health-score/${score}?page=${page}&limit=${limit}`
    );
  }

  async getProductsByHalalStatus(halal: boolean, page: number = 1, limit: number = 20): Promise<ApiResponse<PaginatedResponse<Product>>> {
    return this.request<PaginatedResponse<Product>>(
      `/products/halal/${halal}?page=${page}&limit=${limit}`
    );
  }

  // Statistics endpoints
  async getUserStats(userId: string): Promise<ApiResponse<any>> {
    return this.request<any>(`/stats/user/${userId}`);
  }

  async getProductStats(productId: string): Promise<ApiResponse<any>> {
    return this.request<any>(`/stats/product/${productId}`);
  }

  async getGlobalStats(): Promise<ApiResponse<any>> {
    return this.request<any>('/stats/global');
  }
}

// Create singleton instance
const apiService = new ApiService();

export default apiService;
export { ApiService };
