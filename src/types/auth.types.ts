import type { Order } from "./orders.types";

export interface ApplicationUser {
  id: string; // IdentityUser PK
  userName: string;
  email?: string;
  phoneNumber?: string;
  firstName: string;
  lastName: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  dateOfBirth: string; // ISO Date
  createdDate: string;
  isActive: boolean;
  isGoogleUser: boolean;
  profilePictureUrl?: string;
  googleId?: string;
  refreshToken?: string;
  refreshTokenExpiryTime: string;
  orders?: Order[];
}
