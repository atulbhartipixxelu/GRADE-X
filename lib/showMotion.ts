export function showMotion(root: ParentNode = document) {
  if (typeof document === "undefined") return;

  root.querySelectorAll<HTMLElement>("[data-aos]").forEach((el) => {
    el.classList.add("aos-animate");
  });

  root.querySelectorAll<HTMLElement>("[data-rise], [data-clip]").forEach((el) => {
    el.style.opacity = "1";
    el.style.transform = "none";
    el.style.filter = "none";
    el.style.translate = "none";
  });

  root.querySelectorAll<HTMLElement>(".gx-hero-title--split span em").forEach((el) => {
    const box = el.getBoundingClientRect();
    if (box.height < 2 || Number.parseFloat(getComputedStyle(el).opacity) < 0.05) {
      el.style.transform = "none";
      el.style.opacity = "1";
    }
  });
}

export function showIfStillHidden(el: HTMLElement) {
  const box = el.getBoundingClientRect();
  const hidden =
    Number.parseFloat(getComputedStyle(el).opacity) < 0.05 ||
    box.height < 2 ||
    box.width < 2;
  if (!hidden) return;
  el.classList.add("aos-animate");
  el.style.opacity = "1";
  el.style.transform = "none";
  el.style.filter = "none";
  el.style.translate = "none";
}
