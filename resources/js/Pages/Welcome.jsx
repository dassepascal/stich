import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Hero from '@/Components/Hero';
import Services from '@/Components/Services';
import BentoGrid from '@/Components/BentoGrid';
import Process from '@/Components/Process';
import CTA from '@/Components/CTA';
import Footer from '@/Components/Footer';

export default function Welcome() {
    return (
        <>
            <Head title="KINETIC AI | L'Avenir de l'Automatisation pour PME" />

            <style>{`
                .material-symbols-outlined {
                    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
                }
            `}</style>

            <Navbar />

            <main className="pt-24">
                <Hero />
                <Services />
                <BentoGrid />
                <Process />
                <CTA />
            </main>

            <Footer />
        </>
    );
}
