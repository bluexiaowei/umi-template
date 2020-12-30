declare namespace API {
  // 用户基本信息

  export interface LoginReq {
    username: string;
    password: string;
  }

  export interface LoginRes {
    user_id: number;
    username: string;
    token: string;
  }
}
