// File: api/proxy.js
export default async (req, res) => {
  if (req.method === "POST") {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbxQ0X_cLvqpP4_mnHb5Q3I2JmzrVeGchi9NLdPgTiXPAhnTZ2NTFsLf2LRXJBrA18BQ/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      }
    );

    const data = await response.json();

    res.status(200).json(data);
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
