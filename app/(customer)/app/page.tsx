import { Bi, BiInline } from "@frontend/components/ui/bilingual";
import { Button } from "@frontend/components/ui/button";
import { PageTransition } from "@frontend/components/ui/page-transition";
import { ApplicationList } from "@frontend/features/applications/application-list";
import { getSession } from "@backend/auth/session";
import Link from "next/link";

export default async function CustomerHomePage() {
  const session = await getSession();
  const first = session?.user.full_name.split(" ")[0] ?? "";
  return (
    <PageTransition>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-ink-muted">
            <BiInline en={`Good to see you, ${first}`} ar={`أهلاً ${first}`} />
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">
            <Bi en="Your applications" ar="طلباتك" compact />
          </h1>
        </div>
        <Link href="/app/apply">
          <Button>
            <BiInline en="Start application" ar="ابدأ طلباً" />
          </Button>
        </Link>
      </div>
      <div className="mt-8">
        <ApplicationList />
      </div>
    </PageTransition>
  );
}
