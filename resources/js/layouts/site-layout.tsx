import { Footer } from '@/components/layout/Footer';
import { Nav } from '@/components/layout/Nav';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-[100dvh] font-sans selection:bg-primary/20 selection:text-foreground">
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
            >
                Skip to main content
            </a>
            <Nav />
            <main id="main-content" className="flex-grow">{children}</main>
            <Footer />
        </div>
    );
}
