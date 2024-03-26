// type declaration of environmet variables
namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    NODE_ENV: string;
    WALLETCONNECT_KEY: string;
  }
}
