import path from "path";

const FE_URL_DEV = "http://localhost:3000";
const FE_URL_LIVE = "";
const LOGS_DIR = path.join(__dirname, "..", "..", "logs");

export const APP_LOG = path.join(LOGS_DIR, "app.log");
export const REQUEST_LOG = path.join(LOGS_DIR, "request.log");
export const STAFF_ROLES = ["Admin", "Staff"] as const;
export const STATUSES = {
  SUCCESS: true,
  FAILED: false,
};

export const CORS_OPTIONS = {
  origin: [FE_URL_DEV, FE_URL_LIVE],
  credentials: true,
};

export const URLS = {
  root: "/api",
  chps: { root: "/chps", all: "/", one: "/:id" },
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

export const EMAIL = {
  reset: {
    subject: "Password Reset Request",
    getText: function (token: string) {
      return `You are receiving this because you (or someone else) has requested the reset of the password for your account.\n\n
                       Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n
                       http://localhost:8000/reset/${token}\n\n
                       If you did not request this, please ignore this email and your password will remain unchanged.`;
    },
  },
};
