/// <reference types="astro/client" />

interface Window {
  __CONTACT_HAS_TURNSTILE__?: boolean;
  turnstile?: {
    render: (el: HTMLElement, opts: Record<string, unknown>) => string;
    remove: (id: string) => void;
    reset: (id?: string) => void;
  };
}

interface ImportMetaEnv {
  readonly PUBLIC_TURNSTILE_SITE_KEY?: string;
}
