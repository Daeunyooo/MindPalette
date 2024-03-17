import OpenAI from 'openai';
import { prompt } from "../../utils/prompt"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { query } = req.body;
    try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt + query }],
      model: 'gpt-3.5-turbo',
    });

    //make a single todo list everyday at runtime 
    //give them a news article as well 
    //show them some spotify songs 

    const data = completion.choices[0].message.content;
    res.status(200).json(data);
    } catch (e) {
        res.status(500).send("Internal Server Error");
    }
  }

}