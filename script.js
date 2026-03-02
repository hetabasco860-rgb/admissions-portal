(() => {
  const $ = (s) => document.querySelector(s);

  function makeId(){
    const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    const pick = () => alphabet[Math.floor(Math.random() * alphabet.length)];
    const part = () => String(Math.floor(1000 + Math.random() * 9000));
    return `${pick()}${pick()}-${part()}-${part()}`;
  }

  const appId = makeId();
  $("#appId").textContent = appId;
  $("#appId2").textContent = appId;

  const now = new Date();
  const issue = now.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  $("#issueDate").textContent = issue;

  $("#year").textContent = String(now.getFullYear());

  const viewBtn = $("#viewBtn");
  const printBtn = $("#printBtn");
  const ack = $("#ack");
  const confirmBtn = $("#confirmBtn");
  const resetBtn = $("#resetBtn");
  const stamp = $("#stamp");
  const confirmBadge = $("#confirmBadge");
  const statusBadge = $("#statusBadge");
  const letterBody = $("#letterBody");
  const application = $("#application");

  function openApplication(){
    // Make the letter visible ONLY after the button is pressed.
    application.classList.remove("hidden");
    application.setAttribute("aria-hidden", "false");

    application.classList.add("reveal");
    application.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => application.classList.remove("reveal"), 550);
  }

  viewBtn?.addEventListener("click", openApplication);

  printBtn?.addEventListener("click", () => window.print());

  ack?.addEventListener("change", () => {
    confirmBtn.disabled = !ack.checked;
  });

  confirmBtn?.addEventListener("click", () => {
    stamp.classList.add("applied");
    confirmBadge.textContent = "Confirmed";
    confirmBadge.classList.add("success");
    confirmBadge.style.borderColor = "rgba(18,59,107,.35)";
    confirmBadge.style.background = "rgba(18,59,107,.08)";

    statusBadge.textContent = "Admitted — Pending Deposit";
    statusBadge.classList.add("success");

    const record = document.createElement("p");
    record.className = "muted";
    const t = new Date();
    const time = t.toLocaleString(undefined, { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" });
    record.textContent = `Administrative Record: Enrollment confirmed on ${time}. The Office of Admissions has applied the admissions stamp to this document.`;
    letterBody.appendChild(record);

    confirmBtn.disabled = true;
    ack.disabled = true;
  });

  resetBtn?.addEventListener("click", () => {
    window.location.reload();
  });
})();