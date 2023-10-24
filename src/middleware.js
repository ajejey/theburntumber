// without a defined matcher, this one line applies nextauth to the entire app
export { default } from 'next-auth/middleware'

// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher

export const config = { matcher: ["/profile"] }