# n8n-nodes-whatsapp-callmebot

[![npm version](https://img.shields.io/npm/v/n8n-nodes-whatsapp-callmebot.svg?style=for-the-badge)](https://www.npmjs.com/package/n8n-nodes-whatsapp-callmebot)
[![n8n community node](https://img.shields.io/badge/n8n-community--node-FF6D5A?style=for-the-badge&logo=n8n)](https://n8n.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

An official n8n community node to dispatch **instant, 100% free WhatsApp messages and speed-to-lead alerts** via CallMeBot API.

Zero complex Meta Cloud API verification, zero Facebook Business Manager headaches, and zero credit cards required.

---

## ⚡ Why Use This Node?

- 🚀 **15-Second Lead-to-WhatsApp Dispatch:** Perfect for high-ticket B2B agencies, clinics, and real estate speed-to-lead systems.
- 🆓 **100% Free WhatsApp API:** Powered by CallMeBot WhatsApp service.
- 🛡️ **Auto Phone Number Sanitization:** Automatically strips spaces, hyphens, and `+` prefixes to prevent routing 400 errors.
- 🔤 **Full Unicode & Emoji Support:** Auto URL-encodes emojis, newlines, and bullet points.
- 🔑 **Dual Auth Mode:** Supports both n8n Credentials Manager and direct node expressions for dynamic multi-recipient dispatch.

---

## 📦 Installation

### In your self-hosted n8n instance:

1. Open your n8n web interface.
2. Go to **Settings** > **Community Nodes**.
3. Click **Install a community node**.
4. Enter `n8n-nodes-whatsapp-callmebot`.
5. Agree to the risks and click **Install**.

Or install via terminal in your n8n root directory:
```bash
npm install n8n-nodes-whatsapp-callmebot
```

---

## 🔑 How to Get Your Free CallMeBot API Key (1-Minute Setup)

1. Save the official CallMeBot WhatsApp phone number to your contacts: **`+34 644 20 47 56`** (or verify live status at [CallMeBot WhatsApp Setup](https://www.callmebot.com/blog/free-api-whatsapp-messages/)).
2. Send this exact message to that number from your WhatsApp:
   ```text
   I allow callmebot to send me messages
   ```
3. CallMeBot will reply with your personal **`apikey`** within 10 seconds.
4. Paste your phone number (with country code) and API key into n8n!

---

## 🛠️ Usage & Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| **Authentication Mode** | Options | Yes | Choose `Specify In Node Parameters` or `Use Saved Credential`. |
| **Phone Number** | String | Yes | Target phone number with international dial code (e.g. `919876543210` or `15551234567`). |
| **API Key** | String | Yes | Your CallMeBot API key. |
| **Message Text** | String | Yes | The text content to dispatch. Supports n8n dynamic expressions (`{{ $json.body.lead_name }}`) and emojis. |

---

## 👨‍💻 Author

Built by **Mangal Soren**  
- **GitHub:** [@mangalbuilds](https://github.com/mangalbuilds)  
- **Email:** `mangal@usevance.com`  
- **Live Products:** [usevance.com](https://usevance.com) • [trackkaroai.com](https://trackkaroai.com) • [getprex.com](https://getprex.com/)

---

## 📜 License

[MIT](LICENSE)

