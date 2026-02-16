const request = require('supertest');
const app = require('../src/app');

const createTestUser = async (phone = '9876543210', otp = '123456') => {
  const res = await request(app)
    .post('/api/auth/verify-otp')
    .send({ phone, otp });
  
  return {
    token: res.body.data.token,
    user: res.body.data.user
  };
};

const createTestAdmin = async () => {
  // 0000000000 is hardcoded as admin in authController
  const res = await request(app)
    .post('/api/auth/verify-otp')
    .send({ phone: '0000000000', otp: '123456' });
    
  return {
    token: res.body.data.token,
    user: res.body.data.user
  };
};

module.exports = {
  createTestUser,
  createTestAdmin
};
