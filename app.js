const appState = {
  careers: [
    {
      name: "Software Engineer",
      category: "Technology",
      skills: ["Problem Solving", "Coding", "Analytical Thinking"],
      interests: ["Technology", "Innovation"],
      description: "Build software products, systems, and web/mobile applications.",
    },
    {
      name: "Data Scientist",
      category: "Technology",
      skills: ["Data Analysis", "Statistics", "Python"],
      interests: ["Research", "Technology"],
      description: "Use data to derive insights, predictions, and strategic decisions.",
    },
    {
      name: "Clinical Psychologist",
      category: "Healthcare",
      skills: ["Empathy", "Communication", "Critical Thinking"],
      interests: ["Healthcare", "People"],
      description: "Support mental health through diagnosis, counseling, and therapy.",
    },
    {
      name: "Digital Marketer",
      category: "Business",
      skills: ["Creativity", "Communication", "Data Analysis"],
      interests: ["Business", "Creativity"],
      description: "Create campaigns and use digital platforms to grow brands.",
    },
    {
      name: "Architect",
      category: "Design",
      skills: ["Design Thinking", "Creativity", "Project Planning"],
      interests: ["Design", "Innovation"],
      description: "Plan and design buildings with functionality, safety, and aesthetics.",
    },
    {
      name: "Financial Analyst",
      category: "Finance",
      skills: ["Analytical Thinking", "Communication", "Data Analysis"],
      interests: ["Finance", "Business"],
      description: "Evaluate investments, risks, and trends to guide financial decisions.",
    },
  ],
  counselors: [
    { id: "c1", name: "Dr. Aisha Raman", specialty: "STEM & Higher Education" },
    { id: "c2", name: "Mr. Kiran Mathew", specialty: "Business & Management" },
    { id: "c3", name: "Ms. Neha Suri", specialty: "Creative & Design Careers" },
    { id: "c4", name: "Dr. Daniel Brooks", specialty: "Health & Public Service" },
  ],
  videos: [
    { title: "How to choose the right career", embedUrl: "https://www.youtube.com/embed/6Jg4Q5E9xZE" },
    { title: "Career planning for students", embedUrl: "https://www.youtube.com/embed/7R7zJ2v2M8U" },
  ],
  interests: ["Technology", "Business", "Healthcare", "Design", "Finance", "Research", "Innovation", "People", "Creativity"],
  skills: ["Problem Solving", "Coding", "Communication", "Data Analysis", "Analytical Thinking", "Empathy", "Creativity", "Project Planning", "Design Thinking", "Statistics", "Python"],
};

const keys = {
  profile: "pathpilot_profile",
  resources: "pathpilot_resources",
  sessions: "pathpilot_sessions",
  connections: "pathpilot_connections",
  engagement: "pathpilot_engagement",
};

const defaults = {
  resources: [
    { id: createId(), title: "Roadmap to Computer Science Careers", category: "Technology", link: "https://roadmap.sh" },
    { id: createId(), title: "Occupational Outlook Handbook", category: "General", link: "https://www.bls.gov/ooh/" },
    { id: createId(), title: "Career Explorer by O*NET", category: "Career Discovery", link: "https://www.onetonline.org/" },
  ],
  sessions: [],
  connections: [],
  engagement: { profileSaves: 0, resourceViews: 0, sessionsBooked: 0, counselorAssignments: 0 },
};

const $ = (id) => document.getElementById(id);

const studentViewBtn = $("studentViewBtn");
const adminViewBtn = $("adminViewBtn");
const studentSection = $("studentSection");
const adminSection = $("adminSection");

