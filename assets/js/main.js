// Huge Brew Food House — site config and small interactions.
// Fill in CONFIG once the client sends the details; empty values keep the placeholder behavior.

const CONFIG = {
  // Full Facebook Page URL, e.g. "https://www.facebook.com/hugebrewfoodhouse".
  // The /share/ link works as a plain link but not as an embed.
  facebookPageUrl: "https://www.facebook.com/share/1FMUUfw3hp/",
  // Page username for Messenger, e.g. "hugebrewfoodhouse" → https://m.me/hugebrewfoodhouse
  messengerUsername: "",          // PLACEHOLDER
  // Phone in international format, e.g. "+639171234567"
  phone: "",                      // PLACEHOLDER
  phoneDisplay: "",               // PLACEHOLDER, e.g. "0917 123 4567"
};

(function () {
  const $all = (sel) => Array.from(document.querySelectorAll(sel));

  // Year in footer
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Mobile nav
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", (e) => {
      if (e.target.closest("a")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Facebook link everywhere
  $all("[data-facebook]").forEach((a) => { a.href = CONFIG.facebookPageUrl; });

  // Messenger: m.me link when a username is set, otherwise fall back to the FB page
  const messengerHref = CONFIG.messengerUsername
    ? `https://m.me/${CONFIG.messengerUsername}`
    : CONFIG.facebookPageUrl;
  $all("[data-messenger]").forEach((a) => {
    a.href = messengerHref;
    a.target = "_blank";
    a.rel = "noopener";
  });

  // Call buttons: hidden until a phone number is set
  $all("[data-call]").forEach((a) => {
    if (CONFIG.phone) a.href = `tel:${CONFIG.phone}`;
    else a.hidden = true;
  });
  const phoneText = document.querySelector("[data-phone-text]");
  if (phoneText && CONFIG.phone) {
    phoneText.textContent = CONFIG.phoneDisplay || CONFIG.phone;
    phoneText.removeAttribute("data-placeholder");
  }

  // Facebook Page plugin (add-on). Needs the real page URL; share links can't be embedded.
  const embed = document.getElementById("fb-embed");
  if (embed) {
    const url = CONFIG.facebookPageUrl;
    const canEmbed = url && !url.includes("/share/");
    if (canEmbed) {
      const width = Math.min(500, Math.max(280, embed.clientWidth || 340));
      const src = "https://www.facebook.com/plugins/page.php?" + new URLSearchParams({
        href: url, tabs: "timeline", width: String(width), height: "520",
        small_header: "false", adapt_container_width: "true", hide_cover: "false", show_facepile: "true",
      });
      const iframe = document.createElement("iframe");
      iframe.src = src;
      iframe.width = String(width);
      iframe.height = "520";
      iframe.loading = "lazy";
      iframe.title = "Huge Brew Food House on Facebook";
      iframe.allow = "encrypted-media";
      embed.appendChild(iframe);
    } else {
      embed.innerHTML = `
        <a class="fb-card" href="${url}" target="_blank" rel="noopener">
          <img src="assets/images/logo/logo.jpg" alt="" width="72" height="72">
          <div><strong>Huge Brew Food House</strong><span>See our latest posts on Facebook</span></div>
        </a>`;
    }
  }
})();
