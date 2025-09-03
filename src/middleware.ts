export { default } from 'next-auth/middleware';

export const config = {
    matcher: ['/stuff-creation/:path*'],
};
