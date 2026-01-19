export const cookieOptions = {
    httpOnly: true,                                   // JS cannot read the cookie
    secure: process.env.NODE_ENV === 'production',    // only HTTPS in production
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // cross-domain in prod, strict in dev
    path: '/',
    maxAge: 24 * 60 * 60 * 1000                       // 1 day
};
