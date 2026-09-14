import { jwtVerify } from 'jose';

const AUTH_BASE_URL = 'https://ep-jolly-leaf-alfakwe1.neonauth.c-3.eu-central-1.aws.neon.tech/neondb/auth';
const JWKS_URL = `${AUTH_BASE_URL}/.well-known/jwks.json`;

let jwksCache = null;
let jwksCacheTime = 0;
const JWKS_CACHE_TTL = 60000; // 1 minuto

export const authService = {
  async getJWKS() {
    const now = Date.now();
    if (jwksCache && now - jwksCacheTime < JWKS_CACHE_TTL) {
      return jwksCache;
    }

    try {
      const response = await fetch(JWKS_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch JWKS');
      }
      jwksCache = await response.json();
      jwksCacheTime = now;
      return jwksCache;
    } catch (error) {
      console.error('Error fetching JWKS:', error);
      throw error;
    }
  },

  async verifyToken(token) {
    try {
      const jwks = await this.getJWKS();
      
      const jwksWrapper = {
        keys: jwks.keys.map(key => ({
          ...key,
          alg: key.alg || 'RS256',
        })),
      };

      const verified = await jwtVerify(token, jwksWrapper);
      return verified.payload;
    } catch (error) {
      console.error('Token verification failed:', error);
      throw error;
    }
  },

  async login(email, password) {
    try {
      const response = await fetch(`${AUTH_BASE_URL}/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'password',
          username: email,
          password: password,
          client_id: 'fluxo-agil-client',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error_description || 'Login failed');
      }

      const data = await response.json();
      
      // Armazenar tokens de forma segura
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      localStorage.setItem('token_expires_at', (Date.now() + data.expires_in * 1000).toString());
      
      // Decodificar payload do token para obter informações do usuário
      const userInfo = await this.verifyToken(data.access_token);
      
      return {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiresIn: data.expires_in,
        user: userInfo,
      };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  async refreshToken(refreshToken) {
    try {
      const response = await fetch(`${AUTH_BASE_URL}/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
          client_id: 'fluxo-agil-client',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }

      const data = await response.json();
      
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      localStorage.setItem('token_expires_at', (Date.now() + data.expires_in * 1000).toString());
      
      const userInfo = await this.verifyToken(data.access_token);
      
      return {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiresIn: data.expires_in,
        user: userInfo,
      };
    } catch (error) {
      console.error('Refresh token error:', error);
      throw error;
    }
  },

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('token_expires_at');
    localStorage.removeItem('user_role');
  },

  getToken() {
    return localStorage.getItem('access_token');
  },

  getRefreshToken() {
    return localStorage.getItem('refresh_token');
  },

  isTokenExpired() {
    const expiresAt = localStorage.getItem('token_expires_at');
    if (!expiresAt) return true;
    
    const expiresTime = parseInt(expiresAt);
    // Refresh 5 minutos antes da expiração
    return Date.now() >= (expiresTime - 300000);
  },

  isAuthenticated() {
    const token = this.getToken();
    if (!token) return false;
    
    if (this.isTokenExpired()) {
      return false;
    }
    
    return true;
  },

  async getCurrentUser() {
    const token = this.getToken();
    if (!token) return null;
    
    try {
      const payload = await this.verifyToken(token);
      return payload;
    } catch (_error) {
      return null;
    }
  },

  // Registrar novo usuário
  async register(userData) {
    try {
      const response = await fetch(`${AUTH_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Registration failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  // Recuperar senha
  async resetPassword(email) {
    try {
      const response = await fetch(`${AUTH_BASE_URL}/recovery`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to send recovery email');
      }

      return true;
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  },
};

export default authService;
