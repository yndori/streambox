# StreamBox Authentication System

## Overview
Complete Supabase-based authentication system for StreamBox with sign-up, sign-in, session management, and sign-out functionality.

## Features Implemented

### ✅ Sign-Up
- Email validation (format checking)
- Password validation (minimum 6 characters)
- Password confirmation matching
- Input trimming and sanitization
- Success/error messaging
- Auto-clear forms after success
- Form submissions via Enter key

### ✅ Sign-In
- Email and password authentication
- Input validation before submission
- User session creation
- Automatic UI updates
- Success/error messaging
- Session persistence

### ✅ Session Management
- Automatic session detection on page load
- Real-time auth state listener
- Persistent login across page reloads
- Session-based UI toggle
- Logged-in/logged-out views

### ✅ Sign-Out
- Safe session termination
- Automatic UI reset
- Form clearing
- Success messaging

### ✅ User Display
- Email display in user bar when logged in
- User status indicator
- Responsive layout for mobile

## File Structure

```
config.js                    # Supabase configuration (API keys)
auth.js                      # Authentication logic and event handlers
index.html                   # HTML forms and UI structure
styles.css                   # Authentication UI styling
```

## Setup Instructions

### 1. Configuration
Ensure `config.js` exists with your Supabase credentials:
```javascript
const SUPABASE_URL = "your-supabase-url";
const SUPABASE_ANON_KEY = "your-supabase-anon-key";
```

### 2. Supabase Requirements
- Supabase account created
- Project with authentication enabled
- Email provider configured in Supabase dashboard

### 3. HTML Structure
The authentication UI includes:
- Sign-in form with email and password
- Sign-up form with email, password, and confirm password
- User information bar (visible when logged in)
- Message display area for feedback

## Usage

### For Users

**Sign Up:**
1. Enter email address
2. Enter password (minimum 6 characters)
3. Confirm password
4. Click "Create Account"
5. Check email to confirm account

**Sign In:**
1. Enter email address
2. Enter password
3. Click "Sign In" or press Enter

**Sign Out:**
1. Click "Sign Out" button in user bar

### For Developers

#### Authentication Object
```javascript
const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
```

#### Check if User is Logged In
```javascript
const { data } = await client.auth.getUser();
if (data.user) {
  console.log("User logged in:", data.user.email);
}
```

#### Listen to Auth Changes
```javascript
client.auth.onAuthStateChange((event, session) => {
  console.log("Auth event:", event);
  // event can be: INITIAL_SESSION, SIGNED_IN, SIGNED_OUT, etc.
});
```

#### Sign Up
```javascript
const { data, error } = await client.auth.signUp({
  email: "user@example.com",
  password: "securepassword"
});
```

#### Sign In
```javascript
const { data, error } = await client.auth.signInWithPassword({
  email: "user@example.com",
  password: "securepassword"
});
```

#### Sign Out
```javascript
await client.auth.signOut();
```

## Validation Rules

### Email Validation
- Must be valid email format (contains @ and domain)
- Trimmed before submission
- Required field

### Password Validation
- Minimum 6 characters
- Trimmed before submission
- Required field
- Must match confirmation field (on sign-up)

### Error Handling
- Clear error messages displayed to user
- Errors from Supabase automatically shown
- Try-catch blocks prevent crashes
- Console logging for debugging

## UI/UX Features

### Message Display
- Auto-clear after 5 seconds for success messages
- Color-coded messages (red for errors, green for success)
- Accessible with ARIA live regions

### Accessibility
- Form labels properly associated with inputs
- ARIA labels for screen readers
- Keyboard support (Enter key submits forms)
- Semantic HTML structure

### Responsive Design
- Mobile-friendly authentication forms
- Two-column layout on desktop (single column on mobile)
- Touch-friendly button sizes
- Proper spacing and padding

## Testing Checklist

- [ ] Sign-up with valid email and matching passwords
- [ ] Sign-up with mismatched passwords (should fail)
- [ ] Sign-up with weak password < 6 chars (should fail)
- [ ] Sign-up with invalid email format (should fail)
- [ ] Sign-in with correct credentials
- [ ] Sign-in with wrong credentials (should fail)
- [ ] Sign-out functionality
- [ ] Page refresh with active session (should persist login)
- [ ] Email display in user bar
- [ ] Forms clear after successful sign-up
- [ ] Forms don't clear on validation errors
- [ ] Success messages appear and auto-disappear
- [ ] Error messages appear and persist
- [ ] Enter key submits forms
- [ ] Buttons disable while processing

## Security Notes

⚠️ **Important:**
- Never commit `config.js` with real credentials to public repositories
- Add `config.js` to `.gitignore`
- Use environment variables in production
- Supabase handles password hashing securely
- Email confirmation is required before account activation (optional, configurable in Supabase)
- Session tokens are managed by Supabase automatically

## Troubleshooting

### "Script error: supabase is not defined"
- Ensure Supabase CDN script is loaded in HTML before auth.js
- Check internet connection for CDN access

### Sign-up shows "Check your email" but no email arrives
- Check spam/junk folder
- Verify email settings in Supabase dashboard
- Ensure SMTP provider is configured

### Session not persisting after page reload
- Check browser localStorage is enabled
- Verify session token is valid
- Check Supabase project session settings

### "Missing DOM elements" console error
- Verify all required HTML elements exist with correct IDs
- Check HTML hasn't been modified

## Future Enhancements

Possible additions:
- Password reset functionality
- Social login (Google, GitHub, etc.)
- Two-factor authentication
- User profile management
- Email verification resend
- Remember me functionality
- Rate limiting for login attempts
- Password strength meter

## Support

For Supabase documentation: https://supabase.com/docs
For issues, check console errors (F12) and Supabase dashboard logs.
