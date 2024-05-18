export interface JwtPayload {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER" | "MANAGER" | "SUPER_ADMIN";
  iat: number;
  exp: number;
}
