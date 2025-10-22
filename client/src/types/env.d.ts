// allow importing plain CSS files as side-effects
declare module '*.css';
declare module '*.scss';
declare module '*.sass';
declare module '*.less';

// images/fonts etc (optional but handy)
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.webp';
declare module '*.woff';
declare module '*.woff2';
declare module '*.eot';
declare module '*.ttf';
declare module '*.otf';

// <reference types="vite/clien" />
interface ImportMetaEnv {
  readonly VITE_SERVER_BASE_URL: string;
  // add more environment variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
