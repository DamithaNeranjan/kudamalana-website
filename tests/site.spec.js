import { test, expect } from "@playwright/test";
import { routes, widths, boundaryWidths, visit, revealPage, inspectLayout } from "./site-helpers.js";

test.beforeEach(async ({ page }) => {
  // External map availability is checked separately; it must not make local
  // route/layout regressions depend on Google's responses or connectivity.
  await page.route("https://www.google.com/maps**", (route) => route.fulfill({
    contentType: "text/html", body: "<!doctype html><title>Map test placeholder</title>"
  }));
});

for (const route of routes) {
  test(`responsive layout and assets: ${route}`, async ({ page }) => {
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("response", (response) => {
      if (response.url().startsWith("http://127.0.0.1:4173") && response.status() >= 400) errors.push(`${response.status()}: ${response.url()}`);
    });
    page.on("requestfailed", (request) => {
      if (request.url().startsWith("http://127.0.0.1:4173")) errors.push(`${request.failure()?.errorText}: ${request.url()}`);
    });
    await visit(page, route);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page).toHaveTitle(/Kudamalana|Charles|Taste|Kahata/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /\S{10}/);
    for (const width of [...widths, ...boundaryWidths]) {
      await page.setViewportSize({ width, height: width < 768 ? 844 : 900 });
      await revealPage(page);
      const audit = await inspectLayout(page);
      expect.soft(audit.scrollWidth, `${route} document overflow at ${width}px`).toBeLessThanOrEqual(width + 1);
      expect.soft(audit.clippedText, `${route} text clipping at ${width}px`).toEqual([]);
      expect.soft(audit.brokenImages, `${route} broken images at ${width}px`).toEqual([]);
    }
    expect(errors).toEqual([]);
  });
}

test("contact values and link destinations agree everywhere", async ({ page }) => {
  await visit(page, "/contact");
  for (const scope of [page.locator(".contact-card"), page.locator("footer")]) {
    await expect(scope.getByRole("link", { name: "kudamalana.info@kudamalana.lk", exact: true })).toHaveAttribute("href", "mailto:kudamalana.info@kudamalana.lk");
    await expect(scope.getByRole("link", { name: "(+94) 91 4203 449", exact: true })).toHaveAttribute("href", "tel:+94914203449");
    await expect(scope.getByRole("link", { name: "(+94) 71 1254 964", exact: true })).toHaveAttribute("href", "tel:+94711254964");
  }
  await expect(page.locator("body")).not.toContainText("kudamalana@gmail.com");
});

