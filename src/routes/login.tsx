import { createFileRoute, Link } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";
import { LionMark } from "@/components/lion-mark";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  return (
    <main className="grid min-h-[100svh] place-items-center bg-bg px-5 text-fg">
      <div className="w-full max-w-sm">
        <Link to="/" className="mb-8 flex items-center gap-2.5 text-fg">
          <LionMark className="size-8" />
          <span className="font-display text-sm font-semibold tracking-[0.18em] uppercase">
            Ferrous Lion
          </span>
        </Link>
        <div className="hairline rounded-2xl bg-surface p-6">
          <h1 className="font-display text-xl font-semibold">Sign in</h1>
          <p className="mt-2 text-sm text-muted">
            Same door for crew notes and future drops. Google or X.
          </p>
          <div className="mt-6 space-y-2">
            {authEnabled ? (
              GROK_PROVIDERS.map((p) => (
                <Button
                  key={p.providerId}
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => signIn(p.providerId, { callbackURL: "/" })}
                >
                  Continue with {p.label}
                </Button>
              ))
            ) : (
              <p className="text-sm text-muted">Sign-in is disabled.</p>
            )}
          </div>
        </div>
        <p className="mt-5 text-center text-sm text-faint">
          <Link to="/" className="hover:text-muted">
            Back to the den
          </Link>
        </p>
      </div>
    </main>
  );
}
