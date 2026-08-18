import { Link } from "@tanstack/react-router";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { UserButton } from "@/lib/auth/gates";
import { Skeleton } from "@/components/ui/skeleton";

export function AuthSlot() {
  const { user, isPending } = useCurrentUserState();

  if (isPending) {
    return <Skeleton className="h-9 w-20 rounded-md" />;
  }

  if (user) {
    return (
      <div className="text-fg [&_button]:text-muted [&_button]:hover:text-fg [&_img]:outline-none">
        <UserButton />
      </div>
    );
  }

  return (
    <Link
      to="/login"
      className="inline-flex h-11 items-center rounded-md px-3.5 text-sm font-medium text-muted transition-colors duration-150 hover:text-fg"
    >
      Sign in
    </Link>
  );
}
