const API_BASE_URL = 'https://ep-jolly-leaf-alfakwe1.apirest.c-3.eu-central-1.aws.neon.tech/neondb/rest/v1';
import authService from './auth';

export const api = {
  async fetch(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    // Obter token de autenticação
    const _token = authService.getToken();
    
    // Verificar se o token precisa ser refreshado
    if (authService.isTokenExpired()) {
      const refreshToken = authService.getRefreshToken();
      if (refreshToken) {
        try {
          await authService.refreshToken(refreshToken);
        } catch (_error) {
          authService.logout();
          window.location.href = '/login';
          throw new Error('Session expired');
        }
      } else {
        throw new Error('No valid token');
      }
    }
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authService.getToken()}`,
        'Prefer': 'return=representation',
        ...options.headers,
      },
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        authService.logout();
        window.location.href = '/login';
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  },

  // Shifts (Plantões)
  async getShifts() {
    return this.fetch('/shifts');
  },

  async getShiftById(id) {
    return this.fetch(`/shifts?id=eq.${id}`);
  },

  async createShift(shift) {
    return this.fetch('/shifts', {
      method: 'POST',
      body: JSON.stringify(shift),
    });
  },

  async updateShift(id, shift) {
    return this.fetch(`/shifts?id=eq.${id}`, {
      method: 'PATCH',
      body: JSON.stringify(shift),
    });
  },

  async deleteShift(id) {
    return this.fetch(`/shifts?id=eq.${id}`, {
      method: 'DELETE',
    });
  },

  // Professionals (Profissionais)
  async getProfessionals() {
    return this.fetch('/professionals');
  },

  async getProfessionalById(id) {
    return this.fetch(`/professionals?id=eq.${id}`);
  },

  async createProfessional(professional) {
    return this.fetch('/professionals', {
      method: 'POST',
      body: JSON.stringify(professional),
    });
  },

  async updateProfessional(id, professional) {
    return this.fetch(`/professionals?id=eq.${id}`, {
      method: 'PATCH',
      body: JSON.stringify(professional),
    });
  },

  // Sectors (Setores)
  async getSectors() {
    return this.fetch('/sectors');
  },

  async createSector(sector) {
    return this.fetch('/sectors', {
      method: 'POST',
      body: JSON.stringify(sector),
    });
  },

  // Exchanges (Trocas)
  async getExchanges() {
    return this.fetch('/exchanges');
  },

  async createExchange(exchange) {
    return this.fetch('/exchanges', {
      method: 'POST',
      body: JSON.stringify(exchange),
    });
  },

  async updateExchange(id, exchange) {
    return this.fetch(`/exchanges?id=eq.${id}`, {
      method: 'PATCH',
      body: JSON.stringify(exchange),
    });
  },
};

export default api;
