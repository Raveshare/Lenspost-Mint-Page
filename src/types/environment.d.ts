// type declaration of environmet variables
namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    NEXT_PUBLIC_WALLETCONNECT_KEY: string;
    NODE_ENV: string;
  }
}
