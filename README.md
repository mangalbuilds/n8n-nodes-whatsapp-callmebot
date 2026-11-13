# n8n-nodes-whatsapp-callmebot

[![npm version](https://img.shields.io/npm/v/n8n-nodes-whatsapp-callmebot.svg?style=for-the-badge)](https://www.npmjs.com/package/n8n-nodes-whatsapp-callmebot)
[![n8n community node](https://img.shields.io/badge/n8n-community--node-FF6D5A?style=for-the-badge&logo=n8n)](https://n8n.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

An n8n community node to dispatch **instant, 100% free WhatsApp messages and speed-to-lead alerts** via CallMeBot API.

Zero complex Meta Cloud API verification, zero Facebook Business Manager headaches, and zero credit cards required.

---

## ⚡ Why Use This Node?

- 🚀 **Lead-to-WhatsApp Dispatch:** Deliver instant alerts for new leads, form submissions, or urgent system notifications.
- 🆓 **100% Free WhatsApp Gateway:** Powered by the free CallMeBot WhatsApp service.
- 🛡️ **Auto Phone Number Sanitization:** Automatically strips spaces, hyphens, and `+` prefixes to prevent routing 400 errors.
- 🔤 **Full Unicode & Emoji Support:** Auto URL-encodes emojis, newlines, and bullet points.

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
4. Save your phone number and API key in n8n Credentials!

---

## 🛠️ Usage & Setup

### Step 1: Create the Credential
In n8n, navigate to **Credentials** > **New Credential** and search for **CallMeBot WhatsApp API** (`callMeBotApi`). Enter:
- **Phone Number:** Your verified WhatsApp number with international country code (no `+` or spaces, e.g. `919876543210` or `15551234567`).
- **API Key:** The apikey string received from the CallMeBot bot.

### Step 2: Add the Node to Your Workflow
Add the **WhatsApp CallMeBot** node to your workflow. The node exposes the following parameters:
- **Resource:** `Message` (default)
- **Operation:** `Send Text Message` (default)
- **Message Text:** The message string to send. Supports static text, emojis, newlines, and dynamic n8n expressions.

### Step 3: Example Expression
You can map incoming trigger data (e.g. from a Webhook, Typeform, or Google Sheets node) directly into **Message Text**:

```text
🚨 New Lead Received!
Name: {{ $json.body.name }}
Email: {{ $json.body.email }}
Phone: {{ $json.body.phone }}
Time: {{ $now.format('YYYY-MM-DD HH:mm') }}
```

### Step 4: Output Fields
When executed, the node returns a structured JSON payload:
```json
{
  "success": true,
  "statusCode": 200,
  "messagePreview": "🚨 New Lead Received!\nName: John Doe...",
  "rawResponse": "Message queued for delivery",
  "timestamp": "2026-11-13T15:27:00.000Z"
}
```

| Output Field | Type | Description |
| :--- | :--- | :--- |
| **success** | Boolean | `true` if HTTP status is 200 and CallMeBot accepted the message queue. |
| **statusCode** | Number | The HTTP response status code (e.g. `200`). |
| **messagePreview** | String | The first 80 characters of the sent text. |
| **rawResponse** | String | The raw response text returned from the CallMeBot API. |
| **timestamp** | String | ISO 8601 timestamp of execution. |

---

## 👨‍💻 Author

Built by **Mangal Soren**  
- **GitHub:** [@mangalbuilds](https://github.com/mangalbuilds)  
- **Email:** `mangal@usevance.com`  
- **Website:** [usevance.com](https://usevance.com) • [trackkaroai.com](https://trackkaroai.com) • [getprex.com](https://getprex.com/)

---

## 📜 License

[MIT](LICENSE)
