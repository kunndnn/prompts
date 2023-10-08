import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
console.log({dirname});
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Replace 'views' with your directory containing EJS templates
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // defaults to process.env["OPENAI_API_KEY"]
});

// async function main(question) {
//   const chatCompletion = await openai.chat.completions.create({
//     messages: [{ role: "user", content: question }],
//     model: "gpt-3.5-turbo",
//   });
//   return chatCompletion.choices[0].message.content;
//   // console.log(chatCompletion.choices[0].message.content);
// }
// main();
app.get("/", (req, res) => {
  res.render("index");
});
app.post("/form", async (req, res) => {
  try {
    const { question } = req.body;
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: question }],
      model: "gpt-3.5-turbo",
    });
    let answer = chatCompletion.choices[0].message.content;
    res.send({ answer });
  } catch (error) {
    res.send(error);
  }
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
