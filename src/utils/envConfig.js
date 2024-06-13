const envConfig = {
  app_host_name: process.env.APP_HOST_NAME,
  app_email: process.env.APP_EMAIL,
  app_password: process.env.APP_PASSWORD,
  app_port: process.env.APP_PORT,
  secretKey: process.env.JWT_SECRET,
  mongodb_url: process.env.ATLAS_URI,
  port: process.env.PORT || 8000,
  deployed_frontend_url: process.env.DEPLOYED_FRONTEND_URL,
};

module.exports = envConfig;
