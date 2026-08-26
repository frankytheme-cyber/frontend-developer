"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { TOPICS, validateContact, type ContactFields } from "@/lib/contact";
import { isDarkTheme } from "@/lib/theme";

type Status = "idle" | "sending" | "success" | "error";
type FieldErrors = Partial<Record<keyof ContactFields, string>>;

const EMPTY: ContactFields = { name: "", email: "", topic: "ai", message: "", consent: false };

/* Il widget compare solo se la chiave pubblica è configurata: senza chiavi il
   form funziona lo stesso, protetto dagli altri strati anti-spam. */
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const TURNSTILE_SCRIPT = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      remove: (id: string) => void;
      reset: (id?: string) => void;
    };
  }
}

function TurnstileWidget({ onToken }: { onToken: (token: string) => void }) {
  const container = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const [dark, setDark] = useState(false);

  // Il widget non conosce le palette del sito: gli passiamo il tema corrente
  // e lo ricreiamo quando l'utente lo cambia.
  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setDark(isDarkTheme(root.className));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;
    let cancelled = false;

    const render = () => {
      if (cancelled || !container.current || widgetId.current || !window.turnstile) return;
      widgetId.current = window.turnstile.render(container.current, {
        sitekey: TURNSTILE_SITE_KEY,
        theme: dark ? "dark" : "light",
        size: "flexible",
        callback: (token: string) => onToken(token),
        "expired-callback": () => onToken(""),
        "error-callback": () => onToken(""),
      });
    };

    let script: HTMLScriptElement | null = null;

    if (window.turnstile) {
      render();
    } else {
      // Un solo tag script per pagina, anche se l'effetto rigira (StrictMode, cambio tema).
      script = document.querySelector<HTMLScriptElement>(`script[src="${TURNSTILE_SCRIPT}"]`);
      if (!script) {
        script = document.createElement("script");
        script.src = TURNSTILE_SCRIPT;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }
      script.addEventListener("load", render);
    }

    return () => {
      cancelled = true;
      script?.removeEventListener("load", render);
      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current);
        onToken(""); // il token del widget rimosso non è più valido
      }
      widgetId.current = null;
    };
  }, [onToken, dark]);

  if (!TURNSTILE_SITE_KEY) return null;
  return <div ref={container} className="contact-turnstile" />;
}

