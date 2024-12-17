import {Response} from './response.type';

export interface setFcmTokenRequest {
  fcm_token: string
}

export interface setFcmTokenResponse extends Response {
  metadata: string;
}

export interface signUpRequest {
  email: string;
  password: string;
}

export interface signUpResponse extends Response {
  metadata: {
    newUser: {
      email: string;
      status: string;
    };
    newOtp: {
      newOtp: {
        endTime: string;
        createAt: string;
      };
    };
  } | null;
}

export interface resendOtpRequest {
  email: string;
}

export interface resendOtpResponse extends Response {
  metadata: boolean;
}

export interface verifyOtpRequest {
  email: string;
  otp: string;
}

export interface verifyOtpResponse extends Response {
  metadata: {
    _id: string;
    email: string;
    status: string;
  };
}

export interface forgotPasswordRequest {
  email: string;
}

export interface forgotPasswordResponse extends Response {
  metadata: boolean;
}

export interface resetPasswordRequest {
  email: string;
  newPassword: string;
}

export interface resetPasswordResponse extends Response {
  metadata: boolean;
}

export interface loginRequest {
  email: string;
  password: string;
}

export interface loginResponse extends Response {
  metadata: {
    user: {
      _id: string;
      email: string;
      status: string;
    };
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
  };
}

export interface ref_accessTokenResponse extends Response {
  metadata: {
    accessToken: string;
  };
}
