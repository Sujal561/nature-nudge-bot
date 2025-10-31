import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, mode, image, location } = await req.json();
    console.log('Received request:', { mode, messageCount: messages.length, hasImage: !!image, location });
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    let systemPrompt = '';
    
    if (mode === 'leaf-scanner' && image) {
      systemPrompt = `You are an expert botanist and plant pathologist. Analyze the provided leaf image and provide:
      
1. **Plant Identification**: Identify the species, common name, and scientific name
2. **Tree/Plant Details**: Describe the morphology, anatomy, and characteristics
3. **Geographic Distribution**: Where this plant naturally grows
4. **Health Assessment**: Identify any diseases, pests, or stress indicators
5. **Treatment Recommendations**: If issues are found, provide specific cure and prevention methods
6. **Care Instructions**: General care tips for this plant

Be detailed, precise, and practical in your advice.`;
    } else {
      const locationContext = location 
        ? `\n\nUser's location: ${location.city}, ${location.region}, ${location.country}. Tailor your advice to be locally relevant.`
        : '';
      
      systemPrompt = `You are EcoAssistant, an award-winning AI-powered environmental sustainability advisor built for hackathon excellence. You provide:

- 🌍 Location-specific recycling and waste management guidance
- ⚡ Energy-saving tips and renewable energy recommendations
- 🛍️ Sustainable product alternatives and eco-friendly shopping advice
- 💧 Water conservation strategies
- 🌱 Carbon footprint reduction techniques
- 🏡 Green living practices and sustainable lifestyle tips
- ♻️ Circular economy insights

Always be:
- Practical and actionable with clear next steps
- Optimistic and encouraging about sustainability
- Data-driven when possible (cite statistics)
- Beginner-friendly while remaining informative
${locationContext}

Format responses with clear sections using emojis for visual appeal.`;
    }

    const apiMessages = [
      { role: "system", content: systemPrompt },
      ...messages
    ];

    // If there's an image in leaf scanner mode, add it to the last user message
    if (mode === 'leaf-scanner' && image && apiMessages.length > 1) {
      const lastMessage = apiMessages[apiMessages.length - 1];
      if (lastMessage.role === 'user') {
        lastMessage.content = [
          { type: "text", text: typeof lastMessage.content === 'string' ? lastMessage.content : 'Please analyze this leaf' },
          { type: "image_url", image_url: { url: image } }
        ];
      }
    }

    console.log('Calling AI gateway...');
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: apiMessages,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        console.error('Rate limit exceeded');
        return new Response(
          JSON.stringify({ error: 'Rate limits exceeded, please try again later.' }), 
          {
            status: 429,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
      if (response.status === 402) {
        console.error('Payment required');
        return new Response(
          JSON.stringify({ error: 'Payment required, please add funds to your workspace.' }), 
          {
            status: 402,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      throw new Error('AI gateway error');
    }

    const data = await response.json();
    console.log('AI response received successfully');
    const aiMessage = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ message: aiMessage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in eco-chat function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
