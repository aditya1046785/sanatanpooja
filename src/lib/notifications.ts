// Resend Email + Google Sheet Alert logic
export async function triggerAlerts(data: {
  type: "Booking" | "Kundali";
  name: string;
  phone: string;
  service: string;
  dateOrDob: string;
  amount?: number;
  paymentId: string;
}) {
  // 1. Google Sheets Webhook Call (Fire and forget style)
  const sheetWebhook = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (sheetWebhook) {
    try {
      await fetch(sheetWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        }),
      });
    } catch (err) {
      console.error("Google Sheet webhook failed:", err);
    }
  }

  // 2. Resend Email Trigger to Admin
  const resendKey = process.env.RESEND_API_KEY;
  const adminEmail = process.env.ADMIN_EMAIL;
  if (resendKey && adminEmail) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: "Sanatan Seva Alerts <alerts@sanatanseva.com>",
          to: [adminEmail],
          subject: `🔔 Nai ${data.type} Confirmation: ${data.name} (${data.service})`,
          html: `
            <h2>Shubh Samachar! Nai Booking Confirm Hui Hai</h2>
            <p><strong>Prakar:</strong> ${data.type}</p>
            <p><strong>Bhakta ka Naam:</strong> ${data.name}</p>
            <p><strong>Mobile:</strong> ${data.phone}</p>
            <p><strong>Sewa / Puja:</strong> ${data.service}</p>
            <p><strong>Tithi/Samay:</strong> ${data.dateOrDob}</p>
            <p><strong>Payment ID:</strong> ${data.paymentId}</p>
            <p>Har Har Mahadev!</p>
          `,
        }),
      });
    } catch (err) {
      console.error("Resend email alert failed:", err);
    }
  }
}