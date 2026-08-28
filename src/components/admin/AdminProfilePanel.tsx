import { useCallback, useEffect, useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { KeyRound, User } from "lucide-react";
import {
  changeAdminPassword,
  getAdminProfile,
  updateAdminProfile,
} from "@/functions/admin-auth";
import { adminError, isAdminOk } from "@/lib/admin-api";
import { useToast } from "@/components/admin/AdminToast";
import { CmsPageHeader } from "@/components/admin/cms/CmsPageHeader";
import { ROLE_LABELS, type AdminRole } from "@/lib/admin-constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type Profile = {
  id: number;
  name: string;
  email: string;
  role: AdminRole;
  createdAt?: string;
  updatedAt?: string;
};

export function AdminProfilePanel() {
  const toast = useToast();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const res = await getAdminProfile();
    if (isAdminOk<{ profile: Profile }>(res)) {
      setProfile(res.profile);
      setName(res.profile.name);
    } else {
      toast.error(adminError(res));
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    load();
  }, [load]);

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    const res = await updateAdminProfile({ data: { name } });
    setSavingProfile(false);
    if (isAdminOk(res)) {
      toast.success("Profile updated");
      await router.invalidate();
      load();
    } else {
      toast.error(adminError(res));
    }
  };

  const savePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setSavingPassword(true);
    const res = await changeAdminPassword({
      data: { currentPassword, newPassword },
    });
    setSavingPassword(false);
    if (isAdminOk(res)) {
      toast.success("Password changed");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      toast.error(adminError(res));
    }
  };

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading profile…</p>;
  }

  if (!profile) {
    return <p className="text-sm text-muted-foreground">Profile unavailable.</p>;
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <CmsPageHeader
        title="My Profile"
        description="Update your display name and password."
        workflow="live"
      />

      <div className="rounded-xl border bg-card p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <User className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="font-semibold">{profile.name}</p>
            <p className="text-sm text-muted-foreground">{profile.email}</p>
            <Badge variant="secondary" className="mt-1">
              {ROLE_LABELS[profile.role]}
            </Badge>
          </div>
        </div>

        <Separator />

        <form onSubmit={saveProfile} className="space-y-4">
          <p className="text-sm font-medium">Profile details</p>
          <div className="space-y-2">
            <Label htmlFor="profile-name">Display name</Label>
            <Input
              id="profile-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input value={profile.email} disabled className="bg-muted" />
            <p className="text-xs text-muted-foreground">
              Contact a super admin to change your email address.
            </p>
          </div>
          <Button type="submit" disabled={savingProfile || name === profile.name}>
            {savingProfile ? "Saving…" : "Save profile"}
          </Button>
        </form>
      </div>

      <div className="rounded-xl border bg-card p-6 space-y-4">
        <div className="flex items-center gap-2">
          <KeyRound className="h-4 w-4 text-primary" />
          <p className="text-sm font-medium">Change password</p>
        </div>
        <form onSubmit={savePassword} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current password</Label>
            <Input
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">New password</Label>
            <Input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={8}
              autoComplete="new-password"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm new password</Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
              autoComplete="new-password"
            />
          </div>
          <Button type="submit" disabled={savingPassword}>
            {savingPassword ? "Updating…" : "Update password"}
          </Button>
        </form>
      </div>
    </div>
  );
}
