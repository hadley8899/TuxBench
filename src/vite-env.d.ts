/// <reference types="svelte" />
/// <reference types="vite/client" />

interface TuxBenchApi {
  checkMangoHud: () => Promise<boolean>;
}

declare global {
  interface Window {
    tuxbenchApi: TuxBenchApi;
  }
}
