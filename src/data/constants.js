const FE_URL_DEV = "http://localhost:3000";
const FE_URL_LIVE = "";

module.exports.CORS_OPTIONS = {
  origin: [FE_URL_DEV, FE_URL_LIVE],
  credentials: true,
};

module.exports.URLS = {
  root: "/api",
  user: { root: "/users", all: "/", one: "/:id" },
  patient: { root: "/patients", all: "/", one: "/:id" },
  inquiry: { root: "inquiries", submit: "/submit-inquiry" },
  prescription: { root: "/prescriptions", all: "/", one: "/:id" },
  auth: {
    root: "/auth",
    login: "/login",
    logout: "/logout",
    resetPassword: "/reset-password",
    forgotPassword: "/forgot-password",
  },
};
