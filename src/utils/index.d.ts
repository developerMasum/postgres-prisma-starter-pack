// express.d.ts
import { JwtPayload } from "./types/user";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
