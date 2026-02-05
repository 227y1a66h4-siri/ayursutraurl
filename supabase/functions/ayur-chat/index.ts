import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, type, patientContext } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    let systemPrompt = "";
    
    if (type === "patient-chat") {
      systemPrompt = `You are AyurSutra's friendly Ayurvedic health assistant. You help patients understand Panchakarma treatments and Ayurvedic therapies.

Your expertise includes:
- Explaining various Panchakarma therapies (Abhyanga, Shirodhara, Swedana, Nasya, Basti, Vamana, Virechana)
- Describing benefits and what to expect during treatments
- Answering questions about preparation and aftercare
- Providing general Ayurvedic wellness guidance
- Explaining doshas (Vata, Pitta, Kapha) and their significance

Important guidelines:
- Be warm, professional, and reassuring
- Use simple language to explain complex concepts
- Always recommend consulting with our doctors for personalized treatment plans
- Never diagnose conditions or prescribe treatments
- Focus on education and general information
- Keep responses concise but informative (2-3 paragraphs max)

Available therapies at AyurSutra:
1. Abhyanga - Full body warm oil massage (60 min, ₹2,500)
2. Shirodhara - Warm oil stream on forehead (45 min, ₹3,000)
3. Panchakarma Detox - Complete detoxification program (120 min, ₹8,000)
4. Swedana - Herbal steam therapy (30 min, ₹1,500)
5. Nasya - Nasal administration of medicated oils (30 min, ₹1,800)
6. Basti - Therapeutic enema for detox (45 min, ₹2,200)`;
    } else if (type === "therapy-recommendation") {
      systemPrompt = `You are an expert Ayurvedic consultant AI for AyurSutra Panchakarma Center. Analyze patient symptoms and recommend the most appropriate therapies.

${patientContext ? `Patient Context: ${patientContext}` : ""}

Available therapies at AyurSutra:
1. Abhyanga - Full body warm oil massage (60 min). Best for: muscle tension, poor circulation, stress, fatigue, body aches, joint pain
2. Shirodhara - Warm oil stream on forehead (45 min). Best for: anxiety, insomnia, mental stress, headaches, migraines, depression, nervous disorders
3. Panchakarma Detox - Complete 5-therapy detoxification (120 min). Best for: chronic conditions, toxin buildup, digestive issues, skin problems, comprehensive healing
4. Swedana - Herbal steam therapy (30 min). Best for: joint stiffness, arthritis, respiratory issues, weight management, congestion, muscle spasms
5. Nasya - Nasal administration of medicated oils (30 min). Best for: sinus issues, migraines, mental clarity, memory, hair loss, eye problems
6. Basti - Therapeutic enema for detox (45 min). Best for: digestive issues, constipation, lower back pain, sciatica, vata disorders, infertility

IMPORTANT: You MUST provide recommendations for ANY symptom the patient describes. Match symptoms to the most relevant therapies. Always include at least 2-3 recommendations.

You MUST respond with ONLY valid JSON in this exact format (no markdown, no explanation, just JSON):
{
  "recommendations": [
    {
      "therapyName": "exact therapy name from list above",
      "relevance": "high",
      "reason": "brief explanation why this helps the symptoms",
      "suggestedSessions": 5
    }
  ],
  "generalAdvice": "personalized lifestyle advice for the patient"
}`;
    } else {
      systemPrompt = "You are a helpful assistant for AyurSutra Panchakarma Center.";
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required, please add credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
