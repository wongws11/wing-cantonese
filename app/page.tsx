import { redirect } from "next/navigation";

export default function Page() {
  redirect("/faancit");

  return <div>Redirecting...</div>;
}
