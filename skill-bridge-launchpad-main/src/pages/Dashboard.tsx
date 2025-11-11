import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { X, Plus, Loader2 } from 'lucide-react';
import Header from '@/components/Header';

interface Skill {
  id: string;
  skill_name: string;
}

interface Opportunity {
  id: string;
  title: string;
  description: string;
  type: string;
  required_skills: string[];
}

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchSkills();
      fetchOpportunities();
    }
  }, [user]);

  const fetchSkills = async () => {
    try {
      const { data, error } = await supabase
        .from('user_skills')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSkills(data || []);
    } catch (error) {
      console.error('Error fetching skills:', error);
      toast.error('Failed to load skills');
    } finally {
      setLoading(false);
    }
  };

  const fetchOpportunities = async () => {
    try {
      const { data, error } = await supabase
        .from('opportunities')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOpportunities(data || []);
    } catch (error) {
      console.error('Error fetching opportunities:', error);
    }
  };

  const addSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim() || !user) return;

    setAdding(true);
    try {
      const { error } = await supabase
        .from('user_skills')
        .insert({ user_id: user.id, skill_name: newSkill.trim() });

      if (error) throw error;

      toast.success('Skill added successfully');
      setNewSkill('');
      fetchSkills();
    } catch (error: any) {
      console.error('Error adding skill:', error);
      if (error.code === '23505') {
        toast.error('You already have this skill');
      } else {
        toast.error('Failed to add skill');
      }
    } finally {
      setAdding(false);
    }
  };

  const removeSkill = async (skillId: string) => {
    try {
      const { error } = await supabase
        .from('user_skills')
        .delete()
        .eq('id', skillId);

      if (error) throw error;

      toast.success('Skill removed');
      fetchSkills();
    } catch (error) {
      console.error('Error removing skill:', error);
      toast.error('Failed to remove skill');
    }
  };

  const getMatchedOpportunities = () => {
    const userSkillNames = skills.map(s => s.skill_name.toLowerCase());
    
    return opportunities
      .map(opp => {
        const matchedSkills = opp.required_skills.filter(reqSkill =>
          userSkillNames.some(userSkill => 
            userSkill.includes(reqSkill.toLowerCase()) || 
            reqSkill.toLowerCase().includes(userSkill)
          )
        );
        return { ...opp, matchedSkills, matchCount: matchedSkills.length };
      })
      .filter(opp => opp.matchCount > 0)
      .sort((a, b) => b.matchCount - a.matchCount);
  };

  const matchedOpportunities = getMatchedOpportunities();

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-6xl mx-auto space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Your Dashboard</h1>
            <p className="text-muted-foreground">Manage your skills and discover opportunities</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Your Skills</CardTitle>
              <CardDescription>Add your tech skills to get matched with relevant opportunities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={addSkill} className="flex gap-2">
                <Input
                  placeholder="e.g., React, Python, UI/UX Design..."
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" disabled={adding}>
                  {adding ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                  Add
                </Button>
              </form>

              <div className="flex flex-wrap gap-2">
                {skills.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No skills added yet. Add your first skill above!</p>
                ) : (
                  skills.map((skill) => (
                    <Badge key={skill.id} variant="secondary" className="text-sm py-2 px-3">
                      {skill.skill_name}
                      <button
                        onClick={() => removeSkill(skill.id)}
                        className="ml-2 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Matched Opportunities {matchedOpportunities.length > 0 && `(${matchedOpportunities.length})`}
            </h2>
            
            {skills.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  Add some skills above to see matched opportunities!
                </CardContent>
              </Card>
            ) : matchedOpportunities.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No opportunities match your skills yet. Try adding more skills!
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {matchedOpportunities.map((opp) => (
                  <Card key={opp.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{opp.title}</CardTitle>
                          <Badge variant="outline" className="mt-2">
                            {opp.type}
                          </Badge>
                        </div>
                        <Badge className="ml-2">
                          {opp.matchCount} {opp.matchCount === 1 ? 'match' : 'matches'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">{opp.description}</p>
                      
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-2">Required Skills:</p>
                        <div className="flex flex-wrap gap-1">
                          {opp.required_skills.map((skill) => (
                            <Badge
                              key={skill}
                              variant={opp.matchedSkills.includes(skill) ? "default" : "secondary"}
                              className="text-xs"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
