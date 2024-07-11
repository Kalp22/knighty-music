const express = require("express");
const ytdl = require("ytdl-core");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());

app.post("/api/stream", async (req, res) => {
  try {
    const { cipher } = req.body;

    const url = new URLSearchParams(cipher.url);
    const sp = cipher.sp;
    const s = cipher.s;

    const decipheredSignature = ytdl.sig.decipher(info.html5player, s);
    const streamUrl = `${url}&${sp}=${decipheredSignature}`;
    res.json({ url: streamUrl });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching stream URL");
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
