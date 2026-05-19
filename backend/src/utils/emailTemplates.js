const BASE_STYLES = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
    body {
      margin: 0; padding: 0;
      background-color: #D8E9D9;
      font-family: Inter, system-ui, -apple-system, sans-serif;
      color: #1E2A1E;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      max-width: 600px;
      margin: 32px auto;
      padding: 0 16px 32px;
    }
    .email-card {
      background: #F7F9F3;
      border-radius: 16px;
      border: 1px solid #B8D4B8;
      overflow: hidden;
    }
    .email-header {
      background: #2C5F2D;
      padding: 28px 32px 24px;
      position: relative;
      overflow: hidden;
    }
    .email-header::before {
      content: '';
      position: absolute; right: -24px; top: -24px;
      width: 140px; height: 140px; border-radius: 50%;
      background: rgba(255,255,255,0.04);
    }
    .email-header::after {
      content: '';
      position: absolute; right: 24px; bottom: -36px;
      width: 90px; height: 90px; border-radius: 50%;
      background: rgba(255,255,255,0.03);
    }
    .email-header h1 {
      font-size: 22px; font-weight: 500;
      color: #ffffff; margin: 0 0 8px; line-height: 1.3;
    }
    .header-meta {
      display: flex; flex-wrap: wrap; gap: 12px;
      font-size: 12px; color: rgba(255,255,255,0.55);
    }
    .badge {
      display: inline-block;
      font-size: 11px; font-weight: 500;
      padding: 2px 10px; border-radius: 20px;
    }
    .badge-auth     { background: rgba(168,213,168,0.2); color: #A8D5A8; }
    .badge-reset    { background: rgba(255,220,140,0.18); color: #FFD87A; }
    .badge-success  { background: rgba(168,213,168,0.2); color: #A8D5A8; }
    .badge-welcome  { background: rgba(168,213,168,0.2); color: #A8D5A8; }
    .badge-verified { background: rgba(168,213,168,0.2); color: #A8D5A8; }
    .email-body {
      padding: 28px 32px;
      line-height: 1.65;
    }
    .email-body p {
      font-size: 14.5px; color: #1E2A1E;
      margin: 0 0 14px; line-height: 1.65;
    }
    .code-box {
      background: #E3F0E3;
      border: 1px solid #B8D4B8;
      border-radius: 12px;
      padding: 24px 20px;
      text-align: center;
      margin: 20px 0;
    }
    .code-value {
      font-size: 36px; font-weight: 600;
      letter-spacing: 10px; color: #2C5F2D;
      font-variant-numeric: tabular-nums;
      display: block;
    }
    .code-expire {
      font-size: 12px; color: #5A7D5A;
      margin-top: 8px; display: block;
    }
    .btn-wrap { 
      text-align: center; 
      margin: 24px 0; 
    }
    .btn-wrap a {
      color: white;
    }
    .btn-primary {
      display: inline-block;
      background: #2C5F2D; color: #ffffff;
      padding: 13px 32px;
      border-radius: 8px;
      font-size: 14px; font-weight: 500;
      text-decoration: none; line-height: 1;
      border: none;
    }
    .tip-list {
      background: #E3F0E3;
      border: 1px solid #B8D4B8;
      border-radius: 10px;
      padding: 14px 18px;
      margin: 14px 0;
      list-style: none;
    }
    .tip-list li {
      font-size: 13.5px; color: #1E2A1E;
      padding: 4px 0 4px 18px;
      position: relative;
    }
    .tip-list li::before {
      content: '';
      position: absolute; left: 0; top: 11px;
      width: 6px; height: 6px; border-radius: 50%;
      background: #5A7D5A;
    }
    .note {
      font-size: 12.5px !important;
      color: #4A5F4A !important;
    }
    /* ── Welcome: name banner ── */
    .highlight-banner {
      background: #E3F0E3;
      border: 1px solid #B8D4B8;
      border-radius: 12px;
      padding: 18px 20px;
      margin: 4px 0 20px;
      text-align: center;
    }
    .highlight-banner .name {
      font-size: 20px; font-weight: 600;
      color: #2C5F2D; display: block;
      margin-bottom: 4px;
    }
    .highlight-banner .sub {
      font-size: 12.5px; color: #5A7D5A;
    }
    /* ── Welcome: feature grid (table-based for email clients) ── */
    .feature-grid {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      margin: 4px 0 20px;
    }
    .feature-cell {
      width: 33.33%;
      padding: 14px 10px;
      text-align: center;
      vertical-align: top;
    }
    .feature-icon {
      display: block;
      width: 40px; height: 40px;
      background: #E3F0E3;
      border: 1px solid #B8D4B8;
      border-radius: 10px;
      margin: 0 auto 8px;
      line-height: 40px;
      font-size: 18px;
      text-align: center;
    }
    .feature-label {
      font-size: 12px; font-weight: 500;
      color: #2C5F2D; display: block;
      margin-bottom: 4px;
    }
    .feature-desc {
      font-size: 11.5px; color: #5A7D5A;
      line-height: 1.5;
    }
    .verified-detail {
      background: #E3F0E3;
      border: 1px solid #B8D4B8;
      border-radius: 10px;
      padding: 14px 18px;
      margin: 14px 0;
      font-size: 13.5px; color: #1E2A1E;
      line-height: 1.65;
    }
    .verified-detail strong { color: #2C5F2D; }
    
    /* Fixed separator styles - properly closed */
    .separator {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin: 20px 0;
    }
    .separator-line {
      flex: 1;
      height: 1px;
      background: linear-gradient(90deg, transparent, #B8D4B8, #B8D4B8, transparent);
    }
    .separator-icon {
      font-size: 14px;
      color: #B8D4B8;
    }
    
    .email-footer {
      background: #E3F0E3;
      border-top: 1px solid #B8D4B8;
      padding: 14px 32px;
    }
    .footer-inner {
      display: flex; flex-wrap: wrap;
      align-items: center; justify-content: space-between;
      gap: 10px;
    }
    .footer-brand {
      font-size: 13px; font-weight: 500; color: #2C5F2D;
      display: flex; align-items: center; gap: 6px;
    }
    .footer-note {
      width: 100%;
      font-size: 11px; color: #5A7D5A;
      margin-top: 8px;
    }
    @media (max-width: 480px) {
      .wrapper { margin: 0; padding: 0 0 24px; }
      .email-card { border-radius: 0; border-left: none; border-right: none; }
      .email-header { padding: 22px 20px 18px; }
      .email-body { padding: 22px 20px; }
      .email-footer { padding: 12px 20px; }
      .code-value { font-size: 28px; letter-spacing: 7px; }
      .email-header h1 { font-size: 18px; }
    }
  </style>
`;

const makeHeader = (title, badgeClass, badgeLabel) => `
  <div class="email-header">
    <h1>${title}</h1>
    <div class="header-meta">
      <span>From: Your App Team</span>
      <span class="badge ${badgeClass}">${badgeLabel}</span>
    </div>
  </div>
`;

const FOOTER = `
  <div class="email-footer">
    <div class="footer-inner">
      <div class="footer-brand">&#x1F343; Your App Team</div>
    </div>
    <div class="footer-note">This is an automated message — please do not reply directly to this email.</div>
  </div>
`;

/* ============================================================
   TEMPLATE 1: Email Verification
   Usage: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", code).replace("{expiresIn}", expiresIn)
   ============================================================ */
export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
  ${BASE_STYLES}
</head>
<body>
  <div class="wrapper">
    <div class="email-card">

      ${makeHeader('Verify your email address', 'badge-auth', 'Authentication')}

      <div class="email-body">
        <p>Hello,</p>
        <p>Thank you for signing up! Enter the verification code below on the confirmation page to complete your registration.</p>

        <hr>

        <div class="code-box">
          <span class="code-value">{verificationCode}</span>
          <span class="code-expire">&#x23F0; Expires in {expiresIn} minutes</span>
        </div>

        <hr>

        <p class="note">If you didn't create an account with us, you can safely ignore this email — no action is required.</p>
      </div>

      ${FOOTER}
    </div>
  </div>
</body>
</html>
`;

/* ============================================================
   TEMPLATE 2: Password Reset Request
   Usage: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", url)
   ============================================================ */
export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
  ${BASE_STYLES}
</head>
<body>
  <div class="wrapper">
    <div class="email-card">

      ${makeHeader('Reset your password', 'badge-reset', 'Password Reset')}

      <div class="email-body">
        <p>Hello,</p>
        <p>We received a request to reset your password. If this was you, click the button below to choose a new one. The link will expire in <strong style="color:#2C5F2D">1 hour</strong> for security reasons.</p>

        <hr>

        <div class="btn-wrap">
          <a href="{resetURL}" class="btn-primary">&#x1F511;&nbsp; Reset password</a>
        </div>

        <hr>

        <p class="note">If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged and your account stays secure.</p>
      </div>

      ${FOOTER}
    </div>
  </div>
</body>
</html>
`;

/* ============================================================
   TEMPLATE 3: Password Reset Success
   Usage: PASSWORD_RESET_SUCCESS_TEMPLATE (no replacements needed)
   ============================================================ */
export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
  ${BASE_STYLES}
</head>
<body>
  <div class="wrapper">
    <div class="email-card">

      ${makeHeader('Password reset successful', 'badge-success', 'Account Security')}

      <div class="email-body">
        <p>Hello,</p>
        <p>Your password has been successfully updated. Your account is secure and ready to use.</p>

        <hr>

        <p style="font-size:13.5px; color:#4A5F4A; margin-bottom:8px">For your security, we recommend:</p>
        <ul class="tip-list">
          <li>Use a strong, unique password — avoid reusing passwords across sites</li>
          <li>Enable two-factor authentication if available on your account</li>
          <li>Never share your password with anyone</li>
        </ul>

        <hr>

        <p class="note">If you did not initiate this change, please contact our support team immediately — your account may be at risk.</p>
      </div>

      ${FOOTER}
    </div>
  </div>
</body>
</html>
`;

/* ============================================================
   TEMPLATE 4: Welcome Email
   Usage: WELCOME_EMAIL_TEMPLATE.replace("{name}", userName)
   ============================================================ */
export const WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Your App</title>
  ${BASE_STYLES}
</head>
<body>
  <div class="wrapper">
    <div class="email-card">

      ${makeHeader('Welcome aboard!', 'badge-welcome', 'New Member')}

      <div class="email-body">
        <p>Hello,</p>

        <div class="highlight-banner">
          <span class="name">Welcome, {name}! &#x1F343;</span>
          <span class="sub">Your account is all set and ready to go.</span>
        </div>

        <p>We're thrilled to have you with us. Here's a quick look at what you can do from day one:</p>

        <hr>

        <table class="feature-grid" role="presentation">
          <tr>
            <td class="feature-cell">
              <span class="feature-icon">&#x1F464;</span>
              <span class="feature-label">Your profile</span>
              <span class="feature-desc">Personalise your account and settings</span>
            </td>
            <td class="feature-cell">
              <span class="feature-icon">&#x1F4CA;</span>
              <span class="feature-label">Dashboard</span>
              <span class="feature-desc">Track activity and stay on top of things</span>
            </td>
            <td class="feature-cell">
              <span class="feature-icon">&#x1F6E1;&#xFE0F;</span>
              <span class="feature-label">Security</span>
              <span class="feature-desc">Manage your password and 2FA options</span>
            </td>
          </tr>
        </table>

        <hr>

        <p class="note">Questions? Our support team is always here to help. Just reply to any of our emails or visit the help centre.</p>
      </div>

      ${FOOTER}
    </div>
  </div>
</body>
</html>
`;

/* ============================================================
   TEMPLATE 5: Email Verified Successfully
   Usage: EMAIL_VERIFIED_TEMPLATE (no replacements needed)
   ============================================================ */
export const EMAIL_VERIFIED_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verified</title>
  ${BASE_STYLES}
</head>
<body>
  <div class="wrapper">
    <div class="email-card">

      ${makeHeader('Email verified successfully', 'badge-verified', 'Verified')}

      <div class="email-body">
        <p>Hello,</p>
        <p>Great news — your email address has been verified and your account is now fully active.</p>

        <hr>

        <div class="verified-detail">
          <strong>What this means for you:</strong><br><br>
          Your account is now fully verified. You have access to all features, and we'll send important
          account notifications to this address going forward.
        </div>

        <hr>

        <p class="note">If you didn't verify this email or believe this was done in error, please contact our support team straight away.</p>
      </div>

      ${FOOTER}
    </div>
  </div>
</body>
</html>
`;

/* ============================================================
   STYLE GUIDE REFERENCE
   ─────────────────────────────────────────────────────────────
   Colors
     #D8E9D9   Page background (soft sage)
     #F7F9F3   Card / container surface (cream)
     #2C5F2D   Headings, CTA buttons, brand (forest green)
     #5A7D5A   Borders, muted labels (moss)
     #E3F0E3   Subtle highlight fills (pale fern)
     #B8D4B8   Card and component borders
     #1E2A1E   Body copy — WCAG AA on cream
     #4A5F4A   Secondary text, notes

   Typography
     Font stack: Inter, system-ui, -apple-system, sans-serif
     Body:       14.5px / 1.65 line-height / weight 400
     H1:         22px / weight 500 / color #fff on header
     Code:       36px / weight 600 / tabular-nums / color #2C5F2D
     Note:       12.5px / color #4A5F4A

   Spacing
     Card padding:   28px 32px (mobile: 22px 20px)
     Section gap:    20px (via .sep margin)
     Button padding: 13px 32px

   Radii
     Card: 16px  |  Code/banner: 12px  |  Buttons: 8px  |  Badges: 20px

   Templates & their replacements
     VERIFICATION_EMAIL_TEMPLATE      → {verificationCode}
     PASSWORD_RESET_REQUEST_TEMPLATE  → {resetURL}
     PASSWORD_RESET_SUCCESS_TEMPLATE  → (none)
     WELCOME_EMAIL_TEMPLATE           → {name}
     EMAIL_VERIFIED_TEMPLATE          → (none)
   ============================================================ */