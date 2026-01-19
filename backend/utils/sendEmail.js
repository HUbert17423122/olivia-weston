import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function stripHtml(html) {
  return String(html)
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function sendEmail({ to, subject, html }) {
  return resend.emails.send({
    from: "Olivia Weston <contact@oliviaweston.co.uk>",
    to,
    subject,
    replyTo: "contact@oliviaweston.co.uk",
    html,
    text: stripHtml(html),
  });
}
