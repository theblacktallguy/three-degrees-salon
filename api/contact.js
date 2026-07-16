function getText(value, maxLength) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method not allowed." });
  }

  const name = getText(req.body?.name, 100).replace(/[\r\n]+/g, " ");
  const email = getText(req.body?.email, 254);
  const phone = getText(req.body?.phone, 50);
  const service = getText(req.body?.service, 100);
  const message = getText(req.body?.message, 5_000);
  const adminEmail = process.env.ADMIN_EMAIL;
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Name, email, and message are required." });
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ message: "Enter a valid email address." });
  }

  if (!adminEmail || !resendApiKey) {
    console.error("Contact form email is not configured.");
    return res.status(500).json({ message: "The contact form is temporarily unavailable." });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL || "Three Degrees Salon <onboarding@resend.dev>",
        to: [adminEmail],
        reply_to: email,
        subject: `Website inquiry from ${name}${service ? ` — ${service}` : ""}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Phone: ${phone || "Not provided"}`,
          `Service interest: ${service || "Not provided"}`,
          "",
          "Message:",
          message,
        ].join("\n"),
      }),
    });

    if (!response.ok) {
      console.error("Resend rejected contact form submission.", await response.text());
      return res.status(502).json({ message: "We couldn't send your message. Please try again shortly." });
    }

    return res.status(200).json({ message: "Message sent." });
  } catch (error) {
    console.error("Contact form delivery failed.", error);
    return res.status(502).json({ message: "We couldn't send your message. Please try again shortly." });
  }
}