function createId() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }
  return `id_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function safeParse(value, fallback) {
  try {
    const parsed = JSON.parse(value);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function deepCopy(value) {
  return safeParse(JSON.stringify(value), value);
}

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return deepCopy(fallback);
    return safeParse(raw, deepCopy(fallback));
  } catch {
    showGlobalMessage("Browser storage is not available. Data will not persist.", "error");
    return deepCopy(fallback);
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    showGlobalMessage("Could not save data to browser storage.", "error");
    return false;
  }
}

function showGlobalMessage(message, type = "success") {
  const box = $("globalMessage");
  box.textContent = message;
  box.dataset.type = type;
}

function clearGlobalMessage() {
  const box = $("globalMessage");
  box.textContent = "";
  box.removeAttribute("data-type");
}

function incrementEngagement(metric) {
  const engagement = readStorage(keys.engagement, defaults.engagement);
  engagement[metric] = Number(engagement[metric] || 0) + 1;
  if (writeStorage(keys.engagement, engagement)) renderStats();
}

function populateOptions(selectId, items, mapLabel = (x) => x, mapValue = (x) => x) {
  const select = $(selectId);
  select.innerHTML = "";
  items.forEach((item) => {
    const opt = document.createElement("option");
    opt.value = mapValue(item);
    opt.textContent = mapLabel(item);
    select.appendChild(opt);
  });
}

function getSelectedValues(selectElement) {
  return [...selectElement.selectedOptions].map((opt) => opt.value);
}

function scoreCareer(career, interests, skills) {
  const interestHits = career.interests.filter((i) => interests.includes(i)).length;
  const skillHits = career.skills.filter((s) => skills.includes(s)).length;
  return interestHits * 2 + skillHits;
}

function renderCareers(filter = "") {
  const list = $("careerList");
  const template = $("careerTemplate");
  list.innerHTML = "";

  const profile = readStorage(keys.profile, { name: "", interests: [], skills: [] });
  const query = filter.trim().toLowerCase();

  const careers = appState.careers
    .filter((career) => {
      if (!query) return true;
      return (
        career.name.toLowerCase().includes(query) ||
        career.category.toLowerCase().includes(query) ||
        career.description.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => scoreCareer(b, profile.interests || [], profile.skills || []) - scoreCareer(a, profile.interests || [], profile.skills || []));

  if (!careers.length) {
    const p = document.createElement("p");
    p.className = "small";
    p.textContent = "No career matches found.";
    list.appendChild(p);
    return;
  }

  careers.forEach((career) => {
    const clone = template.content.cloneNode(true);
    clone.querySelector("h3").textContent = career.name;
    clone.querySelector(".meta").textContent = `${career.category} | Skills: ${career.skills.join(", ")}`;
    clone.querySelector(".desc").textContent = career.description;
    list.appendChild(clone);
  });
}

function createResourceCard(resource, forAdmin = false) {
  const card = document.createElement("article");
  card.className = "resource-item";

  const title = document.createElement("h3");
  title.textContent = resource.title;

  const meta = document.createElement("p");
  meta.className = "small";
  meta.textContent = resource.category;

  const link = document.createElement("a");
  link.href = resource.link;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "Open Resource";
  link.addEventListener("click", () => incrementEngagement("resourceViews"));

  card.append(title, meta, link);

  if (forAdmin) {
    const del = document.createElement("button");
    del.className = "delete-btn";
    del.textContent = "Delete";
    del.addEventListener("click", () => {
      const updated = readStorage(keys.resources, defaults.resources).filter((r) => r.id !== resource.id);
      if (writeStorage(keys.resources, updated)) {
        renderResources();
        renderStats();
        showGlobalMessage("Resource deleted.");
      }
    });
    card.appendChild(del);
  }

  return card;
}

function renderResources() {
  const resources = readStorage(keys.resources, defaults.resources);
  const studentList = $("resourceListStudent");
  const adminList = $("resourceListAdmin");
  studentList.innerHTML = "";
  adminList.innerHTML = "";

  resources.forEach((resource) => {
    studentList.appendChild(createResourceCard(resource, false));
    adminList.appendChild(createResourceCard(resource, true));
  });
}

function renderVideos() {
  const container = $("videoContainer");
  container.innerHTML = "";

  appState.videos.forEach((video) => {
    const box = document.createElement("div");
    box.className = "resource-item";

    const h3 = document.createElement("h3");
    h3.textContent = video.title;

    const frame = document.createElement("iframe");
    frame.className = "video-embed";
    frame.src = video.embedUrl;
    frame.title = video.title;
    frame.loading = "lazy";
    frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    frame.allowFullscreen = true;

    box.append(h3, frame);
    container.appendChild(box);
  });
}

function renderSessions() {
  const sessions = readStorage(keys.sessions, defaults.sessions);
  const mySessions = $("mySessions");
  mySessions.innerHTML = "";

  if (!sessions.length) {
    const p = document.createElement("p");
    p.className = "small";
    p.textContent = "No sessions booked yet.";
    mySessions.appendChild(p);
    return;
  }

  sessions
    .slice()
    .sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime())
    .forEach((s) => {
      const item = document.createElement("article");
      item.className = "session-item";

      const h3 = document.createElement("h3");
      h3.textContent = `${s.student} with ${s.counselor}`;

      const info = document.createElement("p");
      info.className = "small";
      info.textContent = `${s.careerPath} | ${s.date} at ${s.time}`;

      item.append(h3, info);
      mySessions.appendChild(item);
    });
}

function renderConnections() {
  const connections = readStorage(keys.connections, defaults.connections);
  const list = $("connectionsList");
  list.innerHTML = "";

  if (!connections.length) {
    const p = document.createElement("p");
    p.className = "small";
    p.textContent = "No counselor assignments yet.";
    list.appendChild(p);
    return;
  }

  connections.forEach((connection) => {
    const item = document.createElement("article");
    item.className = "connection-item";

    const h3 = document.createElement("h3");
    h3.textContent = connection.student;

    const p = document.createElement("p");
    p.className = "small";
    p.textContent = `Assigned counselor: ${connection.counselor}`;

    item.append(h3, p);
    list.appendChild(item);
  });
}

function renderStats() {
  const engagement = readStorage(keys.engagement, defaults.engagement);
  const resources = readStorage(keys.resources, defaults.resources);
  const sessions = readStorage(keys.sessions, defaults.sessions);
  const connections = readStorage(keys.connections, defaults.connections);

  const data = [
    ["Resources", resources.length],
    ["Sessions Booked", sessions.length],
    ["Assignments", connections.length],
    ["Profile Saves", Number(engagement.profileSaves || 0)],
    ["Resource Views", Number(engagement.resourceViews || 0)],
    ["Session Actions", Number(engagement.sessionsBooked || 0)],
  ];

  const stats = $("statsGrid");
  stats.innerHTML = "";
  data.forEach(([label, value]) => {
    const card = document.createElement("article");
    card.className = "stat";

    const h3 = document.createElement("h3");
    h3.textContent = label;

    const p = document.createElement("p");
    p.textContent = String(value);

    card.append(h3, p);
    stats.appendChild(card);
  });
}

function updateRecommendationSummary() {
  const profile = readStorage(keys.profile, { name: "", interests: [], skills: [] });
  const summary = $("recommendationSummary");

  if (!profile.name) {
    summary.textContent = "";
    return;
  }

  const top = appState.careers
    .map((career) => ({ career: career.name, score: scoreCareer(career, profile.interests || [], profile.skills || []) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .filter((c) => c.score > 0)
    .map((c) => c.career);

  summary.textContent = top.length
    ? `Recommended for ${profile.name}: ${top.join(", ")}`
    : `Hi ${profile.name}. Add more interests and skills for better recommendations.`;
}

function hydrateFormFromProfile() {
  const profile = readStorage(keys.profile, { name: "", interests: [], skills: [] });
  $("nameInput").value = profile.name || "";

  [...$("interestsSelect").options].forEach((option) => {
    option.selected = (profile.interests || []).includes(option.value);
  });

  [...$("skillsSelect").options].forEach((option) => {
    option.selected = (profile.skills || []).includes(option.value);
  });

  updateRecommendationSummary();
}

function setView(isAdmin) {
  adminSection.classList.toggle("active", isAdmin);
  studentSection.classList.toggle("active", !isAdmin);
  adminViewBtn.classList.toggle("active", isAdmin);
  studentViewBtn.classList.toggle("active", !isAdmin);
  adminViewBtn.setAttribute("aria-selected", String(isAdmin));
  studentViewBtn.setAttribute("aria-selected", String(!isAdmin));
  clearGlobalMessage();
}

function normalizeUrl(url) {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return "";
    return parsed.toString();
  } catch {
    return "";
  }
}

function isFutureDateTime(date, time) {
  const dt = new Date(`${date}T${time}`);
  return Number.isFinite(dt.getTime()) && dt.getTime() > Date.now();
}

function seedStorage() {
  if (!localStorage.getItem(keys.resources)) writeStorage(keys.resources, defaults.resources);
  if (!localStorage.getItem(keys.sessions)) writeStorage(keys.sessions, defaults.sessions);
  if (!localStorage.getItem(keys.connections)) writeStorage(keys.connections, defaults.connections);
  if (!localStorage.getItem(keys.engagement)) writeStorage(keys.engagement, defaults.engagement);
}

function bindEvents() {
  studentViewBtn.addEventListener("click", () => setView(false));
  adminViewBtn.addEventListener("click", () => setView(true));

  $("profileForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const profile = {
      name: $("nameInput").value.trim(),
      interests: getSelectedValues($("interestsSelect")).slice(0, 5),
      skills: getSelectedValues($("skillsSelect")).slice(0, 5),
    };

    if (!profile.name) {
      showGlobalMessage("Please enter student name.", "error");
      return;
    }

    if (writeStorage(keys.profile, profile)) {
      incrementEngagement("profileSaves");
      updateRecommendationSummary();
      renderCareers($("careerSearch").value);
      showGlobalMessage("Profile saved successfully.");
    }
  });

  $("careerSearch").addEventListener("input", (e) => renderCareers(e.target.value));

  $("sessionForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const profile = readStorage(keys.profile, { name: "Student" });

    const entry = {
      id: createId(),
      student: profile.name || "Student",
      careerPath: $("careerPathSelect").value,
      counselor: $("counselorSelect").value,
      date: $("sessionDate").value,
      time: $("sessionTime").value,
    };

    if (!entry.date || !entry.time) {
      $("sessionStatus").textContent = "Please select date and time.";
      return;
    }

    if (!isFutureDateTime(entry.date, entry.time)) {
      $("sessionStatus").textContent = "Please choose a future date/time.";
      return;
    }

    const sessions = readStorage(keys.sessions, defaults.sessions);
    sessions.push(entry);

    if (writeStorage(keys.sessions, sessions)) {
      incrementEngagement("sessionsBooked");
      $("sessionStatus").textContent = `Booked with ${entry.counselor} on ${entry.date} at ${entry.time}.`;
      renderSessions();
      renderStats();
      showGlobalMessage("Session booked.");
      e.target.reset();
    }
  });

  $("resourceForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const title = $("resourceTitle").value.trim();
    const category = $("resourceCategory").value.trim();
    const link = normalizeUrl($("resourceLink").value.trim());

    if (!title || !category || !link) {
      showGlobalMessage("Provide valid title, category, and URL (http/https).", "error");
      return;
    }

    const resources = readStorage(keys.resources, defaults.resources);
    resources.unshift({ id: createId(), title, category, link });

    if (writeStorage(keys.resources, resources)) {
      renderResources();
      renderStats();
      showGlobalMessage("Resource added.");
      e.target.reset();
    }
  });

  $("connectForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const student = $("connectStudent").value.trim();
    const counselor = $("connectCounselor").value;

    if (!student) {
      showGlobalMessage("Enter student name before assigning.", "error");
      return;
    }

    const connections = readStorage(keys.connections, defaults.connections);
    connections.unshift({ id: createId(), student, counselor });

    if (writeStorage(keys.connections, connections)) {
      incrementEngagement("counselorAssignments");
      renderConnections();
      renderStats();
      showGlobalMessage(`Assigned ${counselor} to ${student}.`);
      e.target.reset();
    }
  });
}

function initialize() {
  seedStorage();

  populateOptions("interestsSelect", appState.interests);
  populateOptions("skillsSelect", appState.skills);
  populateOptions("careerPathSelect", appState.careers, (c) => c.name, (c) => c.name);
  populateOptions("counselorSelect", appState.counselors, (c) => `${c.name} (${c.specialty})`, (c) => c.name);
  populateOptions("connectCounselor", appState.counselors, (c) => `${c.name} (${c.specialty})`, (c) => c.name);

  hydrateFormFromProfile();
  renderCareers();
  renderResources();
  renderVideos();
  renderSessions();
  renderConnections();
  renderStats();
  bindEvents();
}

initialize();
