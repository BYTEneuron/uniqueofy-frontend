const request = require('supertest');
const app = require('../src/app');
const { createTestAdmin, createTestUser } = require('./utils');
const Service = require('../src/models/Service');
const Order = require('../src/models/Order');

describe('Admin Endpoints', () => {
  let adminToken;
  let userToken;
  let orderId;

  beforeEach(async () => {
    const adminAuth = await createTestAdmin();
    adminToken = adminAuth.token;

    const userAuth = await createTestUser();
    userToken = userAuth.token;

    // Create Service & Order for testing
    const service = await Service.create({
      name: 'Test Service',
      description: 'Desc',
      category: 'Test',
      isActive: true
    });

    const order = await Order.create({
      user: userAuth.user.id,
      services: [{ serviceId: service._id, name: 'Test Service', quantity: 1 }],
      serviceDate: new Date(Date.now() + 86400000),
      status: 'PENDING'
    });
    orderId = order._id;
  });

  describe('GET /api/admin/orders', () => {
    it('should return all orders for admin', async () => {
      const res = await request(app)
        .get('/api/admin/orders')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.length).toBeGreaterThanOrEqual(1);
    });

    it('should block non-admin access', async () => {
      const res = await request(app)
        .get('/api/admin/orders')
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.statusCode).toEqual(403);
    });
  });

  describe('PUT /api/admin/orders/:id/status', () => {
    it('should allow admin to update status PENDING -> CONFIRMED', async () => {
      const res = await request(app)
        .put(`/api/admin/orders/${orderId}/status`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ status: 'CONFIRMED' });

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.status).toBe('CONFIRMED');
    });

    it('should prevent invalid transition CONFIRMED -> PENDING', async () => {
      // First confirm it
      await request(app)
        .put(`/api/admin/orders/${orderId}/status`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ status: 'CONFIRMED' });

      // Try valid back to pending
      const res = await request(app)
        .put(`/api/admin/orders/${orderId}/status`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ status: 'PENDING' });

      expect(res.statusCode).toEqual(400); // Bad Request
      expect(res.body.success).toBe(false);
      expect(res.body.error).toBe('INVALID_STATUS_TRANSITION');
    });
  });

  describe('GET /api/admin/users', () => {
    it('should return list of users', async () => {
      const res = await request(app)
        .get('/api/admin/users')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });
});
