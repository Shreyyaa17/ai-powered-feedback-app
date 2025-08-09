const express = require("express");
const axios = require("axios");
const Feedback = require("../models/Feedback");
const router = express.Router();

//Mock Gemini API
async function getAIResponse(userInput) {
  const response = [
  "Good answer! Keep improving",
  "Excellent Response",
  "Try to add more responses for clarity",
  "Good thoughts, you can do better",
  "Nice start. Consider adding a concrete example to strengthen your point.",
  "Clear and concise. You could expand the rationale behind your choice to add depth.",
  "Good structure. Tighten the introduction to make the core message pop.",
  "Solid reasoning. Cite a source or reference to improve credibility.",
  "Well explained. Add a brief summary at the end to reinforce key takeaways.",
  "Great direction. Clarify your assumptions to avoid ambiguity.",
  "Thoughtful response. Consider potential counterarguments and address them briefly.",
  "Good analysis. Add metrics or a quick calculation to quantify the impact.",
  "Readable and friendly. Use headings or bullets for skimmability.",
  "Promising idea. Outline next steps or an actionable plan to move forward.",
  "Engaging tone. Reduce repetition to keep the pace tight.",
  "Nice coverage. Prioritize the top 1–2 risks and propose mitigations.",
  "Good technical detail. Explain trade-offs for the chosen approach.",
  "Useful insight. Add a before/after contrast to highlight improvement.",
  "Strong conclusion. Add one open question to invite further discussion.",
  ];
  return `${response[Math.floor(Math.random() * response.length)]}`;
}

//POST /api/feedback
router.post('/feedback', async(req, res) => {
  try {
    const { user_input } = req.body;
    if(!user_input) return res.status(400).json({ error: "Input required"});
    const aiFeedback = await getAIResponse(user_input);
    
    let newFeedback 
    try {
      newFeedback = new Feedback({ user_input, feedback: aiFeedback});
      await newFeedback.save();

    } catch (dbErr) {
      console.error("MongoDB Error: ", dbErr.message);
      return res.json({ user_input, feedback: aiFeedback});
    }
    res.json(newFeedback); 
  } catch (err) {
    console.error("Server Error: ", err.message);
    res.status(500).json({ error: "Internal server error "});
  }
});



//GET /api/history
router.get('/history', async(req, res) => {
  try {
    const history = await Feedback.find().sort({ timestamp: -1 });
    res.json(history);
  } catch (err) {
    console.error("Fetch History Error: ", err.message);
    res.status(500).json({ error: "Internal server error "});
  }
});

module.exports = router;