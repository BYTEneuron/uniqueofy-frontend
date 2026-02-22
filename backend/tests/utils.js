const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/User');
const { generateAccessToken } = require('../src/utils/token');

const createTestUser = async (phone = '9876543210', otp = '123456') => {
  const res = await request(app)
    .post('/api/auth/verify-otp')
    .send({ phone, otp });
  
  return {
    token: res.body.data.accessToken,
    user: res.body.data.user
  };
};

const createTestAdmin = async () => {
  // Create admin user directly in the database
  let user = await User.findOne({ phone: '0000000000' });
  if (!user) {
    user = await User.create({
      phone: '0000000000',
      firstName: 'Test',
      lastName: 'Admin',
      role: 'admin',
    });
  }

  const token = generateAccessToken(user);
  return {
    token,
    user: {
      id: user._id,
      phone: user.phone,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    },
  };
};

module.exports = {
  createTestUser,
  createTestAdmin
};