export default function ContactForm() {
  const [values, setValues] = useState<ContactFields>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const mountedAt = useRef(0);

  if (mountedAt.current === 0 && typeof window !== "undefined") {
    mountedAt.current = Date.now();
  }

  const clearError = (field: keyof ContactFields) => {
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
    if (status === "error") setStatus("idle");
  };

  const update = (field: keyof ContactFields) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setValues(prev => ({ ...prev, [field]: e.target.value }));
    clearError(field);
  };

  const toggleConsent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues(prev => ({ ...prev, consent: e.target.checked }));
    clearError("consent");
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const { errors: localErrors, clean, valid } = validateContact(values);
    if (!valid) {
      setErrors(localErrors);
      return;
    }
    if (TURNSTILE_SITE_KEY && !captchaToken) {
      setCaptchaError("Completa la verifica anti-spam qui sopra.");
      return;
    }

    setStatus("sending");
    setErrors({});
    setCaptchaError("");
    setFeedback("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...clean,
          website: (document.getElementById("website") as HTMLInputElement | null)?.value ?? "",
          elapsed: Date.now() - mountedAt.current,
          turnstileToken: captchaToken,
        }),
      });
      const data = await res.json().catch(() => ({}));

      // Il token Turnstile è monouso: dopo ogni tentativo serve una sfida nuova.
      window.turnstile?.reset();
      setCaptchaToken("");

      if (res.status === 422 && data.errors) {
        setErrors(data.errors as FieldErrors);
        setStatus("idle");
        return;
      }
      if (!res.ok) {
        setFeedback(data.error ?? "Invio non riuscito. Riprova tra poco.");
        setStatus("error");
        return;
      }

      setValues(EMPTY);
      setStatus("success");
    } catch {
      setFeedback("Connessione non riuscita. Controlla la rete e riprova.");
      setStatus("error");
    }
  }

  const sending = status === "sending";

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="contact-card flex flex-col items-start gap-4"
        role="status"
      >
        <span
          className="flex items-center justify-center w-11 h-11 rounded-lg"
          style={{ background: "var(--accent-dim)", border: "1px solid var(--border)" }}
        >
          <CheckCircle2 className="w-5 h-5" style={{ color: "var(--accent)" }} />
        </span>
        <div>
          <p className="text-lg font-semibold mb-2" style={{ color: "var(--text)" }}>
            Grazie, messaggio ricevuto.
          </p>
          <p className="text-base leading-relaxed" style={{ color: "var(--muted)" }}>
            Lo leggo io, non un sistema automatico: ti rispondo entro un giorno
            lavorativo, spesso nel giro di poche ore.
          </p>
        </div>
        <button type="button" className="contact-ghost" onClick={() => setStatus("idle")}>
          Invia un altro messaggio
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      onSubmit={handleSubmit}
      noValidate
      className="contact-card"
      aria-labelledby="contact-form-title"
    >
      <p
        id="contact-form-title"
        className="text-xs font-semibold tracking-[0.25em] uppercase mb-5"
        style={{ color: "var(--muted-2)", fontFamily: "var(--font-mono)" }}
      >
        Raccontami il progetto
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="contact-label" htmlFor="name">Nome</label>
          <input
            id="name"
            name="name"
            placeholder="Nome e cognome o azienda"
            type="text"
            autoComplete="name"
            className="contact-field"
            value={values.name}
            onChange={update("name")}
            disabled={sending}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && <p id="name-error" className="contact-error">{errors.name}</p>}
        </div>

        <div>
          <label className="contact-label" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="email@example.com"
            autoComplete="email"
            className="contact-field"
            value={values.email}
            onChange={update("email")}
            disabled={sending}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && <p id="email-error" className="contact-error">{errors.email}</p>}
        </div>
      </div>

      <div className="mt-4">
        <label className="contact-label" htmlFor="topic">Di cosa hai bisogno</label>
        <select
          id="topic"
          name="topic"
          className="contact-field contact-select"
          value={values.topic}
          onChange={update("topic")}
          disabled={sending}
        >
          {TOPICS.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <label className="contact-label" htmlFor="message">Messaggio</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="contact-field"
          placeholder="Obiettivo, tempi e budget indicativo: bastano due righe."
          value={values.message}
          onChange={update("message")}
          disabled={sending}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && <p id="message-error" className="contact-error">{errors.message}</p>}
      </div>

      {/* honeypot — invisibile agli utenti, irresistibile ai bot */}
      <div aria-hidden className="contact-honeypot">
        <label htmlFor="website">Non compilare questo campo</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      {/* Consenso obbligatorio */}
      <div className="mt-5">
        <label className="contact-consent" htmlFor="consent">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            checked={values.consent}
            onChange={toggleConsent}
            disabled={sending}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? "consent-error" : undefined}
          />
          <span>
            Acconsento al trattamento dei miei dati per ricevere una risposta a questa
            richiesta. Non vengono usati per altro né condivisi con terzi.
          </span>
        </label>
        {errors.consent && <p id="consent-error" className="contact-error">{errors.consent}</p>}
      </div>

      <TurnstileWidget onToken={setCaptchaToken} />
      {captchaError && <p className="contact-error">{captchaError}</p>}

      <button type="submit" className="contact-submit mt-5" disabled={sending}>
        {sending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Invio in corso…
          </>
        ) : (
          <>
            Invia messaggio
            <Send className="w-4 h-4" />
          </>
        )}
      </button>

      <p aria-live="polite" className="sr-only">
        {sending ? "Invio in corso" : ""}
      </p>

      {status === "error" && (
        <p className="contact-error mt-3 flex items-start gap-2" role="alert">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          {feedback}
        </p>
      )}
    </motion.form>
  );
}
