// =============================
// 🔌 SUPABASE INIT
// =============================
// For production: use environment variables (backend only)
// For development: config.js is acceptable but should be in .gitignore
const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("ERROR: Supabase credentials not configured. Check config.js");
}

// =============================
// 🎯 ELEMENTS (Declared globally)
// =============================
let authContainer, appContent, userBar, userEmail, message;
let signupEmail, signupPassword, confirmPassword, signinEmail, signinPassword;
let signupBtn, signinBtn, logoutBtn;

// =============================
// 💾 EMAIL STORAGE (localStorage)
// =============================
const STORED_EMAILS_KEY = 'streambox_emails';

function getSavedEmails() {
  const saved = localStorage.getItem(STORED_EMAILS_KEY);
  return saved ? JSON.parse(saved) : [];
}

function saveEmail(email) {
  const emails = getSavedEmails();
  if (!emails.includes(email)) {
    emails.unshift(email); // Add to beginning
    if (emails.length > 5) emails.pop(); // Keep only 5 most recent
    localStorage.setItem(STORED_EMAILS_KEY, JSON.stringify(emails));
  }
  updateEmailSuggestions();
}

function updateEmailSuggestions() {
  const datalist = document.getElementById('emailSuggestions');
  if (!datalist) return;
  
  const emails = getSavedEmails();
  datalist.innerHTML = '';
  
  emails.forEach(email => {
    const option = document.createElement('option');
    option.value = email;
    datalist.appendChild(option);
  });
}

function initializeElements() {
  authContainer = document.getElementById("authContainer");
  appContent = document.getElementById("appContent");
  userBar = document.getElementById("userBar");
  userEmail = document.getElementById("userEmail");
  message = document.getElementById("message");

  // Form inputs
  signupEmail = document.getElementById("signupEmail");
  signupPassword = document.getElementById("signupPassword");
  confirmPassword = document.getElementById("confirmPassword");
  signinEmail = document.getElementById("signinEmail");
  signinPassword = document.getElementById("signinPassword");

  // Buttons
  signupBtn = document.getElementById("signupBtn");
  signinBtn = document.getElementById("signinBtn");
  logoutBtn = document.getElementById("logoutBtn");
}

// =============================
// 🛡️ VALIDATION HELPER
// =============================
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  // Password requirements: minimum 8 characters, uppercase, lowercase, number
  if (password.length < 8) {
    return { valid: false, message: "Password must be at least 8 characters" };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: "Password must contain at least one uppercase letter" };
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: "Password must contain at least one lowercase letter" };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: "Password must contain at least one number" };
  }
  return { valid: true, message: "" };
}

function validateForm(email, password, confirmPwd = null) {
  // Trim inputs
  email = email.trim();
  password = password.trim();

  if (!email) {
    return { valid: false, message: "Email is required" };
  }

  if (!validateEmail(email)) {
    return { valid: false, message: "Please enter a valid email" };
  }

  if (!password) {
    return { valid: false, message: "Password is required" };
  }

  const pwdValidation = validatePassword(password);
  if (!pwdValidation.valid) {
    return pwdValidation;
  }

  if (confirmPwd !== null && password !== confirmPwd.trim()) {
    return { valid: false, message: "Passwords do not match" };
  }

  return { valid: true, message: "" };
}

// =============================
// 🟢 UI CONTROL
// =============================
function setAuthUI(user) {
  if (!authContainer || !appContent || !userBar) {
    console.error("Missing DOM elements!");
    return;
  }

  if (user) {
    authContainer.style.display = "none";
    appContent.style.display = "block";
    userBar.style.display = "block";
    userEmail.textContent = user.email;
  } else {
    authContainer.style.display = "block";
    appContent.style.display = "none";
    userBar.style.display = "none";
    clearAuthForms();
  }
}

function clearAuthForms(clearMessage = true) {
  signupEmail.value = "";
  signupPassword.value = "";
  confirmPassword.value = "";
  signinEmail.value = "";
  signinPassword.value = "";
  // By default, clear the visible message; callers can opt out
  // (e.g. preserve the "check your email" notice after sign-up)
  if (clearMessage && message) message.textContent = "";
}

// =============================
// 📩 MESSAGE
// =============================
function showMessage(text, color = "red") {
  message.textContent = text;
  message.style.color = color;
  
  // Auto-clear success messages after 5 seconds
  if (color === "green") {
    setTimeout(() => {
      message.textContent = "";
    }, 5000);
  }
}

