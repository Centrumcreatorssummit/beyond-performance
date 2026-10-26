document.addEventListener("DOMContentLoaded", () => {
  const copyButton = document.getElementById("copyAccount");
  if (copyButton) {
    copyButton.addEventListener("click", async () => {
      const number = document.getElementById("accountNumber")?.textContent?.trim() || "1013262108";
      const feedback = document.getElementById("copyFeedback");
      try {
        await navigator.clipboard.writeText(number);
        if (feedback) feedback.textContent = "Account number copied.";
      } catch (error) {
        const temporary = document.createElement("textarea");
        temporary.value = number;
        temporary.setAttribute("readonly", "");
        temporary.style.position = "absolute";
        temporary.style.left = "-9999px";
        document.body.appendChild(temporary);
        temporary.select();
        const copied = document.execCommand("copy");
        temporary.remove();
        if (feedback) feedback.textContent = copied ? "Account number copied." : "Please copy the number manually: " + number;
      }
    });
  }

  const form = document.getElementById("registrationForm");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const fullName = document.getElementById("fullName").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const email = document.getElementById("email").value.trim();
      const experience = document.getElementById("experience").value;
      const paymentStatus = document.getElementById("paymentStatus").value;
      const note = document.getElementById("note").value.trim();
      const error = document.getElementById("formError");

      if (!fullName || !phone) {
        error.textContent = "Please enter your full name and phone number.";
        return;
      }
      error.textContent = "";
      const message = [
        "Hello! I would like to register for The Actors Class: Beyond the Performance.",
        "",
        "Full name: " + fullName,
        "Phone/WhatsApp: " + phone,
        "Email: " + (email || "Not provided"),
        "Acting experience: " + experience,
        "Payment status: " + paymentStatus,
        "Note: " + (note || "None"),
        "",
        "Please guide me on the next steps. Thank you."
      ].join("\n");
      const url = "https://wa.me/2347045948927?text=" + encodeURIComponent(message);
      window.open(url, "_blank", "noopener,noreferrer");
    });
  }
});
