/** Rivela gli elementi [data-reveal] quando entrano in viewport (sostituisce whileInView di framer-motion). */
const items = document.querySelectorAll<HTMLElement>("[data-reveal]");

if (items.length > 0 && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -40px 0px", threshold: 0.1 },
  );
  items.forEach((el) => observer.observe(el));
} else {
  items.forEach((el) => el.classList.add("is-visible"));
}
