// Shared, client-safe rate-limit constants (no server-only imports here, so
// this can be imported by both the server limiter and the login page UI).

export const MAX_LOGIN_ATTEMPTS = 6   // failed attempts per IP within the window
export const LOGIN_WINDOW_MIN = 15    // sliding window length (minutes)

export const LOCKOUT_MESSAGE =
  `Too many failed attempts. Please wait ${LOGIN_WINDOW_MIN} minutes and try again.`
