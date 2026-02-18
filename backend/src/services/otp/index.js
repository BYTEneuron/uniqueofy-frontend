const consoleProvider = require('./consoleProvider');

const sendOtp = async (phone, otp) => {
  const mode = process.env.OTP_DELIVERY_MODE || 'console';

  if (mode === 'console') {
    return consoleProvider.send(phone, otp);
  }

  if (mode === 'sms') {
    throw new Error('SMS provider not implemented yet');
  }

  throw new Error(`Invalid OTP_DELIVERY_MODE: ${mode}`);
};

module.exports = {
  sendOtp,
};
