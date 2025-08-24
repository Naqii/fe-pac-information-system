import { User, Session } from "next-auth";
import { JWT } from "next-auth/jwt";

interface ILogin {
  identifier: string;
  password: string;
}

interface UserExtended extends User {
  accessToken?: string;
  role?: string;
}

interface SessionExtended extends Session {
  accessToken?: string;
}

interface JWTExtended extends JWT {
  user?: UserExtended;
}

export type { ILogin, SessionExtended, JWTExtended, UserExtended };
