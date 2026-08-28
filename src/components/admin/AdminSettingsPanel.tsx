import { useState } from "react";
import { Save } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { saveAdminSettings, sendAdminTestEmail } from "@/functions/admin-contacts";
import { AdminCmsAppLinks } from "@/components/admin/cms/AdminCmsAppLinks";
import {
  DEFAULT_ADMIN_SETTINGS,
  type AdminSettingsForClient,
} from "@/lib/admin-constants";

import { useToast } from "@/components/admin/AdminToast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

export function AdminSettingsPanel({
  settings: initialSettings,
  permissions,
  defaultTab = "email",
}: {
  settings: AdminSettingsForClient;
  permissions: string[];
  defaultTab?: "email" | "app-links";
}) {
  const toast = useToast();
  const [settings, setSettings] = useState({
    ...DEFAULT_ADMIN_SETTINGS,
    ...initialSettings,
    smtp: {
      ...DEFAULT_ADMIN_SETTINGS.smtp,
      ...initialSettings.smtp,
      pass: "",
    },
  });
  const [saving, setSaving] = useState(false);
  const [testingEmail, setTestingEmail] = useState(false);

  async function handleSaveSettingsSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await saveAdminSettings({ data: settings });
    setSaving(false);
    if (res && "ok" in res && res.ok) {
      if (res.settings) {
        setSettings({
          ...DEFAULT_ADMIN_SETTINGS,
          ...res.settings,
          smtp: {
            ...DEFAULT_ADMIN_SETTINGS.smtp,
            ...res.settings.smtp,
            pass: "",
          },
        });
      }
      toast.success("Settings saved", "Configuration updated successfully.");
    } else {
      toast.error("Save failed", "Could not save configuration.");
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground text-xs">
          Configure contact form email delivery and app store links. Manage staff accounts in{" "}
          <Link to="/agaate-admin/access" className="text-primary hover:underline">
            Users & access
          </Link>
          .
        </p>
      </div>
      <Separator className="my-4" />

      <Tabs defaultValue={defaultTab} className="space-y-4">
        <TabsList className="inline-flex h-9 items-center rounded-lg bg-muted/60 p-0.5 border border-border/80 shadow-2xs">
          <TabsTrigger value="email" className="rounded-md px-3.5 py-1 text-xs font-medium">
            Email & SMTP
          </TabsTrigger>
          <TabsTrigger value="app-links" className="rounded-md px-3.5 py-1 text-xs font-medium">
            App store links
          </TabsTrigger>
        </TabsList>

        <TabsContent value="email" className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-4">
            <div>
              <span className="inline-flex items-center rounded-md bg-sidebar-accent/70 px-2.5 py-0.5 text-[11px] font-semibold text-sidebar-accent-foreground">
                Contact Form Delivery
              </span>
              <h3 className="text-base font-bold text-foreground mt-1">SMTP & Inbox</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Contact form submissions are emailed directly to your inbox.
              </p>
            </div>

            <form onSubmit={handleSaveSettingsSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label
                    htmlFor="contactNotificationEmail"
                    className="text-xs font-medium text-foreground"
                  >
                    Contact inbox
                  </Label>
                  <Input
                    id="contactNotificationEmail"
                    type="email"
                    value={settings.contactNotificationEmail}
                    onChange={(e) =>
                      setSettings({ ...settings, contactNotificationEmail: e.target.value })
                    }
                    placeholder="info@agaate.in"
                    className="h-8.5 rounded-lg px-3 text-xs bg-card border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="contactEmailSubject"
                    className="text-xs font-medium text-foreground"
                  >
                    Email subject template
                  </Label>
                  <Input
                    id="contactEmailSubject"
                    value={settings.contactEmailSubject}
                    onChange={(e) =>
                      setSettings({ ...settings, contactEmailSubject: e.target.value })
                    }
                    placeholder="New consultation request — {{ticket}}"
                    className="h-8.5 rounded-lg px-3 text-xs bg-card border-border"
                  />
                </div>
              </div>

              <Separator />

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="smtpHost" className="text-xs font-medium text-foreground">
                    SMTP host
                  </Label>
                  <Input
                    id="smtpHost"
                    value={settings.smtp.host}
                    onChange={(e) =>
                      setSettings({ ...settings, smtp: { ...settings.smtp, host: e.target.value } })
                    }
                    placeholder="smtp.gmail.com"
                    className="h-8.5 rounded-lg px-3 text-xs bg-card border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPort" className="text-xs font-medium text-foreground">
                    SMTP port
                  </Label>
                  <Input
                    id="smtpPort"
                    type="number"
                    value={settings.smtp.port}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        smtp: { ...settings.smtp, port: Number(e.target.value) || 587 },
                      })
                    }
                    className="h-8.5 rounded-lg px-3 text-xs bg-card border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-foreground">Secure (SSL/TLS)</Label>
                  <div className="flex h-8.5 items-center gap-2 rounded-lg border border-border bg-card px-3">
                    <Checkbox
                      id="smtpSecure"
                      checked={settings.smtp.secure}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          smtp: { ...settings.smtp, secure: Boolean(checked) },
                        })
                      }
                    />
                    <Label htmlFor="smtpSecure" className="text-xs text-muted-foreground">
                      Use port 465 / SSL
                    </Label>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpUser" className="text-xs font-medium text-foreground">
                    SMTP username
                  </Label>
                  <Input
                    id="smtpUser"
                    value={settings.smtp.user}
                    onChange={(e) =>
                      setSettings({ ...settings, smtp: { ...settings.smtp, user: e.target.value } })
                    }
                    className="h-8.5 rounded-lg px-3 text-xs bg-card border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPass" className="text-xs font-medium text-foreground">
                    SMTP password
                  </Label>
                  <Input
                    id="smtpPass"
                    type="password"
                    value={settings.smtp.pass}
                    onChange={(e) =>
                      setSettings({ ...settings, smtp: { ...settings.smtp, pass: e.target.value } })
                    }
                    placeholder={
                      initialSettings.smtp.passConfigured
                        ? "Leave blank to keep current password"
                        : "App password"
                    }
                    className="h-8.5 rounded-lg px-3 text-xs bg-card border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpFromEmail" className="text-xs font-medium text-foreground">
                    From email
                  </Label>
                  <Input
                    id="smtpFromEmail"
                    type="email"
                    value={settings.smtp.fromEmail}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        smtp: { ...settings.smtp, fromEmail: e.target.value },
                      })
                    }
                    placeholder="info@agaate.in"
                    className="h-8.5 rounded-lg px-3 text-xs bg-card border-border"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="smtpFromName" className="text-xs font-medium text-foreground">
                    From name
                  </Label>
                  <Input
                    id="smtpFromName"
                    value={settings.smtp.fromName}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        smtp: { ...settings.smtp, fromName: e.target.value },
                      })
                    }
                    placeholder="Agaate Website"
                    className="h-8.5 rounded-lg px-3 text-xs bg-card border-border"
                  />
                </div>
              </div>

              <div className="flex flex-wrap justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={testingEmail || saving}
                  onClick={async () => {
                    setTestingEmail(true);
                    const res = await sendAdminTestEmail({ data: {} });
                    setTestingEmail(false);
                    if (res && "ok" in res && res.ok) {
                      toast.success("Test email sent", `Check ${res.to}`);
                    } else {
                      toast.error(
                        "SMTP test failed",
                        (res as { error?: string })?.error || "Could not send test email.",
                      );
                    }
                  }}
                  className="h-8.5 rounded-lg px-4 text-xs"
                >
                  {testingEmail ? "Sending test…" : "Send test email"}
                </Button>
                <Button
                  type="submit"
                  disabled={saving}
                  size="sm"
                  className="h-8.5 rounded-lg px-4 text-xs bg-sidebar-primary text-sidebar-primary-foreground dark:bg-primary dark:text-primary-foreground shadow-xs hover:opacity-90 font-semibold"
                >
                  <Save className="mr-1.5 h-3.5 w-3.5" />
                  <span>{saving ? "Saving..." : "Save email settings"}</span>
                </Button>
              </div>
            </form>
          </div>
        </TabsContent>

        <TabsContent value="app-links" className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
            <AdminCmsAppLinks permissions={permissions} embedded />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
