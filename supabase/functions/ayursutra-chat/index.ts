import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SYSTEM_PROMPT = `You are a friendly and knowledgeable wellness assistant for AyurSutra, an authentic Panchakarma healing center. Your role is to help patients and visitors with:

1. **Health & Treatment Queries**: Explain Panchakarma treatments (Vamana, Virechana, Basti, Nasya, Raktamokshana), their benefits, and which conditions they help with. Always recommend consulting with our practitioners for personalized advice.

2. **Billing & Pricing**: Our treatments typically range from ₹3,000 to ₹15,000 per session depending on the therapy. Packages are available for multiple sessions. Direct patients to contact reception for exact quotes.

3. **Scheduling**: We operate Monday-Saturday, 8 AM to 8 PM. Initial consultations are 1 hour, treatments vary from 45 minutes to 2 hours. Suggest they book through our reception or the website.

4. **General Information**: Center location, practitioner qualifications, preparation for treatments, aftercare advice.

Guidelines:
- Be warm, empathetic, and use occasional Sanskrit/Hindi wellness terms with English explanations
- Keep responses concise (2-4 sentences for simple queries, more for complex health questions)
- Never provide medical diagnoses or prescribe treatments - always recommend consulting our doctors
- Use emojis sparingly to maintain a professional yet approachable tone
- If unsure, suggest contacting reception at +91 98765 43210

Remember: You represent AyurSutra's commitment to authentic Ayurvedic healing combined with modern care.`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log('Processing chat request with', messages.length, 'messages');

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages.map((m: { role: string; content: string }) => ({
            role: m.role,
            content: m.content,
          })),
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Payment required. Please contact support.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || 'I apologize, but I could not generate a response. Please try again.';

    console.log('Chat response generated successfully');

    return new Response(
      JSON.stringify({ content }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Chat function error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