for (const viewport of [{ width: 390, height: 844 }, { width: 568, height: 320 }, { width: 844, height: 390 }]) {
  test(`mobile menu remains usable at ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await visit(page, "/");
    const toggle = page.getByRole("button", { name: "Open navigation" });
    await toggle.click();
    await expect(page.getByRole("button", { name: "Close navigation" })).toHaveAttribute("aria-expanded", "true");
    const menu = page.getByRole("navigation", { name: "Mobile navigation" });
    const contact = menu.getByRole("link", { name: "Contact", exact: true });
    await contact.scrollIntoViewIfNeeded();
    await expect(contact).toBeInViewport();
    await contact.click();
    await expect(page).toHaveURL(/\/contact$/);
    await expect(menu).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Open navigation" })).toHaveAttribute("aria-expanded", "false");
    await page.getByRole("button", { name: "Open navigation" }).click();
    await page.keyboard.press("Escape");
    await expect(menu).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Open navigation" })).toBeFocused();
  });
}

test("desktop navigation, history, and all internal links", async ({ page }) => {
  await visit(page, "/");
  const targets = new Set();
  for (const route of routes) {
    await visit(page, route);
    const hrefs = await page.locator('a[href^="/"]').evaluateAll((links) => links.map((link) => link.getAttribute("href")));
    hrefs.forEach((href) => targets.add(href));
    const active = page.locator(".desktop-nav a.active");
    await expect(active).toHaveCount(1);
    await expect(active).toHaveAttribute("href", route.startsWith("/teas/") ? "/teas" : route);
    await page.reload({ waitUntil: "networkidle" });
    await expect(page.locator("h1")).toBeVisible();
  }
  for (const target of targets) {
    expect(routes, `Unrecognized internal link: ${target}`).toContain(target);
  }
  await page.locator(".desktop-nav").getByRole("link", { name: "Teas", exact: true }).click();
  await expect(page).toHaveURL(/\/teas$/);
  await page.locator(".product-card").first().click();
  await expect(page).toHaveURL(/\/teas\/brew-by-charles$/);
  await page.goBack();
  await expect(page).toHaveURL(/\/teas$/);
  await page.goForward();
  await expect(page).toHaveURL(/\/teas\/brew-by-charles$/);
  await page.getByRole("link", { name: "Enquire About This Tea" }).click();
  await expect(page).toHaveURL(/\/contact$/);
});

test("mobile menu closes on the current route and when resizing to desktop", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await visit(page, "/contact");
  await page.getByRole("button", { name: "Open navigation" }).click();
  const menu = page.getByRole("navigation", { name: "Mobile navigation" });
  await menu.getByRole("link", { name: "Contact", exact: true }).click();
  await expect(menu).toHaveCount(0);
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(menu).toHaveCount(0);
  await expect(page.getByRole("navigation", { name: "Primary navigation" })).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByRole("button", { name: "Open navigation" })).toHaveAttribute("aria-expanded", "false");
});

test("unknown routes and products recover correctly", async ({ page }) => {
  await visit(page, "/missing-page");
  await expect(page.getByRole("heading", { name: "This page is not available" })).toBeVisible();
  await page.getByRole("link", { name: "Return Home" }).click();
  await expect(page).toHaveURL("/");
  await visit(page, "/teas/missing-product");
  await expect(page).toHaveURL(/\/teas$/);
});

for (const viewport of [{ width: 1440, height: 900 }, { width: 320, height: 568 }, { width: 844, height: 390 }]) {
  test(`gallery mouse, keyboard and focus at ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await visit(page, "/estate-factory");
    const trigger = page.locator(".factory-gallery-item button").first();
    await trigger.click();
    const dialog = page.getByRole("dialog");
    const close = dialog.getByRole("button", { name: "Close enlarged photo" });
    await expect(close).toBeFocused();
    await expect(close).toBeInViewport();
    await expect(page.locator("body")).toHaveClass(/lightbox-open/);
    const caption = dialog.locator("figcaption");
    await expect(caption).toHaveText("Factory in the Low-Grown Ruhuna landscape");
    await dialog.getByRole("button", { name: "Previous photo" }).click();
    await expect(caption).toHaveText("Factory exterior");
    await page.keyboard.press("ArrowRight");
    await expect(caption).toHaveText("Factory in the Low-Grown Ruhuna landscape");
    await page.keyboard.press("ArrowLeft");
    await expect(caption).toHaveText("Factory exterior");
    await dialog.getByRole("button", { name: "Next photo" }).click();
    await expect(caption).toHaveText("Factory in the Low-Grown Ruhuna landscape");
    await close.focus();
    await page.keyboard.press("Shift+Tab");
    await expect(dialog.getByRole("button", { name: "Next photo" })).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(close).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
    await expect(trigger).toBeFocused();
    await expect(page.locator("body")).not.toHaveClass(/lightbox-open/);
    await trigger.click();
    await close.click();
    await expect(trigger).toBeFocused();
    const layout = await inspectLayout(page);
    expect(layout.scrollWidth).toBeLessThanOrEqual(viewport.width + 1);
  });
}

test("form validation, error announcements and correction", async ({ page }) => {
  await visit(page, "/contact");
  const submit = page.getByRole("button", { name: "Prepare Email" });
  await submit.click();
  await expect(page.locator(".form-error")).toHaveCount(3);
  await expect(page.getByRole("textbox", { name: "Name", exact: true })).toBeFocused();
  for (const field of ["name", "email", "message"]) {
    await expect(page.locator(`[name="${field}"]`)).toHaveAttribute("aria-invalid", "true");
    await expect(page.locator(`[name="${field}"]`)).toHaveAttribute("aria-describedby", `${field}-error`);
  }
  await page.getByRole("textbox", { name: "Name", exact: true }).fill("   ");
  await page.getByRole("textbox", { name: "Email", exact: true }).fill("invalid@example");
  await page.getByRole("textbox", { name: "Message", exact: true }).fill("12345678901");
  await submit.click();
  await expect(page.locator(".form-error")).toHaveCount(3);
  await page.getByRole("textbox", { name: "Name", exact: true }).fill("Test Visitor");
  await page.getByRole("textbox", { name: "Email", exact: true }).fill("visitor@example.com");
  await submit.click();
  await expect(page.locator(".form-error")).toHaveCount(1);
  await expect(page.getByRole("textbox", { name: "Message", exact: true })).toBeFocused();
});

