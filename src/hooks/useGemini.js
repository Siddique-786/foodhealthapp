import { useState, useCallback } from 'react'

export function useGemini() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const sanitizeJSON = (rawText) => {
    try {
      let cleaned = rawText.trim()
      cleaned = cleaned.replace(/```json/g, '')
      cleaned = cleaned.replace(/```/g, '')
      cleaned = cleaned.trim()
      return JSON.parse(cleaned)
    } catch (err) {
      return {
        swap: "A fresh fruit chaat with chaat masala and lemon — satisfies sweet and tangy cravings",
        caloriesSaved: 320,
        rupeesSaved: 200,
        nudge: "Cravings peak for 10 minutes then naturally fade away."
      }
    }
  }

  const fetchSwap = useCallback(async (craving) => {
    setLoading(true)
    setError(null)
    
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY
    
    const hour = new Date().getHours()
    const timeOfDay = hour < 12 ? "morning" : hour < 17 ? "afternoon" : hour < 22 ? "evening" : "late night"

    const promptText = `The user is craving: ${craving}. Current time context: ${timeOfDay}. You are a behavioral nutrition AI built for Indian users. Your goal is to intercept unhealthy food decisions with smart, culturally relevant healthy alternatives. Respond ONLY with a raw JSON object. No markdown. No backticks. No explanation. No extra text. Strictly use this structure:
    {
      "swap": "specific healthy Indian homemade alternative that satisfies the same craving texture and flavor profile",
      "caloriesSaved": "realistic estimated calories saved as a number only",
      "rupeesSaved": "realistic Indian rupees saved by making this at home versus ordering on Swiggy or Zomato as a number only",
      "nudge": "one warm empathetic behavioral psychology tip maximum 15 words"
    }`

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptText }] }]
          })
        }
      )

      if (!response.ok) {
        throw new Error('Network error. Check connection.')
      }

      const data = await response.json()
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || ''
      
      setLoading(false)
      return sanitizeJSON(rawText)

    } catch (err) {
      setError("Network error. Check connection.")
      setLoading(false)
      return {
        swap: "A fresh fruit chaat with chaat masala and lemon — satisfies sweet and tangy cravings",
        caloriesSaved: 320,
        rupeesSaved: 200,
        nudge: "Cravings peak for 10 minutes then naturally fade away."
      }
    }
  }, [])

  return { fetchSwap, loading, error }
}
