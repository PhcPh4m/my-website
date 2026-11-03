// ==========================================
// 1. DỮ LIỆU TĨNH (PHẦN 3)
// ==========================================
const skills = [
  { name: "HTML5", level: 90 },
  { name: "CSS3 & SCSS", level: 85 },
  { name: "JavaScript", level: 75 },
  { name: "Responsive Design", level: 80 },
  { name: "Git & GitHub", level: 70 },
  { name: "Tư duy UI/UX cơ bản", level: 60 },
];

const THEME_KEY = "theme";

const messages = {
  fullname: {
    valueMissing: "Vui lòng nhập họ và tên.",
    patternMismatch: "Họ và tên chỉ gồm chữ cái, từ 2 đến 50 ký tự.",
  },
  email: {
    valueMissing: "Vui lòng nhập email.",
    typeMismatch: "Email không đúng định dạng (ví dụ: ten@example.com).",
  },
  phone: {
    valueMissing: "Vui lòng nhập số điện thoại.",
    patternMismatch: "Số điện thoại gồm 10 chữ số, bắt đầu bằng 0.",
  },
  birthdate: {
    valueMissing: "Vui lòng chọn ngày sinh.",
    rangeOverflow: "Ngày sinh không được ở tương lai.",
  },
  message: {
    valueMissing: "Vui lòng nhập nội dung liên hệ.",
    tooShort: "Nội dung cần tối thiểu 10 ký tự.",
  },
};

// ==========================================
// 2. TIỆN ÍCH
// ==========================================
const escapeHtml = (text) =>
  String(text).replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[ch]);

const getLevelLabel = (level) => {
  if (level >= 85) return "Thành thạo";
  if (level >= 70) return "Khá";
  return "Đang luyện tập";
};

const getLocalDateString = () => {
  const now = new Date();
  const offsetMs = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - offsetMs).toISOString().slice(0, 10);
};

// ==========================================
// 3. RENDER KỸ NĂNG (PHẦN 3: map, filter)
// ==========================================
const renderSkills = (list) => {
  const container = document.getElementById("skills-list");
  const summary = document.getElementById("skills-summary");

  container.innerHTML = list
    .map(({ name, level }) => `
      <li>
        <div class="skill-item">
          <p class="skill-name">${escapeHtml(name)}</p>
          <span class="skill-level">${getLevelLabel(level)} - ${level}%</span>
          <div class="skill-bar" role="progressbar" aria-label="Mức độ ${escapeHtml(name)}"
               aria-valuenow="${level}" aria-valuemin="0" aria-valuemax="100">
            <div class="skill-bar__fill" style="width: ${level}%"></div>
          </div>
        </div>
      </li>`)
    .join("");

  const strongCount = list.filter((skill) => skill.level >= 80).length;
  summary.textContent = `Có ${list.length} kỹ năng, trong đó ${strongCount} kỹ năng ở mức thành thạo.`;
  summary.className = "status";
};

// ==========================================
// 4. FETCH DỮ LIỆU DỰ ÁN (PHẦN 4)
// ==========================================
const renderProjects = (projects) => {
  const container = document.getElementById("projects-list");
  container.innerHTML = projects
    .map(({ ten, congNghe, namHoanThanh }) => `
      <li>
        <div class="project-item">
          <span class="project-year">${escapeHtml(namHoanThanh)}</span>
          <h3>${escapeHtml(ten)}</h3>
          <p>Công nghệ: ${escapeHtml(congNghe)}</p>
        </div>
      </li>`)
    .join("");
};

const loadProjects = async () => {
  const status = document.getElementById("projects-status");
  status.textContent = "Đang tải danh sách dự án...";
  status.className = "status";

  try {
    const response = await fetch("js/data.json");
    if (!response.ok) {
      throw new Error(`Lỗi HTTP ${response.status}`);
    }
    const projects = await response.json();
    renderProjects(projects);
    status.textContent = `Đã tải ${projects.length} dự án.`;
    status.classList.add("is-success");
  } catch (error) {
    console.error("Không thể tải dữ liệu dự án:", error);
    status.textContent =
      "Không thể tải danh sách dự án. Hãy chạy trang bằng Live Server để tải được dữ liệu.";
    status.classList.add("is-error");
  }
};

// ==========================================
// 5. DARK MODE + LOCALSTORAGE (PHẦN 4)
// ==========================================
const applyTheme = (isDark) => {
  document.body.classList.toggle("dark-theme", isDark);
  const button = document.getElementById("theme-toggle");
  button.setAttribute("aria-pressed", String(isDark));
  button.textContent = isDark ? "☀️ Chế độ sáng" : "🌙 Chế độ tối";
};

const initTheme = () => {
  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem(THEME_KEY);
  } catch (error) {
    console.warn("Không đọc được localStorage:", error);
  }

  applyTheme(savedTheme === "dark");

  document.getElementById("theme-toggle").addEventListener("click", () => {
    const isDark = !document.body.classList.contains("dark-theme");
    applyTheme(isDark);
    try {
      localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
    } catch (error) {
      console.warn("Không lưu được localStorage:", error);
    }
  });
};

// ==========================================
// 6. VALIDATE FORM (PHẦN 3)
// ==========================================
const getErrorMessage = (input) => {
  const { validity } = input;
  const fieldMessages = messages[input.name] || {};

  if (validity.valueMissing) return fieldMessages.valueMissing;
  if (validity.typeMismatch) return fieldMessages.typeMismatch;
  if (validity.patternMismatch) return fieldMessages.patternMismatch;
  if (validity.tooShort) return fieldMessages.tooShort;
  if (validity.rangeOverflow) return fieldMessages.rangeOverflow;
  return "Thông tin chưa hợp lệ.";
};

const validateField = (input) => {
  input.value = input.value.trim();

  const errorEl = document.getElementById(`${input.id}-error`);
  const message = input.validity.valid ? "" : getErrorMessage(input);

  errorEl.textContent = message;
  input.classList.toggle("is-invalid", Boolean(message));
  input.setAttribute("aria-invalid", String(Boolean(message)));

  return !message;
};

const clearFieldErrors = (fields) => {
  fields.forEach((field) => {
    field.classList.remove("is-invalid");
    field.removeAttribute("aria-invalid");
    document.getElementById(`${field.id}-error`).textContent = "";
  });
};

const initContactForm = () => {
  const form = document.getElementById("contact-form");
  const formMessage = document.getElementById("form-message");
  const fields = [...form.querySelectorAll("input, textarea")];

  document.getElementById("birthdate").max = getLocalDateString();

  fields.forEach((field) => {
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => {
      if (field.classList.contains("is-invalid")) {
        validateField(field);
      }
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const results = fields.map((field) => validateField(field));

    if (!results.every(Boolean)) {
      formMessage.textContent = "Vui lòng kiểm tra lại các trường được đánh dấu đỏ.";
      formMessage.className = "form-message is-error";
      fields.find((field) => field.classList.contains("is-invalid")).focus();
      return;
    }

    formMessage.textContent = "Cảm ơn bạn! Thông tin liên hệ đã được gửi thành công.";
    formMessage.className = "form-message is-success";
    form.reset();
    clearFieldErrors(fields);
  });
};

// ==========================================
// 7. KHỞI CHẠY
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const strongSkills = skills.filter((skill) => skill.level >= 0);

  renderSkills(strongSkills);
  loadProjects();
  initTheme();
  initContactForm();
});