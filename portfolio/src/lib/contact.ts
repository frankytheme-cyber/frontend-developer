/** Schema condiviso tra il form client e la route /api/contact. */

export const TOPICS = [
  { value: "ai", label: "Tool AI / automazioni" },
  { value: "wordpress", label: "Sito o e-commerce WordPress" },
  { value: "webapp", label: "App React / Next.js" },
  { value: "manutenzione", label: "Manutenzione e assistenza" },
  { value: "altro", label: "Altro" },
] as const;

export type TopicValue = (typeof TOPICS)[number]["value"];

export const topicLabel = (value: string) =>
  TOPICS.find(t => t.value === value)?.label ?? TOPICS[TOPICS.length - 1].label;

export const MIN_FILL_MS = 3_000;

export type ContactFields = {
  name: string;
  email: string;
  topic: string;
  message: string;
  consent: boolean;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const isTopic = (value: string) => TOPICS.some(t => t.value === value);

/** Stessa validazione lato client e lato server: nessuna divergenza. */
export function validateContact(data: Partial<ContactFields>) {
  const clean: ContactFields = {
    name: (data.name ?? "").trim(),
    email: (data.email ?? "").trim(),
    message: (data.message ?? "").trim(),
    topic: (data.topic ?? "").trim() || "altro",
    consent: data.consent === true,
  };

  const errors: Partial<Record<keyof ContactFields, string>> = {};
  if (clean.name.length < 2 || clean.name.length > 80) errors.name = "Inserisci il tuo nome.";
  if (!EMAIL_RE.test(clean.email) || clean.email.length > 160) errors.email = "Inserisci un'email valida.";
  if (clean.message.length < 10) errors.message = "Scrivi almeno 10 caratteri.";
  else if (clean.message.length > 4000) errors.message = "Messaggio troppo lungo (max 4000 caratteri).";
  if (!isTopic(clean.topic)) errors.topic = "Seleziona un'opzione valida.";
  if (!clean.consent) errors.consent = "Devi accettare per poter inviare il messaggio.";

  return { errors, clean, valid: Object.keys(errors).length === 0 };
}
