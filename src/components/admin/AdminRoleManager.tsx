import { useCallback, useEffect, useMemo, useState } from "react";
import { Pencil, Plus, Shield, Trash2 } from "lucide-react";
import { deleteAdminRole, listAdminPermissions, listAdminRoles, saveAdminRole } from "@/functions/rbac";
import { adminError, isAdminOk } from "@/lib/admin-api";
import { useToast } from "@/components/admin/AdminToast";
import { PERMISSION_CATALOG, slugifyRoleName, type PermissionKey, type RbacRole } from "@/lib/rbac";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
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

const emptyForm = {
  name: "",
  slug: "",
  description: "",
  permissions: [] as PermissionKey[],
};

export function AdminRoleManager() {
  const toast = useToast();
  const [roles, setRoles] = useState<RbacRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editing, setEditing] = useState<RbacRole | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [slugTouched, setSlugTouched] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const [rolesRes, permsRes] = await Promise.all([listAdminRoles(), listAdminPermissions()]);
    if (isAdminOk<{ roles: RbacRole[] }>(rolesRes)) {
      setRoles(rolesRes.roles);
    } else {
      toast.error(adminError(rolesRes));
    }
    if (!isAdminOk(permsRes)) {
      toast.error(adminError(permsRes));
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    load();
  }, [load]);

  const permissionGroups = useMemo(() => {
    const groups = new Map<string, typeof PERMISSION_CATALOG>();
    for (const perm of PERMISSION_CATALOG) {
      const list = groups.get(perm.category) ?? [];
      list.push(perm);
      groups.set(perm.category, list);
    }
    return [...groups.entries()];
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setSlugTouched(false);
    setSheetOpen(true);
  };

  const openEdit = (role: RbacRole) => {
    setEditing(role);
    setForm({
      name: role.name,
      slug: role.slug,
      description: role.description,
      permissions: [...role.permissions],
    });
    setSlugTouched(true);
    setSheetOpen(true);
  };

  const togglePermission = (key: PermissionKey, checked: boolean) => {
    setForm((prev) => ({
      ...prev,
      permissions: checked
        ? [...new Set([...prev.permissions, key])]
        : prev.permissions.filter((p) => p !== key),
    }));
  };

  const save = async () => {
    if (!form.name.trim()) {
      toast.error("Role name is required.");
      return;
    }
    setSaving(true);
    const res = await saveAdminRole({
      data: {
        id: editing?.id,
        name: form.name,
        slug: form.slug || slugifyRoleName(form.name),
        description: form.description,
        permissions: form.permissions,
      },
    });
    setSaving(false);
    if (isAdminOk(res)) {
      toast.success(editing ? "Role updated" : "Role created");
      setSheetOpen(false);
      load();
    } else {
      toast.error(adminError(res));
    }
  };

  const remove = async (role: RbacRole) => {
    if (role.isSystem) {
      toast.error("System roles cannot be deleted.");
      return;
    }
    if (!window.confirm(`Delete role "${role.name}"?`)) return;
    const res = await deleteAdminRole({ data: { id: role.id } });
    if (isAdminOk(res)) {
      toast.success("Role deleted");
      load();
    } else {
      toast.error(adminError(res));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Create custom roles and choose exactly which permissions each role receives.
        </p>
        <Button size="sm" onClick={openCreate}>
          <Plus className="mr-2 h-4 w-4" />
          New role
        </Button>
      </div>

      <div className="rounded-xl border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Role</TableHead>
              <TableHead>Permissions</TableHead>
              <TableHead>Users</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  Loading roles…
                </TableCell>
              </TableRow>
            ) : roles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  No roles configured.
                </TableCell>
              </TableRow>
            ) : (
              roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary" />
                      <div>
                        <p className="font-medium text-sm">{role.name}</p>
                        <p className="text-xs text-muted-foreground">{role.slug}</p>
                      </div>
                      {role.isSystem ? (
                        <Badge variant="outline" className="text-[10px]">
                          System
                        </Badge>
                      ) : null}
                    </div>
                    {role.description ? (
                      <p className="mt-1 text-xs text-muted-foreground">{role.description}</p>
                    ) : null}
                  </TableCell>
                  <TableCell>
                    <p className="text-xs text-muted-foreground">{role.permissions.length} granted</p>
                  </TableCell>
                  <TableCell>{role.userCount ?? 0}</TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button variant="ghost" size="sm" onClick={() => openEdit(role)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    {!role.isSystem ? (
                      <Button variant="ghost" size="sm" onClick={() => remove(role)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    ) : null}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="overflow-y-auto sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>{editing ? "Edit role" : "New role"}</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                value={form.name}
                onChange={(e) => {
                  const name = e.target.value;
                  setForm((prev) => ({
                    ...prev,
                    name,
                    slug: slugTouched ? prev.slug : slugifyRoleName(name),
                  }));
                }}
                disabled={Boolean(editing?.isSystem)}
              />
            </div>
            <div className="space-y-2">
              <Label>Slug</Label>
              <Input
                value={form.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  setForm((prev) => ({ ...prev, slug: slugifyRoleName(e.target.value) }));
                }}
                disabled={Boolean(editing?.isSystem)}
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                rows={2}
              />
            </div>
            <div className="space-y-4">
              <Label>Permissions</Label>
              {permissionGroups.map(([category, perms]) => (
                <div key={category} className="rounded-lg border p-3 space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {category}
                  </p>
                  {perms.map((perm) => (
                    <label key={perm.key} className="flex items-start gap-3 text-sm">
                      <Checkbox
                        checked={form.permissions.includes(perm.key)}
                        onCheckedChange={(checked) =>
                          togglePermission(perm.key, checked === true)
                        }
                      />
                      <span>
                        <span className="font-medium">{perm.label}</span>
                        <span className="block text-xs text-muted-foreground">{perm.description}</span>
                      </span>
                    </label>
                  ))}
                </div>
              ))}
            </div>
            <Button onClick={save} disabled={saving} className="w-full">
              {saving ? "Saving…" : editing ? "Save role" : "Create role"}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
