const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/User');

describe('Auth Endpoints', () => {
  describe('POST /api/auth/verify-otp', () => {
    it('should register a new user with valid OTP', async () => {
      const res = await request(app)
        .post('/api/auth/verify-otp')
        .send({
          phone: '9988776655',
          otp: '123456'
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('token');
      expect(res.body.data.user.phone).toBe('9988776655');
      expect(res.body.data.user.role).toBe('user');
    });

    it('should login as admin with specific phone number', async () => {
      const res = await request(app)
        .post('/api/auth/verify-otp')
        .send({
          phone: '0000000000',
          otp: '123456'
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.user.role).toBe('admin');
      expect(res.body.data.user.firstName).toBe('Dheeraj');
    });

    it('should reject invalid OTP', async () => {
      const res = await request(app)
        .post('/api/auth/verify-otp')
        .send({
          phone: '9988776655',
          otp: '000000'
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toBe('INVALID_OTP');
    });

    it('should reject invalid phone format', async () => {
      const res = await request(app)
        .post('/api/auth/verify-otp')
        .send({
          phone: '123',
          otp: '123456'
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toBe('VALIDATION_ERROR');
    });
  });

  describe('GET /api/auth/me', () => {
    it('should return current user profile', async () => {
      // Create user and get token
      const authRes = await request(app)
        .post('/api/auth/verify-otp')
        .send({ phone: '9988776655', otp: '123456' });
      
      const token = authRes.body.data.token;

      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.phone).toBe('9988776655');
    });

    it('should reject request without token', async () => {
      const res = await request(app).get('/api/auth/me');

      expect(res.statusCode).toEqual(401);
      expect(res.body.success).toBe(false);
    });

    it('should reject request with invalid token', async () => {
      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', 'Bearer invalidtoken');

      expect(res.statusCode).toEqual(401);
      expect(res.body.success).toBe(false);
    });
  });
});
