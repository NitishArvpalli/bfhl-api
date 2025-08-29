const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Change these values to your details
const FULL_NAME = "nitish_arvapalli"; // lowercase only
const DOB = "13022005"; // ddmmyyyy
const EMAIL = "nitish.arvapalli2022@vitstudent.ac.in";
const ROLL_NUMBER = "22BCE3143";

// POST route
app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;
    if (!Array.isArray(data)) {
      return res
        .status(400)
        .json({ is_success: false, message: "Invalid input" });
    }

    let evenNumbers = [];
    let oddNumbers = [];
    let alphabets = [];
    let specialChars = [];
    let sum = 0;
    let concatChars = [];

    data.forEach((item) => {
      if (/^-?\d+$/.test(item)) {
        // numeric string
        let num = parseInt(item);
        sum += num;
        if (num % 2 === 0) {
          evenNumbers.push(item);
        } else {
          oddNumbers.push(item);
        }
      } else if (/^[a-zA-Z]+$/.test(item)) {
        // alphabetic
        alphabets.push(item.toUpperCase());
        concatChars.push(item);
      } else {
        // special character
        specialChars.push(item);
      }
    });

    // Build alternating caps string from alphabets (reverse order)
    let concatString = concatChars
      .join("")
      .split("")
      .reverse()
      .map((ch, idx) => (idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
      .join("");

    res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers: oddNumbers,
      even_numbers: evenNumbers,
      alphabets: alphabets,
      special_characters: specialChars,
      sum: sum.toString(),
      concat_string: concatString,
    });
  } catch (err) {
    res.status(500).json({ is_success: false, message: "Server Error" });
  }
});

// health check route
app.get("/", (req, res) => {
  res.send("API is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
