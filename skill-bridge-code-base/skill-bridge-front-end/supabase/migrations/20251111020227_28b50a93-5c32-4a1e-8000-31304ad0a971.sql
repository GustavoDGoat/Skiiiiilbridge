-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create skills table
CREATE TABLE public.user_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  skill_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, skill_name)
);

ALTER TABLE public.user_skills ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own skills"
  ON public.user_skills FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own skills"
  ON public.user_skills FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own skills"
  ON public.user_skills FOR DELETE
  USING (auth.uid() = user_id);

-- Create opportunities table
CREATE TABLE public.opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('project', 'mentorship', 'task')),
  required_skills TEXT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view opportunities"
  ON public.opportunities FOR SELECT
  USING (true);

-- Create trigger for profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample opportunities
INSERT INTO public.opportunities (title, description, type, required_skills) VALUES
  ('Build E-commerce Platform', 'Looking for full stack developers to build a modern e-commerce platform with React and Node.js', 'project', ARRAY['React', 'JavaScript', 'Full Stack Web Development', 'Node.js']),
  ('AI Chatbot Development', 'Create an intelligent chatbot using machine learning and NLP', 'project', ARRAY['AI/ML', 'Python', 'Data Science']),
  ('Mentorship: UI/UX Design', 'Experienced designer offering mentorship in UI/UX principles and tools', 'mentorship', ARRAY['UI/UX Design', 'Figma']),
  ('Data Analysis Task', 'Quick data analysis and visualization project', 'task', ARRAY['Data Science', 'Python']),
  ('React Component Library', 'Build a reusable component library with TypeScript', 'project', ARRAY['React', 'JavaScript', 'TypeScript', 'UI/UX Design']),
  ('Python Automation Scripts', 'Create automation scripts for data processing', 'task', ARRAY['Python']),
  ('Web Development Mentorship', 'Learn modern web development practices from industry experts', 'mentorship', ARRAY['Full Stack Web Development', 'JavaScript', 'React']),
  ('Mobile App Development', 'Build cross-platform mobile app with React Native', 'project', ARRAY['React', 'JavaScript', 'Mobile Development']);