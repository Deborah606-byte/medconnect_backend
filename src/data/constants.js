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
