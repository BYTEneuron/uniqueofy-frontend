const request = require('supertest');
const app = require('../src/app');
const { createTestUser, createTestAdmin } = require('./utils');
const Service = require('../src/models/Service');
const Order = require('../src/models/Order');

describe('Orders Endpoints', () => {
  let userToken;
  let serviceId;

  beforeEach(async () => {
    const userAuth = await createTestUser();
    userToken = userAuth.token;

    // Create a service directly in DB to use
    const service = await Service.create({
      name: 'Test Service',
      description: 'Test Desc',
      category: 'Test',
      isActive: true
    });
    serviceId = service._id;
  });

  describe('POST /api/orders', () => {
    it('should create an order with valid data', async () => {
      const res = await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          services: [{
            serviceId: serviceId,
            name: 'Test Service',
            quantity: 1
          }],
          serviceDate: new Date(Date.now() + 86400000).toISOString() // Tomorrow
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.status).toBe('PENDING');
      expect(res.body.data.user).toBeDefined();
    });

    it('should reject order with empty services', async () => {
      const res = await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          services: [],
          serviceDate: new Date(Date.now() + 86400000).toISOString()
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body.success).toBe(false);
    });

    it('should reject invalid service date (past date)', async () => {
      const res = await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          services: [{ serviceId, name: 'Test', quantity: 1 }],
          serviceDate: new Date(Date.now() - 86400000).toISOString() // Yesterday
        });

      expect(res.statusCode).toEqual(400);
    });
  });

  describe('GET /api/orders/myorders', () => {
    it('should return user orders', async () => {
      // Create an order first
      await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          services: [{ serviceId, name: 'Test', quantity: 1 }],
          serviceDate: new Date(Date.now() + 86400000).toISOString()
        });

      const res = await request(app)
        .get('/api/orders/myorders')
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.length).toBe(1);
    });
  });

  describe('PUT /api/orders/:id/cancel', () => {
    it('should allow user to cancel PENDING order', async () => {
      // Create order
      const orderRes = await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          services: [{ serviceId, name: 'Test', quantity: 1 }],
          serviceDate: new Date(Date.now() + 86400000).toISOString()
        });
      
      const orderId = orderRes.body.data._id;

      const res = await request(app)
        .put(`/api/orders/${orderId}/cancel`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.status).toBe('CANCELLED');
    });

    it('should prevent cancelling COMPLETED order', async () => {
      // Create order and manually set to COMPLETED
      const orderRes = await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          services: [{ serviceId, name: 'Test', quantity: 1 }],
          serviceDate: new Date(Date.now() + 86400000).toISOString()
        });
      
      const orderId = orderRes.body.data._id;
      await Order.findByIdAndUpdate(orderId, { status: 'COMPLETED' });

      const res = await request(app)
        .put(`/api/orders/${orderId}/cancel`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.statusCode).toEqual(400);
      expect(res.body.success).toBe(false);
    });
  });
});
