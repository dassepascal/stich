import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Hero from '@/Components/Hero';
import Services from '@/Components/Services';
import BentoGrid from '@/Components/BentoGrid';
import Process from '@/Components/Process';
import CTA from '@/Components/CTA';
import Footer from '@/Components/Footer';
import CursorFollower from '@/Components/CursorFollower';

export default function Welcome({ services = [] }) {
    return (
        <>
            <Head title="KINETIC AI | L'Avenir de l'Automatisation pour PME" />

            <style>{`
                * { cursor: none !important; }
                .material-symbols-outlined {
                    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
                }
            `}</style>

            <CursorFollower />
            <Navbar />

            <main className="pt-24">
                <Hero />
                <Services services={services} />
                <BentoGrid />
                <Process />
                <CTA />
            </main>

            <Footer />
        </>
    );
}
