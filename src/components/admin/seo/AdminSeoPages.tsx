import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { FileSearch, Search } from "lucide-react";
import { listSeoPagesAdmin } from "@/functions/seo";
import { adminError, isAdminOk } from "@/lib/admin-api";
import { useToast } from "@/components/admin/AdminToast";
import { CmsPageHeader } from "@/components/admin/cms/CmsPageHeader";
import type { SeoMetadataRow, SeoPageDefinition } from "@/lib/seo-types";
import { localePath } from "@/lib/seo-registry";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function AdminSeoPages() {
  const toast = useToast();
  const [pages, setPages] = useState<SeoPageDefinition[]>([]);
  const [metadata, setMetadata] = useState<SeoMetadataRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [locale, setLocale] = useState<"en" | "hi">("en");

  const load = useCallback(async () => {
    setLoading(true);
    const res = await listSeoPagesAdmin();
    if (isAdminOk<{ pages: SeoPageDefinition[]; metadata: SeoMetadataRow[] }>(res)) {
      setPages(res.pages);
      setMetadata(res.metadata);
    } else {
      toast.error(adminError(res));
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    load();
  }, [load]);

  const metaMap = useMemo(
    () => new Map(metadata.map((m) => [`${m.entityType}:${m.entityKey}:${m.locale}`, m])),
    [metadata],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return pages.filter(
      (p) =>
        !q ||
        p.label.toLowerCase().includes(q) ||
        p.path.toLowerCase().includes(q) ||
        p.entityKey.toLowerCase().includes(q),
    );
  }, [pages, search]);

  return (
    <div className="space-y-6">
      <CmsPageHeader
        title="Page SEO"
        description="Manage search and social metadata for every public page."
        workflow="live"
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Search pages…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Tabs value={locale} onValueChange={(v) => setLocale(v as "en" | "hi")}>
          <TabsList>
            <TabsTrigger value="en">English</TabsTrigger>
            <TabsTrigger value="hi">Hindi</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Page</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  Loading pages…
                </TableCell>
              </TableRow>
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  No pages found.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((page) => {
                const meta = metaMap.get(`${page.entityType}:${page.entityKey}:${locale}`);
                const path = localePath(page.path, locale);
                return (
                  <TableRow key={`${page.entityType}-${page.entityKey}`}>
                    <TableCell className="font-medium">{page.label}</TableCell>
                    <TableCell className="text-muted-foreground">{path}</TableCell>
                    <TableCell>
                      {meta?.noindex ? (
                        <Badge variant="secondary">Noindex</Badge>
                      ) : meta?.seoStatus === "optimized" ? (
                        <Badge className="bg-emerald-600">Optimized</Badge>
                      ) : meta?.seoTitle ? (
                        <Badge variant="outline">Custom</Badge>
                      ) : (
                        <Badge variant="outline">Defaults</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link
                        to="/agaate-admin/seo/pages/$entityType/$entityKey"
                        params={{
                          entityType: page.entityType,
                          entityKey: page.entityKey,
                        }}
                        search={{ locale }}
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        Edit SEO
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
