/* =====================================
   SIKET EKUB TELEGRAM CONNECTION
===================================== */
const TELEGRAM_BOT = "https://t.me/SiketEkubbot";

function openTelegram(source = "website") {
    const message = encodeURIComponent(
        "Hello Siket Ekub 👋\n\n" +
        "I want to register for the car lottery.\n\n" +
        "Source: " + source
    );
    const telegramURL = "https://t.me/" + TELEGRAM_BOT.replace("https://t.me/", "") + "?start=" + source;
    window.open(telegramURL, "_blank");
}

document.querySelectorAll(".primary-btn").forEach(button => {
    button.addEventListener("click", function() {
        if (this.closest("#tickets")) {
            openTelegram("ticket");
        } else {
            openTelegram("home");
        }
    });
});

function openPage(pageId, menu) {
    document.querySelectorAll(".page").forEach(page => page.classList.remove("active"));
    document.getElementById(pageId).classList.add("active");
    document.querySelectorAll(".bottom-nav a").forEach(item => item.classList.remove("active"));
    menu.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll(".numbers button").forEach(btn => {
    btn.onclick = function() {
        document.querySelectorAll(".numbers button").forEach(b => b.classList.remove("selected"));
        this.classList.add("selected");
        localStorage.setItem("selected_ticket", this.innerText);
    };
});

/* ================================
   COUNTDOWN TIMER (7 DAYS)
================================ */
function startCountdown() {
    const now = new Date();
    const targetTime = new Date(now);
    targetTime.setDate(targetTime.getDate() + 1);

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    if (!daysEl) return;

    const timer = setInterval(function() {
        const currentTime = new Date();
        const diff = targetTime - currentTime;

        if (diff <= 0) {
            clearInterval(timer);
            document.querySelector(".countdown-timer").innerHTML = '<h2 style="color:var(--gold)">🎯 DRAW IS LIVE!</h2>';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    }, 1000);
}

document.addEventListener("DOMContentLoaded", startCountdown);