/**
 * Filtro anti-spam sui contenuti — l'ultimo strato dopo honeypot, time-trap,
 * rate limit e (se configurato) Turnstile.
 *
 * Assegna un punteggio invece di decidere sì/no, così non si perdono messaggi
 * legittimi per un singolo segnale ambiguo:
 *   score >= DROP_AT   → scartato in silenzio (loggato, mai recapitato)
 *   score >= FLAG_AT   → recapitato con "[possibile spam]" nell'oggetto
 *   sotto              → email normale
 */

export const DROP_AT = 6;
export const FLAG_AT = 3;

/* Frasi tipiche dello spam commerciale che supera i filtri automatici:
   agenzie SEO, vendita backlink, offerte di sviluppatori offshore. */
const PHRASES: Array<[RegExp, number]> = [
  [/\b(backlink|link\s?building|guest\s?post)\b/i, 3],
  /* "seo" da solo no: un cliente vero scrive spesso "vorrei migliorare la SEO". */
  [/\bseo\s+(services?|agency|company|expert|specialist|packages?)\b/i, 3],
  [/\b(first|top)\s+page\s+of\s+google\b/i, 4],
  [/\bprimi\s+(su|in)\s+google\b/i, 4],
  [/\bposizionamento\s+garantito\b/i, 4],
  [/\b(increase|boost)\s+your\s+(ranking|traffic|sales)\b/i, 4],
  [/\bdedicated\s+(developers?|team)\b/i, 3],
  [/\b(offshore|outsourc\w+)\b/i, 3],
  [/\bhourly\s+rate\b/i, 2],
  [/\b(crypto|bitcoin|forex|binary\s+option)\s+(invest\w*|trading|profit)/i, 4],
  [/\b(viagra|casino|escort|porn|xxx)\b/i, 6],
  [/\b(loan|payday)\s+offer\b/i, 4],
  [/\bwork\s+from\s+home\b/i, 3],
  [/\bunsubscribe\b/i, 3],
];

const URL_RE = /https?:\/\/|www\./i;
const URL_RE_ALL = /https?:\/\/|www\./gi;
/* Cirillico, CJK, hangul, arabo: il sito è in italiano, un messaggio scritto
   in questi alfabeti è quasi sempre invio automatico. */
const FOREIGN_SCRIPT_RE = /[Ѐ-ӿ一-鿿぀-ヿ가-힯؀-ۿ]/;
const BBCODE_OR_HTML_RE = /<\s*a\s|\[url[=\]]|<\s*script/i;

export type SpamVerdict = { score: number; reasons: string[]; drop: boolean; flag: boolean };

export function scoreSpam({ name, email, message }: { name: string; email: string; message: string }): SpamVerdict {
  const reasons: string[] = [];
  let score = 0;

  const add = (points: number, reason: string) => {
    score += points;
    reasons.push(reason);
  };

  const haystack = `${name} ${message}`;

  for (const [re, points] of PHRASES) {
    const match = haystack.match(re);
    if (match) add(points, `frase sospetta: "${match[0]}"`);
  }

  const links = message.match(URL_RE_ALL)?.length ?? 0;
  if (links > 2) add(3, `${links} link nel messaggio`);
  if (URL_RE.test(name)) add(4, "link nel campo nome");

  if (FOREIGN_SCRIPT_RE.test(message)) add(3, "alfabeto non latino");
  if (BBCODE_OR_HTML_RE.test(message)) add(4, "markup HTML/BBCode nel messaggio");

  const letters = message.replace(/[^a-zà-ù]/gi, "");
  if (letters.length > 40 && letters === letters.toUpperCase()) add(2, "messaggio tutto maiuscolo");

  const longestWord = Math.max(0, ...message.split(/\s+/).map(w => w.length));
  if (longestWord > 45) add(2, "sequenza di caratteri senza spazi");

  // Un indirizzo che compare identico anche nel messaggio è un pattern da template automatico.
  if (email && message.toLowerCase().includes(email.toLowerCase())) add(2, "email ripetuta nel messaggio");

  return { score, reasons, drop: score >= DROP_AT, flag: score >= FLAG_AT };
}
