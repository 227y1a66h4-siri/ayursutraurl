import { useState } from 'react';
import { Sparkles, Loader2, ArrowRight, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface TherapyRecommendation {
  therapyName: string;
  relevance: 'high' | 'medium' | 'low';
  reason: string;
  suggestedSessions: number;
}

interface RecommendationResult {
  recommendations: TherapyRecommendation[];
  generalAdvice: string;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ayur-chat`;

export function TherapyRecommendations() {
  const [symptoms, setSymptoms] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<RecommendationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getRecommendations = async () => {
    if (!symptoms.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: `Patient symptoms and concerns: ${symptoms}` }],
          type: "therapy-recommendation",
          patientContext: symptoms,
        }),
      });

      if (!resp.ok) {
        throw new Error("Failed to get recommendations");
      }

      const reader = resp.body?.getReader();
      if (!reader) throw new Error("No response body");

      const decoder = new TextDecoder();
      let fullResponse = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ') && line !== 'data: [DONE]') {
            try {
              const json = JSON.parse(line.slice(6));
              const content = json.choices?.[0]?.delta?.content;
              if (content) fullResponse += content;
            } catch { /* ignore parse errors */ }
          }
        }
      }

      // Parse the JSON response
      const jsonMatch = fullResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]) as RecommendationResult;
        setResult(parsed);
      } else {
        throw new Error("Could not parse AI response");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to get recommendations. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getRelevanceBadge = (relevance: string) => {
    switch (relevance) {
      case 'high':
        return <Badge className="bg-success text-success-foreground">Highly Recommended</Badge>;
      case 'medium':
        return <Badge variant="secondary">Recommended</Badge>;
      case 'low':
        return <Badge variant="outline">Optional</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-transparent">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20">
            <Sparkles className="h-5 w-5 text-accent" />
          </div>
          <div>
            <CardTitle className="text-lg">AI Therapy Recommendations</CardTitle>
            <CardDescription>Get personalized therapy suggestions based on symptoms</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Enter patient symptoms, medical history, and concerns... (e.g., 'chronic lower back pain, stress, poor sleep quality, digestive issues')"
            className="min-h-[100px] resize-none"
          />
        </div>
        
        <Button 
          onClick={getRecommendations} 
          disabled={isLoading || !symptoms.trim()}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Get AI Recommendations
            </>
          )}
        </Button>

        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}

        {result && (
          <div className="space-y-4 pt-4 border-t border-border">
            <h4 className="font-semibold text-foreground">Recommended Therapies</h4>
            
            <div className="space-y-3">
              {result.recommendations.map((rec, index) => (
                <div
                  key={index}
                  className={cn(
                    "rounded-lg border p-4 transition-all",
                    rec.relevance === 'high' ? 'border-success/30 bg-success/5' :
                    rec.relevance === 'medium' ? 'border-accent/30 bg-accent/5' :
                    'border-border bg-muted/30'
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <Stethoscope className="h-4 w-4 text-primary" />
                      <span className="font-medium">{rec.therapyName}</span>
                    </div>
                    {getRelevanceBadge(rec.relevance)}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{rec.reason}</p>
                  <div className="mt-2 flex items-center gap-2 text-sm">
                    <ArrowRight className="h-3 w-3 text-accent" />
                    <span className="text-foreground">Suggested: {rec.suggestedSessions} session{rec.suggestedSessions !== 1 ? 's' : ''}</span>
                  </div>
                </div>
              ))}
            </div>

            {result.generalAdvice && (
              <div className="rounded-lg bg-primary/5 p-4 border border-primary/20">
                <h5 className="font-medium text-primary mb-2">General Advice</h5>
                <p className="text-sm text-muted-foreground">{result.generalAdvice}</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
