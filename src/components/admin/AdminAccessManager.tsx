import { useCallback, useEffect, useState } from "react";
import { UserPlus, Pencil, Trash2 } from "lucide-react";
import {
  deleteAdminUser,
  listAdminUsers,
  listAssignableRoles,
  saveAdminUser,
} from "@/functions/admin-contacts";
import { adminError, isAdminOk } from "@/lib/admin-api";
import { useToast } from "@/components/admin/AdminToast";
import { CmsPageHeader } from "@/components/admin/cms/CmsPageHeader";
import {
  canDeleteUsers,
  canManageRoles,
  roleLabel,
  type SessionUser,
} from "@/lib/admin-constants";
import type { RbacRole } from "@/lib/rbac";
import { AdminRoleManager } from "@/components/admin/AdminRoleManager";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  roleId: number;
  role: string;
  roleName: string;
  createdAt?: string;
  updatedAt?: string;
};

const emptyForm = {
  name: "",
  email: "",
  roleId: 0,
  password: "",
};

export function AdminAccessManager({ actor }: { actor: SessionUser }) {
  const toast = useToast();
  const [users, setUsers] = useState<StaffUser[]>([]);
  const [roles, setRoles] = useState<RbacRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editing, setEditing] = useState<StaffUser | null>(null);
  const [form, setForm] = useState(emptyForm);

  const load = useCallback(async () => {
    setLoading(true);
    const [usersRes, rolesRes] = await Promise.all([listAdminUsers(), listAssignableRoles()]);
    if (isAdminOk<{ users: StaffUser[] }>(usersRes)) {
      setUsers(usersRes.users);
    } else {
      toast.error(adminError(usersRes));
    }
    if (isAdminOk<{ roles: RbacRole[] }>(rolesRes)) {
      setRoles(rolesRes.roles);
      setForm((prev) => ({
        ...prev,
        roleId: prev.roleId || rolesRes.roles[0]?.id || 0,
      }));
    } else {
      toast.error(adminError(rolesRes));
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    load();
  }, [load]);

  const openCreate = () => {
    setEditing(null);
    setForm({
      ...emptyForm,
      roleId: roles[0]?.id ?? 0,
    });
    setSheetOpen(true);
  };

  const openEdit = (user: StaffUser) => {
    setEditing(user);
    setForm({
      name: user.name,
      email: user.email,
      roleId: user.roleId,
      password: "",
    });
    setSheetOpen(true);
  };

  const save = async () => {
    if (!form.roleId) {
      toast.error("Select a role.");
      return;
    }
    setSaving(true);
    const res = await saveAdminUser({
      data: {
        id: editing?.id,
        name: form.name,
        email: form.email,
        roleId: form.roleId,
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

      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          {canManageRoles(actor) ? <TabsTrigger value="roles">Roles</TabsTrigger> : null}
        </TabsList>

        <TabsContent value="users" className="mt-4">
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
                        {user.id === actor.id && (
                          <Badge variant="outline" className="ml-2 text-[10px]">
                            You
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {user.email}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {roleLabel(user.role, user.roleName)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button variant="ghost" size="sm" onClick={() => openEdit(user)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        {canDeleteUsers(actor) && user.id !== actor.id && (
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
        </TabsContent>

        {canManageRoles(actor) ? (
          <TabsContent value="roles" className="mt-4">
            <AdminRoleManager />
          </TabsContent>
        ) : null}
      </Tabs>

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
                value={form.roleId ? String(form.roleId) : undefined}
                onValueChange={(v) => setForm((f) => ({ ...f, roleId: Number(v) }))}
                disabled={editing?.id === actor.id}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={String(role.id)}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {editing?.id === actor.id && (
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
