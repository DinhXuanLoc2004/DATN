import { Response } from "./response.type";

export interface loginRequest {
  email: string;
  password: string;
}

export interface loginResponse extends Response {
  metadata: {
    user: {
      _id: string;
      email: string,
      status: string
    };
    tokens: {
        accessToken: string,
        refreshToken: string
    }
  };
}

export interface ref_accessTokenResponse extends Response{
  metadata: {
    accessToken: string
  }
}
