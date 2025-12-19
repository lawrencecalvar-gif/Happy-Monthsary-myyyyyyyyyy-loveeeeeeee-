document.addEventListener("DOMContentLoaded", () => {

  const targetDate = new Date("December 20, 2025 00:00:00").getTime();

  const countdownPage = document.getElementById("countdownPage");
  const splash = document.getElementById("splash");
  const content = document.getElementById("content");
  const hearts = document.getElementById("hearts");

  const ids = ["days", "hours", "minutes", "seconds"];

  const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      clearInterval(timer);

      countdownPage.style.display = "none";
      splash.classList.remove("hidden");

      startHearts();

      setTimeout(() => {
        splash.style.display = "none";
        content.style.display = "block";
        activateAnimations();
      }, 4000);

      return;
    }

    document.getElementById("days").innerText =
      Math.floor(distance / (1000 * 60 * 60 * 24));
    document.getElementById("hours").innerText =
      Math.floor((distance / (1000 * 60 * 60)) % 24);
    document.getElementById("minutes").innerText =
      Math.floor((distance / (1000 * 60)) % 60);
    document.getElementById("seconds").innerText =
      Math.floor((distance / 1000) % 60);
  }, 1000);

  function startHearts() {
    const interval = setInterval(() => {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.innerText = "💗";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.fontSize = 16 + Math.random() * 20 + "px";
      hearts.appendChild(heart);

      setTimeout(() => heart.remove(), 5000);
    }, 200);

    setTimeout(() => clearInterval(interval), 6000);
  }

  function activateAnimations() {
    const sections = document.querySelectorAll("#content .page");

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll(".fade, .slide")
            .forEach(el => el.style.animationPlayState = "running");
        }
      });
    }, { threshold: 0.4 });

    sections.forEach(section => observer.observe(section));
  }

});
