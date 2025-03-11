import { Resend } from "resend";

const resend = new Resend("re_HLvPyMz1_4uDsn3zYpRaC7rE4AkD77itQ");

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { to, subject, html } = req.body;

      const data = await resend.emails.send({
        from: "akk6047@psu.edu", // Replace with your email
        to,
        subject,
        html,
      });

      res.status(200).json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}