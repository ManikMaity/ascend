import { trpc } from "@/lib/trpc";

export function useHealthQuery() {
  return trpc.health.ping.useQuery();
}
