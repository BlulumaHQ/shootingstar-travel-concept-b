import { Header } from "./Header";
import { Footer } from "./Footer";
import { Chatbot } from "./Chatbot";
import { useLocale } from "@/i18n/locale";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const locale = useLocale();

  return (
    <div className={`locale-${locale} min-h-screen flex flex-col bg-background text-foreground`} data-locale={locale}>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <Chatbot />
    </div>
  );
}
