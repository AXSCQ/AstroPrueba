/// <reference path="../.astro/types.d.ts" />
declare var AOS: any;
/// <reference types="astro/client" />
declare module '*.astro' {
  import { AstroComponentFactory } from 'astro/runtime/server/index.js';
  const Component: AstroComponentFactory;
  export default Component;
}

declare module 'aos' {
  const aos: any;
  export default aos;
}