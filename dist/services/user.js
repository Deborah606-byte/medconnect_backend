"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginService = void 0;
const admin_1 = require("../db/queries/admin");
const staff_1 = require("../db/queries/staff");
const constants_1 = require("../config/constants");
const auth_1 = require("../utils/auth");
class LoginService {
    constructor(authId, isAdmin) {
        this.loginSuperAdmin = async () => {
            const admin = await (0, admin_1.getAdminByAuthId)(this.authId);
            if (!admin)
                return null;
            return { actor: admin, role: constants_1.STAFF_ROLES[0] };
        };
        this.loginStaff = async () => {
            const staff = await (0, staff_1.getDefaultStaff)(this.authId);
            const role = await (0, staff_1.getRoleByStaffId)(staff?._id?.toString() ?? "");
            if (!staff || !role)
                return null;
            return { actor: staff, role: role.type };
        };
        this.formatResponse = async (res) => {
            const { actor, role } = res;
            const token = auth_1.authUtil.generateToken({
                user: this.authId,
                actor: actor._id,
                role: role,
            });
            const userType = this.isAdminUser ? "admin" : "staff";
            return { auth: { id: this.authId, role, token }, [userType]: actor };
        };
        this.authId = authId;
        this.isAdminUser = isAdmin;
    }
    async getAuthedActor() {
        const method = this.isAdminUser ? this.loginSuperAdmin : this.loginStaff;
        const loginResponse = await method();
        if (loginResponse === null)
            return null;
        return this.formatResponse(loginResponse);
    }
    async authStaff(staffId) {
        const staff = await (0, staff_1.getStaffById)(staffId);
        const role = await (0, staff_1.getRoleByStaffId)(staff?._id?.toString() ?? "");
        if (!staff || !role)
            return null;
        return this.formatResponse({ actor: staff, role: role.type });
    }
}
exports.LoginService = LoginService;
