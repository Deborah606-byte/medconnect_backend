import { getAdminByAuthId } from "../db/queries/admin";
import { getDefaultStaff, getRoleByStaffId } from "../db/queries/staff";
import { STAFF_ROLES } from "../config/constants";
import { authUtil } from "../utils/auth";

class LoginService {
  private authId: string;
  private isAdminUser: boolean;

  constructor(authId: string, isAdmin: boolean) {
    this.authId = authId;
    this.isAdminUser = isAdmin;
  }

  private async loginSuperAdmin(id: string) {
    const admin = await getAdminByAuthId(id);
    if (!admin) return null;
    return { actor: admin, role: STAFF_ROLES[0] };
  }

  private async loginStaff(id: string) {
    const staff = await getDefaultStaff(id);
    const role = await getRoleByStaffId(staff?._id?.toString() ?? "");

    if (!staff || !role) return null;
    return { actor: staff, role: role.type };
  }

  public async getAuthedActor() {
    const method = this.isAdminUser ? this.loginSuperAdmin : this.loginStaff;
    console.log({ isAdmin: this.isAdminUser });
    const loginResponse = await method(this.authId);
    if (loginResponse === null) return null;

    const { actor, role } = loginResponse;
    const token = authUtil.generateToken({
      user: this.authId,
      actor: actor._id.toString(),
      role: role,
    });
    const userType = this.isAdminUser ? "admin" : "staff";

    return { auth: { id: this.authId, role, token }, [userType]: actor };
  }
}

export { LoginService };
