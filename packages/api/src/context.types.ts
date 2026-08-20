export type AuthUser = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type AuthSession = {
  user: AuthUser;
  session: {
    id: string;
    userId: string;
    expiresAt: Date;
    token: string;
  };
};

export type Context = {
  requestId: string;
  session: AuthSession | null;
  user: AuthUser | null;
};

export type CreateContextOptions = {
  req?: Request;
  requestId?: string;
  session?: AuthSession | null;
  user?: AuthUser | null;
};
