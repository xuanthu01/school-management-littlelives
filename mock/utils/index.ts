import { PaymentType } from "../../src/school/school.entity";
import { UserRole } from "../../src/auth/user.entity";

export const getRandomEl = (max: number) => Math.floor(Math.random() * Math.floor(max));
export const payment_types = [PaymentType.FREE, PaymentType.PAID];
export const roles = [UserRole.HQ, UserRole.SCHOOL_OWNER, UserRole.SCHOOL_TEACHER, UserRole.USER];
