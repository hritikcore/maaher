const nodemailer = require("nodemailer");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { paymentId, contactDetails, totalPrice } = req.body;

    // Set up the transporter
    let transporter = nodemailer.createTransport({
      service: "Gmail", // Use Gmail, or you can set up any email provider
      auth: {
        user: "hritiksth764@gmail.com", // Your Gmail address
        pass: "ssij lcuu fwjn vqir", // Your Gmail app password or less secure password
      },
    });

    // details required
    let mailOptions = {
      from: "hritiksth764@gmail.com",
      to: "hritik.s@coreexperience.com", // Shop owner's email
      subject: `New Order from ${contactDetails.name}`,
      text: `Order Details:
             Name: ${contactDetails.name}
             Email: ${contactDetails.email}
             Address: ${contactDetails.address}
             Payment ID: ${paymentId}
             Total Price: Rs. ${totalPrice}
            `,
    };

    // Send the email
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Order email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Error sending email" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
