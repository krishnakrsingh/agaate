import { createFileRoute } from "@tanstack/react-router";
import { AdminCustomers } from "@/components/admin/AdminCustomers";

export const Route = createFileRoute("/agaate-admin/_authed/customers")({
  component: CustomersPage,
});

function CustomersPage() {
  return <AdminCustomers />;
}
