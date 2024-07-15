import path from "path";

const FE_URL_DEV = "http://localhost:3000";
const FE_URL_LIVE = "";
const LOGS_DIR = path.join(__dirname, "..", "..", "logs");

export const APP_LOG = path.join(LOGS_DIR, "app.log");
export const REQUEST_LOG = path.join(LOGS_DIR, "request.log");
export const STAFF_ROLES = ["Admin", "Staff"] as const;
export const GENDERS = ["Male", "Female", "Other"] as const;
export const MARITAL_STATUSES = [
  "Single",
  "Married",
  "Divorced",
  "Widowed",
] as const;
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
  chps: { root: "/chps-compound", all: "/", one: "/:id" },
  staff: {
    root: "/staff",
    all: "/",
    one: "/:id/all",
    role: "/role",
    chps: { all: "/:id", one: "/:id/:sid" },
  },
  patient: {
    root: "/patient",
    all: "/",
    chps: {
      all: "/chps/:id/",
      one: "/chps/:id/:pid",
    },
    prescription: {
      all: "/:pid/prescriptions/",
      one: "/:pid/prescriptions/:aid",
    },
    treatmentPlan: {
      all: "/:pid/treatment-plans",
      one: "/:pid/treatment-plans/:aid",
    },
    diagnosisReport: {
      all: "/:id/:pid/diagnosis-reports",
      one: "/:id/:pid/:aid",
    },
    visitLog: { all: "/:id/:pid/visit-logs", one: "/:id/:pid/:aid" },
    appointment: { all: "/:id/:pid/appointments", one: "/:id/:pid/:aid" },
  },
  inquiry: { root: "inquiries", submit: "/submit-inquiry" },
  auth: {
    root: "/auth",
    login: "/login",
    logout: "/logout",
    resetPassword: "/reset-password",
    forgotPassword: "/forgot-password",
    switch: "/switch-staff/:id",
  },
  admin: {
    root: "/admin",
    all: "/",
    one: "/:id",
    me: "/me",
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
