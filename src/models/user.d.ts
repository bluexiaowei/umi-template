// ref: http://192.168.198.202/apidoc/auth_service/#api-User-UserLogin
// ['/user/login', '/user/login/token', ]

interface Role {
  id: number;
  name: string;
  is_inherent: number;
}

interface Application {
  id: number;
  name: string;
  roles: Role[];
}

export interface ResSignin {
  id: number;
  name: string;
  username: string;
  token: string;
  exp: string;
  is_admin: boolean;
  applications: Application[];
}

export interface ModelState {
  user?: ResSignin;
  projectName: string;
}
