declare namespace NodeJS {
  interface ProcessEnv {
    CLERK_SECRET_KEY: string;
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: string;
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: string;
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: string;
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: string;
    DATABASE_URL: string;
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: string;
    STRIPE_API_KEY: string;
    STRIPE_WEBHOOK_SECRET: string;
    FRONTEND_STORE_URL: string;
  }
}
