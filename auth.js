// =============================
// 🔌 SUPABASE INIT
// =============================


const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// =============================
// 🎯 ELEMENTS
// =============================
const authContainer = document.getElementById("authContainer");
const appContent = document.getElementById("appContent");
const userBar = document.getElementById("userBar");
const userEmail = document.getElementById("userEmail");
const message = document.getElementById("message");


// buttons
const signupBtn = document.getElementById("signupBtn");
const signinBtn = document.getElementById("signinBtn");
const logoutBtn = document.getElementById("logoutBtn");


// =============================
// 🟢 UI CONTROL (STEP 7)
// =============================
function setAuthUI(user) {
  const authContainer = document.getElementById("authContainer");
  const appContent = document.getElementById("appContent");
  const userBar = document.getElementById("userBar");
  const userEmail = document.getElementById("userEmail");

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
  }
}

// =============================
// 📩 MESSAGE
// =============================
function showMessage(text, color = "red") {
  message.textContent = text;
  message.style.color = color;
}

// =============================
// 🟢 SIGN UP
// =============================
signupBtn.addEventListener("click", async () => {
  signupBtn.disabled = true;

  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const confirm = document.getElementById("confirmPassword").value;

  if (password !== confirm) {
    showMessage("Passwords do not match");
    signupBtn.disabled = false;
    return;
  }

  const { error } = await client.auth.signUp({
    email,
    password,
  });

  signupBtn.disabled = false;

  if (error) {
    showMessage(error.message);
    return;
  }

  showMessage("Check your email", "green");
});
// =============================
// 🔵 SIGN IN
// =============================
signinBtn.addEventListener("click", async () => {
  signinBtn.disabled = true;

  const email = document.getElementById("signinEmail").value;
  const password = document.getElementById("signinPassword").value;

  const { data, error } = await client.auth.signInWithPassword({
    email,
    password,
  });

  signinBtn.disabled = false;

  if (error) {
    showMessage(error.message);
    return;
  }

  setAuthUI(data.user);
});

// =============================
// 🔴 SIGN OUT
// =============================
logoutBtn.addEventListener("click", async () => {
  logoutBtn.disabled = true;

  await client.auth.signOut();

  logoutBtn.disabled = false;
  setAuthUI(null);
});

// =============================
// 🔄 SESSION CHECK (IMPORTANT)
// =============================
async function initSession() {
  const { data } = await client.auth.getUser();
  setAuthUI(data.user);
}

initSession();

// =============================
// 🔄 LIVE AUTH CHANGE
// =============================
client.auth.onAuthStateChange((event, session) => {
  setAuthUI(session?.user || null);
});

