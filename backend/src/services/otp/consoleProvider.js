const send = async (phone, otp) => {
  console.log(`[OTP] Sending OTP to ${phone}: ${otp}`);
  return Promise.resolve();
};

module.exports = {
  send,
};
