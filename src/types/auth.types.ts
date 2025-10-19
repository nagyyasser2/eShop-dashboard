import type { Order } from "./orders.types";

export interface ApplicationUser {
  Id: string;
  UserName: string;
  Email?: string;
  PhoneNumber?: string;
  FirstName: string;
  LastName: string;
  Address?: string;
  City?: string;
  State?: string;
  ZipCode?: string;
  Country?: string;
  DateOfBirth: string;
  CreatedDate: string;
  IsActive: boolean;
  IsGoogleUser: boolean;
  ProfilePictureUrl?: string;
  GoogleId?: string;
  RefreshToken?: string;
  RefreshTokenExpiryTime: string;
  EmailConfirmed: boolean;
  Roles: string[];
  Orders?: Order[];
}

export interface AuthResponse {
  Success: boolean;
  Message: string;
  Data: {
    Token: string;
    RefreshToken: string;
    User: ApplicationUser;
  };
  Errors: string[];
}

export interface ApiResponse<T> {
  Success: boolean;
  Message: string;
  Data: T;
  Errors: string[];
}
