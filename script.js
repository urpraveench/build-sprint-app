function focusSection(target) {
  const enclosingDetails = target.closest?.("details");
  if (enclosingDetails) enclosingDetails.open = true;
  target.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
  });
  if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
}

const internalLinks = document.querySelectorAll('a[href^="#"]');
internalLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    focusSection(target);
    if (location.hash !== link.getAttribute("href")) {
      history.pushState(null, "", link.getAttribute("href"));
    }
  });
});

const pathForm = document.querySelector("#path-preview");
if (pathForm) {
  const continueButton = document.querySelector("#path-continue");
  const result = document.querySelector("#path-result");
  pathForm.addEventListener("change", () => {
    continueButton.hidden = !pathForm.querySelector('input[name="entry-path"]:checked');
    result.hidden = true;
  });
  pathForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const selected = pathForm.querySelector('input[name="entry-path"]:checked');
    if (!selected) return;
    const prepare = selected.value === "prepare";
    document.querySelector("#path-result-title").textContent = prepare
      ? "Preview: prepare for your first shop visit"
      : "Preview: bring the offers you already have";
    document.querySelector("#path-result-copy").textContent = prepare
      ? "Start with your product, purpose and budget. The companion would help you prepare consistent questions, so each visit gives you details you can compare."
      : "Start with your product, purpose and budget, then add the offers you collected. You would review the captured details before comparing them.";
    document.querySelector("#prepare-example").hidden = !prepare;
    document.querySelector("#compare-example").hidden = prepare;
    result.hidden = false;
    focusSection(result);
  });
}
