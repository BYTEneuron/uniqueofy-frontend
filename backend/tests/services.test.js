const request = require('supertest');
const app = require('../src/app');
const { createTestAdmin, createTestUser } = require('./utils');
const Service = require('../src/models/Service');

describe('Services Endpoints', () => {
  let adminToken;
  let userToken;

  beforeEach(async () => {
    const adminAuth = await createTestAdmin();
    adminToken = adminAuth.token;

    const userAuth = await createTestUser();
    userToken = userAuth.token;
  });

  describe('POST /api/services', () => {
    it('should create a service when admin', async () => {
      const res = await request(app)
        .post('/api/services')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'AC Cleaning',
          description: 'Deep cleaning of AC unit',
          category: 'AC',
          isActive: true
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe('AC Cleaning');
    });

    it('should block non-admin from creating service', async () => {
      const res = await request(app)
        .post('/api/services')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          name: 'AC Cleaning',
          description: 'Deep cleaning',
          category: 'AC'
        });

      expect(res.statusCode).toEqual(403);
      expect(res.body.success).toBe(false);
    });

    it('should prevent duplicate service names', async () => {
      // Create first
      await request(app)
        .post('/api/services')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'AC Cleaning',
          description: 'First one',
          category: 'AC'
        });

      // Create duplicate
      const res = await request(app)
        .post('/api/services')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'AC Cleaning',
          description: 'Second one',
          category: 'AC'
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toBe('DUPLICATE_SERVICE');
    });
  });

  describe('GET /api/services', () => {
    it('should return only active services', async () => {
      // Create active service
      await Service.create({
        name: 'Active Service',
        description: 'Active',
        category: 'Test',
        isActive: true
      });

      // Create inactive service
      await Service.create({
        name: 'Inactive Service',
        description: 'Inactive',
        category: 'Test',
        isActive: false
      });

      const res = await request(app).get('/api/services');

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0].name).toBe('Active Service');
    });
  });
});
