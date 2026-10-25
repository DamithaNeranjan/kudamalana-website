export const routes = [
  "/", "/our-story", "/estate-factory", "/teas",
  "/teas/brew-by-charles", "/teas/charles-brew", "/teas/eddys-taste",
  "/teas/kudamalana-kahata", "/sustainability", "/quality", "/trade", "/visit", "/contact"
];

export const widths = [320, 360, 390, 430, 768, 820, 1024, 1100, 1280, 1440, 1920, 2560];
export const boundaryWidths = [519, 520, 521, 819, 821, 899, 900, 901, 1099, 1101, 1179, 1180, 1181, 1399, 1400, 1401];
export const routeName = (route) => route === "/" ? "home" : route.slice(1).replaceAll("/", "--");

export async function visit(page, route) {
  const response = await page.goto(route, { waitUntil: "networkidle" });
  if (!response?.ok()) throw new Error(`Failed route: ${route} (${response?.status()})`);
}

export async function revealPage(page) {
  await page.evaluate(async () => {
    const original = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";
    for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight * 0.7) {
      scrollTo(0, y);
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    }
    await Promise.all([...document.images].map((img) => img.decode().catch(() => {})));
    scrollTo(0, 0);
    document.documentElement.style.scrollBehavior = original;
  });
}

// Text ranges catch content cut off by overflow:hidden cards, even when the
// document itself has no horizontal scrollbar. Ignore purely decorative art.
export async function inspectLayout(page) {
  return page.evaluate(() => {
    const clippedText = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const parent = node.parentElement;
      if (!node.textContent.trim() || !parent || parent.closest("script,style,option,[aria-hidden=true]")) continue;
      if (getComputedStyle(parent).visibility === "hidden" || !parent.getClientRects().length) continue;
      const range = document.createRange();
      range.selectNodeContents(node);
      const rects = [...range.getClientRects()];
      let ancestor = parent;
      while (ancestor && ancestor !== document.body) {
        const css = getComputedStyle(ancestor);
        if (["hidden", "clip", "auto", "scroll"].includes(css.overflowX)) {
          const box = ancestor.getBoundingClientRect();
          if (rects.some((rect) => rect.width && (rect.left < box.left - 2 || rect.right > box.right + 2))) {
            clippedText.push({ text: node.textContent.trim().slice(0, 100), container: ancestor.className });
            break;
          }
        }
        ancestor = ancestor.parentElement;
      }
    }
    return {
      width: innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      clippedText,
      brokenImages: [...document.images].filter((img) => img.complete && !img.naturalWidth).map((img) => img.getAttribute("src"))
    };
  });
}
