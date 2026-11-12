// Personalize these three values before sharing the page.
const LOVE_NOTE = {
  meetingDate: "2026-08-08",
  message: `حبيبه قلبي وعمري وكل حاجه حلوه ف حياتي ..

بصي .. ملقيتش حد يستاهل الكلمتين دول غير حبيبه قلبي وروحي و حياتي سيرا العسوله بتاعتي ، عايز اقولك اني عمري م هعرف ابعد عندك وهفضل احبك دايما وهعمل كل حاجه علشانك ومهما حصل هفضل احبك ولا حبي ليكي هيقل ولا هحب حد غيرك ولا عايز حد غيرك .

يمكن حصل معايا دروب ف الفتره الاخيره دي ومكناش ف افضل حال بس مهما الدنيا لفت وهما حصل بينا هنفضل مع بعض دايما .

بس مهما حصل بينا هقولك حاجه واحده بس`,
};

const form = document.querySelector("#date-form");
const dateInput = document.querySelector("#meeting-date");
const feedback = document.querySelector("#form-message");
const page = document.querySelector(".page");
const envelope = document.querySelector("#envelope");
const messageCard = document.querySelector("#message-card");
const messageBody = document.querySelector("#message-body");
const stageCaption = document.querySelector("#stage-caption");
const replayButton = document.querySelector("#replay-button");
const celebrationLayer = document.querySelector("#celebration-layer");
let celebrationTimer;

messageBody.textContent = LOVE_NOTE.message;

function showCelebration() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  window.clearTimeout(celebrationTimer);
  celebrationLayer.replaceChildren();

  const decorations = [
    { type: "heart", icons: ["♥", "♡", "💗"] },
    { type: "flower", icons: ["🌸", "🌹", "✿"] },
    { type: "snow", icons: ["❄", "❅", "✧"] },
  ];

  for (const decoration of decorations) {
    for (let index = 0; index < 12; index += 1) {
      const particle = document.createElement("span");
      const duration = 4 + Math.random() * 3;
      particle.className = `celebration-particle celebration-particle--${decoration.type}`;
      particle.textContent =
        decoration.icons[Math.floor(Math.random() * decoration.icons.length)];
      particle.style.setProperty("--x", `${Math.random() * 100}%`);
      particle.style.setProperty("--drift", `${Math.random() * 180 - 90}px`);
      particle.style.setProperty("--duration", `${duration}s`);
      particle.style.setProperty("--delay", `${Math.random() * 1.5}s`);
      particle.style.setProperty("--size", `${14 + Math.random() * 15}px`);
      celebrationLayer.append(particle);
    }
  }

  celebrationTimer = window.setTimeout(() => {
    celebrationLayer.replaceChildren();
  }, 9000);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!dateInput.value) {
    feedback.textContent = "اختاري التاريخ الأول، والظرف مستنيكي ♡";
    dateInput.focus();
    return;
  }

  if (dateInput.value !== LOVE_NOTE.meetingDate) {
    feedback.textContent = "قريبتي… جرّبي تاني وافتكري يوم حكايتنا ♡";
    dateInput.setAttribute("aria-invalid", "true");
    dateInput.focus();
    return;
  }

  feedback.textContent = "";
  dateInput.removeAttribute("aria-invalid");
  const isFirstOpen = messageCard.hidden;
  page.classList.add("is-love-mode");
  envelope.classList.add("is-open");
  stageCaption.textContent = "أهو اليوم اللي جمعنا!";
  messageCard.hidden = false;
  if (isFirstOpen) {
    showCelebration();
  }
  messageCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
  replayButton.focus({ preventScroll: true });
});

dateInput.addEventListener("input", () => {
  feedback.textContent = "";
  dateInput.removeAttribute("aria-invalid");
});

replayButton.addEventListener("click", () => {
  window.clearTimeout(celebrationTimer);
  celebrationLayer.replaceChildren();
  page.classList.remove("is-love-mode");
  envelope.classList.remove("is-open");
  stageCaption.textContent = "مستخبية جوّه الظرف";
  messageCard.hidden = true;
  dateInput.value = "";
  dateInput.focus();
});
