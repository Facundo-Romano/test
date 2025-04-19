import { UserRole } from "src/resources/users/user.entity";


class UserData {
    id: string;
    username: string;
    email: string;
    roles: UserRole[];
}
  
export class AuthResponse {
    access_token: string;
    user: UserData;
}