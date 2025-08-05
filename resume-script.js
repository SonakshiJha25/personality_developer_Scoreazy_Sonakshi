const totalWeeks = 4;
const daysPerWeek = 5;
let currentOpenWeek = 1;

window.onload = () => {
  initContent(currentOpenWeek);
  loadNotes();
  updateProgress();
};

function initContent(openWeek) {
  const container = document.getElementById("weeks-container");
  container.innerHTML = "";

  for (let w = 1; w <= totalWeeks; w++) {
    const week = document.createElement("div");
    week.className = "week";

    const title = document.createElement("div");
    title.className = "week-title";
    title.setAttribute("data-week", w);
    title.innerHTML = `<span class="arrow">${w === openWeek ? "▼" : "►"}</span> Week ${w}`;

    const moduleBlock = document.createElement("div");
    moduleBlock.className = "modules";
    moduleBlock.id = `week-${w}`;
    if (w !== openWeek) moduleBlock.classList.add("hidden");

    for (let d = 1; d <= daysPerWeek; d++) {
      const id = `w${w}d${d}`;
      const isComplete = localStorage.getItem(id) === "true";

      const div = document.createElement("div");
      div.className = "day";
      div.innerHTML = `
        <span>Day ${d}</span>
        <span class="duration">${randomDuration()} min</span><br/>
        <button data-id="${id}" data-week="${w}">
          ${isComplete ? "Unmark" : "Mark as Completed"}
        </button>
      `;

      moduleBlock.appendChild(div);
    }

    title.addEventListener("click", () => {
      currentOpenWeek = w;
      initContent(currentOpenWeek);
    });

    week.appendChild(title);
    week.appendChild(moduleBlock);
    container.appendChild(week);
  }

  attachButtonEvents();
}

function attachButtonEvents() {
  const buttons = document.querySelectorAll(".day button");
  buttons.forEach(button => {
    button.addEventListener("click", (e) => {
      e.stopPropagation(); 
      const id = e.target.getAttribute("data-id");
      const week = parseInt(e.target.getAttribute("data-week"));
      toggleComplete(id, week);
    });
  });
}

function toggleComplete(id, week) {
  const wasComplete = localStorage.getItem(id) === "true";
  localStorage.setItem(id, wasComplete ? "false" : "true");
  updateProgress();
  checkWeekCompletion(week);
  initContent(currentOpenWeek);
}

function updateProgress() {
  let completed = 0;
  const total = totalWeeks * daysPerWeek;

  for (let w = 1; w <= totalWeeks; w++) {
    for (let d = 1; d <= daysPerWeek; d++) {
      if (localStorage.getItem(`w${w}d${d}`) === "true") completed++;
    }
  }

  const percent = Math.round((completed / total) * 100);
  document.querySelector(".percentage").textContent = `${percent}%`;
  document.getElementById("overallMeter").setAttribute("stroke-dasharray", `${percent}, 100`);

  const certBtn = document.getElementById("downloadCertificate");
  if (completed === total) {
    certBtn.classList.remove("hidden");
  } else {
    certBtn.classList.add("hidden");
  }
}

function checkWeekCompletion(week) {
  let done = 0;
  for (let d = 1; d <= daysPerWeek; d++) {
    if (localStorage.getItem(`w${week}d${d}`) === "true") done++;
  }

  if (done === daysPerWeek) {
    showPopup(`Week ${week} Completed`, `You've successfully completed Week ${week}.`);
  }
}

function saveNotes() {
  localStorage.setItem("notes", document.getElementById("notesArea").value);
  alert("Notes saved.");
}

function clearNotes() {
  if (confirm("Clear all notes?")) {
    document.getElementById("notesArea").value = "";
    localStorage.removeItem("notes");
  }
}

function loadNotes() {
  const notes = localStorage.getItem("notes");
  if (notes) document.getElementById("notesArea").value = notes;
}

function showPopup(title, message) {
  const popup = document.getElementById("popup");
  document.getElementById("popup-title").textContent = title;
  document.getElementById("popup-message").textContent = message;
  popup.classList.add("show");

  document.addEventListener("click", () => popup.classList.remove("show"), { once: true });
}

function randomDuration() {
  return Math.floor(Math.random() * 21) + 40;
}
