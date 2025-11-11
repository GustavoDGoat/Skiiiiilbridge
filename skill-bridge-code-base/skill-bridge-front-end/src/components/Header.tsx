import { Button } from "@/components/ui/button";
import { Menu, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOutClick = async () => { // Changed name for clarity
    await signOut();
    navigate('/auth'); // Navigate to /auth *after* successful sign-out
  };

  const handleAuthClick = () => {
    if (user) {
      handleSignOutClick(); // Use the new sign-out handler
    } else {
      navigate('/auth');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center">
            <span className="text-accent-foreground font-bold text-lg">SB</span>
          </div>
          <span className="text-xl font-bold text-foreground">Skill Bridge</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            How It Works
          </a>
          <a href="#benefits" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Benefits
          </a>
          <a href="#get-started" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Get Started
          </a>
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Button 
                variant="ghost" 
                onClick={() => navigate('/dashboard')}
                className="hidden md:inline-flex"
              >
                Dashboard
              </Button>
              <Button 
                variant="ghost" 
                onClick={handleSignOutClick} // Use the sign-out handler
                className="hidden md:inline-flex"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </>
          ) : (
            <Button 
              variant="ghost" 
              onClick={handleAuthClick} // Navigates to /auth (Sign In)
              className="hidden md:inline-flex"
            >
              Sign In
            </Button>
          )}
          
          {/* MAIN BUTTON FIX */}
          <Button 
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
            onClick={() => user ? navigate('/dashboard') : navigate('/auth')}
          >
            {user ? 'Go to Dashboard' : 'Get Started'}
          </Button>

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
