import { useCallback, useEffect, useState } from "react";
import { Shield, UserPlus, Pencil, Trash2 } from "lucide-react";
import { deleteAdminUser, listAdminUsers, saveAdminUser } from "@/functions/admin-contacts";
import { adminError, isAdminOk } from "@/lib/admin-api";
import { useToast } from "@/components/admin/AdminToast";
import { CmsPageHeader } from "@/components/admin/cms/CmsPageHeader";
import {
  ADMIN_ROLES,
  ROLE_DESCRIPTIONS,
  ROLE_LABELS,
  ROLE_PERMISSIONS,
  canAssignRole,
  type AdminRole,
} from "@/lib/admin-constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type StaffUser = {
  id: number;
  name: string;
  email: string;
  role: AdminRole;
  createdAt?: string;
  updatedAt?: string;
};

const emptyForm = {
  name: "",
  email: "",
  role: "support" as AdminRole,
  password: "",
};

export function AdminAccessManager({
  actorRole,
  actorId,
}: {
  actorRole: AdminRole;
  actorId: number;
}) {
  const toast = useToast();
  const [users, setUsers] = useState<StaffUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editing, setEditing] = useState<StaffUser | null>(null);
  const [form, setForm] = useState(emptyForm);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await listAdminUsers();
    if (isAdminOk<{ users: StaffUser[] }>(res)) {
      setUsers(res.users);
    } else {
      toast.error(adminError(res));
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    load();
  }, [load]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setSheetOpen(true);
  };

  const openEdit = (user: StaffUser) => {
    setEditing(user);
    setForm({ name: user.name, email: user.email, role: user.role, password: "" });
    setSheetOpen(true);
  };

  const assignableRoles = ADMIN_ROLES.filter((role) => canAssignRole(actorRole, role));

  const save = async () => {
    setSaving(true);
    const res = await saveAdminUser({
      data: {
        id: editing?.id,
        name: form.name,
        email: form.email,
        role: form.role,
        password: form.password || undefined,
      },
    });
    setSaving(false);
    if (isAdminOk(res)) {
      toast.success(editing ? "User updated" : "User created");
      setSheetOpen(false);
      load();
    } else {
      toast.error(adminError(res));
    }
  };

  const remove = async (user: StaffUser) => {
    if (!window.confirm(`Remove ${user.name} (${user.email})?`)) return;
    const res = await deleteAdminUser({ data: { id: user.id } });
    if (isAdminOk(res)) {
      toast.success("User removed");
      load();
    } else {
      toast.error(adminError(res));
    }
  };

  return (
    <div className="space-y-6">
      <CmsPageHeader
        title="Users & Access"
        description="Manage staff accounts, roles, and permissions."
        workflow="live"
        actions={
          <Button size="sm" onClick={openCreate}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add user
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {ADMIN_ROLES.map((role) => (
          <div key={role} className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <p className="font-medium text-sm">{ROLE_LABELS[role]}</p>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{ROLE_DESCRIPTIONS[role]}</p>
            <ul className="mt-3 space-y-1">
              {ROLE_PERMISSIONS[role].map((perm) => (
                <li key={perm} className="text-xs text-muted-foreground">
                  • {perm}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="rounded-xl border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  Loading users…
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  No staff accounts yet.
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    {user.name}
                    {user.id === actorId && (
                      <Badge variant="outline" className="ml-2 text-[10px]">
                        You
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {user.email}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{ROLE_LABELS[user.role]}</Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button variant="ghost" size="sm" onClick={() => openEdit(user)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    {actorRole === "super_admin" && user.id !== actorId && (
                      <Button variant="ghost" size="sm" onClick={() => remove(user)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{editing ? "Edit user" : "New user"}</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Select
                value={form.role}
                onValueChange={(v) => setForm((f) => ({ ...f, role: v as AdminRole }))}
                disabled={editing?.id === actorId}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {assignableRoles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {ROLE_LABELS[role]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {editing?.id === actorId && (
                <p className="text-xs text-muted-foreground">You cannot change your own role.</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>{editing ? "New password (optional)" : "Password"}</Label>
              <Input
                type="password"
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                placeholder={editing ? "Leave blank to keep current" : "Min 8 characters"}
              />
            </div>
            <Button onClick={save} disabled={saving} className="w-full">
              {saving ? "Saving…" : editing ? "Save changes" : "Create user"}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