test("every enquiry type prepares an encoded email without sending", async ({ page }) => {
  await visit(page, "/contact");
  await page.evaluate(() => {
    window.preparedEmails = [];
    // Capture programmatic mailto clicks before any external email app opens.
    const nativeClick = HTMLAnchorElement.prototype.click;
    HTMLAnchorElement.prototype.click = function () {
      if (this.protocol === "mailto:") window.preparedEmails.push(this.href);
      else nativeClick.call(this);
    };
  });
  const name = "Test O'Neil & Sons — ශ්‍රී ලංකා";
  const email = "visitor+tea@example.com";
  await page.getByRole("textbox", { name: "Name", exact: true }).fill(name);
  await page.getByRole("textbox", { name: "Email", exact: true }).fill(email);
  const options = await page.locator('select[name="type"] option').allTextContents();
  for (const [index, type] of options.entries()) {
    const message = index === 0 ? "123456789012" : "Tea & samples? 50% + #1\nThank you — ආයුබෝවන්";
    await page.getByLabel("Enquiry type").selectOption({ label: type });
    await page.getByRole("textbox", { name: "Message", exact: true }).fill(message);
    await page.getByRole("button", { name: "Prepare Email" }).click();
    await expect(page.locator(".form-error")).toHaveCount(0);
    const prepared = await page.evaluate(() => window.preparedEmails.at(-1));
    const url = new URL(prepared);
    expect(url.pathname).toBe("kudamalana.info@kudamalana.lk");
    expect(url.searchParams.get("subject")).toBe(`Kudamalana ${type}`);
    expect(url.searchParams.get("body")).toBe(`Name: ${name}\nEmail: ${email}\nEnquiry type: ${type}\n\n${message}`);
  }
  expect(await page.evaluate(() => window.preparedEmails.length)).toBe(options.length);
});

test("map configuration, safe external links and iframe", async ({ page }) => {
  for (const route of ["/visit", "/contact"]) {
    await visit(page, route);
    const link = page.getByRole("link", { name: "Open in Google Maps", exact: true });
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", /noreferrer/);
    const map = new URL(await link.getAttribute("href"));
    expect(map.origin).toBe("https://www.google.com");
    expect(map.searchParams.get("query")).toContain("Kudamalana Tea Factory");
  }
  await visit(page, "/visit");
  const frame = page.getByTitle("Google Map showing Kudamalana Tea Factory in Thalgaswala");
  await frame.scrollIntoViewIfNeeded();
  await expect(frame).toBeVisible();
  await expect(frame).toHaveAttribute("loading", "lazy");
  await expect(frame).toHaveAttribute("src", /output=embed/);
});

test("scroll reveals work with normal and reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await visit(page, "/our-story");
  const archive = page.locator(".heritage-archive");
  await archive.scrollIntoViewIfNeeded();
  await expect(archive).toHaveClass(/is-visible/);
  await expect(archive).toHaveCSS("opacity", "1");
  await expect(page.locator(".page-hero-inner")).toHaveCSS("animation-duration", "0.72s");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  await expect(archive).toHaveCSS("opacity", "1");
  await expect.poll(async () => parseFloat(await page.locator(".page-hero-inner").evaluate((node) => getComputedStyle(node).animationDuration))).toBeLessThanOrEqual(0.00001);
});

test("keyboard focus and 200 percent desktop zoom equivalent reflow", async ({ page, browserName }) => {
  // Browser zoom at 200% halves the CSS viewport: 1440x900 => 720x450.
  await page.setViewportSize({ width: 720, height: 450 });
  for (const route of routes) {
    await visit(page, route);
    await revealPage(page);
    const layout = await inspectLayout(page);
    expect(layout.scrollWidth, route).toBeLessThanOrEqual(721);
    expect(layout.clippedText, route).toEqual([]);
  }
  await visit(page, "/contact");
  await page.getByRole("link", { name: "Kudamalana home" }).focus();
  await expect(page.getByRole("link", { name: "Kudamalana home" })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("button", { name: "Open navigation" })).toBeFocused();
  await page.keyboard.press("Enter");
  const home = page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Home", exact: true });
  // WebKit on Windows skips links in its default Tab cycle. Check keyboard
  // activation explicitly without changing the site's normal link semantics.
  if (browserName === "webkit") await home.focus();
  else await page.keyboard.press("Tab");
  await expect(home).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL("/");
});

test("touch contact form stays readable with validation errors", async ({ browser, browserName }) => {
  const context = await browser.newContext({
    baseURL: "http://127.0.0.1:4173", viewport: { width: 320, height: 568 },
    hasTouch: true, isMobile: browserName !== "firefox", deviceScaleFactor: 2, reducedMotion: "reduce"
  });
  const page = await context.newPage();
  try {
    await visit(page, "/contact");
    await page.getByRole("button", { name: "Open navigation" }).tap();
    await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Contact", exact: true }).tap();
    await page.getByRole("button", { name: "Prepare Email" }).tap();
    await expect(page.locator(".form-error")).toHaveCount(3);
    await expect(page.locator('input[name="email"]')).toHaveCSS("font-size", "16px");
    const layout = await inspectLayout(page);
    expect(layout.scrollWidth).toBeLessThanOrEqual(321);
    expect(layout.clippedText).toEqual([]);
  } finally {
    await context.close();
  }
});
