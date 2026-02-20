type Id = number | `${number}`;

export type ApiPath =
  | '/auth/signin'
  | '/auth/signup'
  | '/auth/logout'
  | `/auth/signIn/${string}`
  | '/images/upload'
  | '/oauthApps'
  | '/reviews'
  | `/reviews/${Id}`
  | `/reviews/${Id}/like`
  | '/users/me'
  | '/users/me/reviews'
  | '/users/me/wines'
  | '/wines'
  | `/wines/${Id}`
  | '/wines/recommended';
