import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { loginAdmin } from "@/functions/admin-auth";
import { ShieldCheck, UserCheck, Users, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function AdminLoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const fillDemo = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword("admin123");
    setError(null);
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-background">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-center py-1">
            <img
              src="/logo.png"
              alt="Agaate"
              className="h-10 sm:h-11 w-auto max-w-[200px] object-contain block"
            />
          </div>

          <Card className="border-border bg-card shadow-xs">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl font-bold tracking-tight text-foreground">Operations Portal</CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Sign in to manage farmer inquiries, farm visits, and agronomists
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setPending(true);
                  setError(null);
                  const res = await loginAdmin({ data: { email, password } });
                  setPending(false);
                  if (!res.ok) {
                    setError(res.error);
                    return;
                  }
                  await navigate({ to: "/agaate-admin" });
                }}
                className="grid gap-4"
              >
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-xs font-medium text-foreground">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@agaate.in"
                    required
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-9 text-xs bg-background"
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-xs font-medium text-foreground">
                      Password
                    </Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-9 text-xs bg-background"
                  />
                </div>

                {error && (
                  <Alert variant="destructive" className="py-2 px-3">
                    <AlertDescription className="text-xs">{error}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" disabled={pending} className="w-full h-9 text-xs font-medium bg-sidebar-primary text-sidebar-primary-foreground dark:bg-primary dark:text-primary-foreground shadow-xs hover:opacity-90 transition-opacity">
                  <span>{pending ? "Signing in..." : "Sign In to Admin"}</span>
                </Button>
              </form>
            </CardContent>

            <CardFooter className="flex flex-col gap-2.5 pt-0 border-t border-border/60 p-4 text-xs bg-muted/20 rounded-b-xl">
              <p className="text-muted-foreground text-[11px] text-center w-full font-medium tracking-wide uppercase">
                Quick Demo Access
              </p>
              <div className="grid grid-cols-2 gap-1.5 w-full">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fillDemo("admin@agaate.in")}
                  className="h-8 text-xs font-normal justify-start px-2.5 bg-card hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                >
                  <ShieldCheck className="h-3.5 w-3.5 mr-1.5 text-muted-foreground shrink-0" />
                  <span className="truncate">Super Admin</span>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fillDemo("rahul@agaate.in")}
                  className="h-8 text-xs font-normal justify-start px-2.5 bg-card hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                >
                  <Users className="h-3.5 w-3.5 mr-1.5 text-muted-foreground shrink-0" />
                  <span className="truncate">Operations</span>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fillDemo("aman@agaate.in")}
                  className="h-8 text-xs font-normal justify-start px-2.5 bg-card hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                >
                  <UserCheck className="h-3.5 w-3.5 mr-1.5 text-muted-foreground shrink-0" />
                  <span className="truncate">Agronomist</span>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fillDemo("priya@agaate.in")}
                  className="h-8 text-xs font-normal justify-start px-2.5 bg-card hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                >
                  <Headphones className="h-3.5 w-3.5 mr-1.5 text-muted-foreground shrink-0" />
                  <span className="truncate">Support</span>
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