// =============================
// 🟢 SIGN UP
// =============================
function setupSignUpListener() {
  signupBtn.addEventListener("click", async () => {
    const email = signupEmail.value;
    const password = signupPassword.value;
    const confirm = confirmPassword.value;

    // Validate form
    const validation = validateForm(email, password, confirm);
    if (!validation.valid) {
      showMessage(validation.message);
      return;
    }

    signupBtn.disabled = true;
    showMessage("Creating account...");

    try {
      const { data, error } = await client.auth.signUp({
        email: email.trim(),
        password,
      });

      if (error) {
        showMessage(error.message);
        return;
      }

      showMessage("Sign-up successful! Check your email to confirm your account.", "green");
      saveEmail(email.trim());
      // Keep the message visible so user can read the verification instruction
      clearAuthForms(false);
    } catch (err) {
      showMessage("An unexpected error occurred. Please try again.");
      console.error("Sign-up error:", err);
    } finally {
      signupBtn.disabled = false;
    }
  });
}
// =============================
// 🔵 SIGN IN
// =============================
function setupSignInListener() {
  signinBtn.addEventListener("click", async () => {
    const email = signinEmail.value;
    const password = signinPassword.value;

    // Validate form
    const validation = validateForm(email, password);
    if (!validation.valid) {
      showMessage(validation.message);
      return;
    }

    signinBtn.disabled = true;
    showMessage("Signing in...");

    try {
      const { data, error } = await client.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        showMessage(error.message);
        return;
      }

      showMessage("Sign in successful!", "green");
      saveEmail(email.trim());
      setAuthUI(data.user);
    } catch (err) {
      showMessage("An unexpected error occurred. Please try again.");
      console.error("Sign-in error:", err);
    } finally {
      signinBtn.disabled = false;
    }
  });
}

// =============================
// 🔴 SIGN OUT
// =============================
function setupLogoutListener() {
  logoutBtn.addEventListener("click", async () => {
    logoutBtn.disabled = true;
    showMessage("Signing out...");

    try {
      await client.auth.signOut();
      showMessage("Signed out successfully!", "green");
      setAuthUI(null);
    } catch (err) {
      showMessage("Error signing out. Please try again.");
      console.error("Sign-out error:", err);
    } finally {
      logoutBtn.disabled = false;
    }
  });
}

// =============================
// 🔄 SESSION CHECK
// =============================
async function initSession() {
  try {
    const { data } = await client.auth.getUser();
    setAuthUI(data.user);
  } catch (err) {
    console.error("Error checking user session:", err);
    setAuthUI(null);
  }
}

// =============================
// 🔄 LIVE AUTH CHANGE LISTENER
// =============================
function setupAuthStateListener() {
  client.auth.onAuthStateChange((event, session) => {
    setAuthUI(session?.user || null);
  });
}

// =============================
// ⌨️ ENTER KEY SUPPORT
// =============================
function setupKeyboardShortcuts() {
  signupEmail.addEventListener("keypress", (e) => {
    if (e.key === "Enter") signupBtn.click();
  });
  signupPassword.addEventListener("keypress", (e) => {
    if (e.key === "Enter") signupBtn.click();
  });
  confirmPassword.addEventListener("keypress", (e) => {
    if (e.key === "Enter") signupBtn.click();
  });
  signinEmail.addEventListener("keypress", (e) => {
    if (e.key === "Enter") signinBtn.click();
  });
  signinPassword.addEventListener("keypress", (e) => {
    if (e.key === "Enter") signinBtn.click();
  });
}

// =============================
// 👁️ PASSWORD VISIBILITY TOGGLE
// =============================
function setupPasswordToggle() {
  document.querySelectorAll('.password-visibility-toggle').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const targetId = this.getAttribute('data-target');
      const passwordInput = document.getElementById(targetId);
      const toggleText = document.getElementById(targetId + 'ToggleText');
      
      if (this.checked) {
        passwordInput.type = 'text';
        toggleText.textContent = 'Hide password';
      } else {
        passwordInput.type = 'password';
        toggleText.textContent = 'Show password';
      }
    });
  });
}

// =============================
// 🚀 INITIALIZE ALL ON DOM READY
// =============================
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all DOM elements
  initializeElements();
  
  // Load saved emails into datalist
  updateEmailSuggestions();
  
  // Setup all listeners
  setupSignUpListener();
  setupSignInListener();
  setupLogoutListener();
  setupKeyboardShortcuts();
  setupPasswordToggle();
  setupAuthStateListener();
  
  // Check existing session
  initSession();
});

