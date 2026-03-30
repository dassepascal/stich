import { Link } from '@inertiajs/react';

export default function Hero() {
    return (
        <section
            className="relative min-h-[921px] flex items-center px-8 overflow-hidden"
            style={{
                background:
                    'radial-gradient(circle at 70% 30%, rgba(255, 143, 115, 0.15) 0%, rgba(14, 14, 14, 1) 70%)',
            }}
        >
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Left column — copy */}
                <div className="lg:col-span-7 z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container rounded-full mb-6 border border-outline-variant/15">
                        <span
                            className="w-2 h-2 rounded-full bg-secondary"
                            style={{ boxShadow: '0 0 15px rgba(253, 144, 0, 0.4)' }}
                        />
                        <span className="text-[0.7rem] uppercase tracking-widest font-bold text-on-surface-variant">
                            L'IA de Demain pour les PME
                        </span>
                    </div>

                    <h1 className="font-headline font-extrabold text-5xl md:text-7xl lg:text-8xl leading-none tracking-tighter mb-8 text-on-surface">
                        Révolu<span className="text-primary italic">tionnez</span> votre PME avec l'IA
                    </h1>

                    <p className="text-on-surface-variant text-lg md:text-xl max-w-xl mb-10 leading-relaxed font-body">
                        Propulsez votre croissance grâce à nos solutions d'automatisation sur mesure.
                        Libérez vos équipes des tâches répétitives et concentrez-vous sur l'essentiel.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="bg-gradient-to-br from-primary-dim to-primary text-on-primary-fixed font-bold py-4 px-10 rounded-xl hover:shadow-[0_0_30px_rgba(255,143,115,0.3)] transition-all">
                            Consultation Gratuite
                        </button>
                        <Link
                            href="/automatisation"
                            className="border border-outline-variant/30 text-on-surface font-bold py-4 px-10 rounded-xl hover:bg-surface-container transition-all flex items-center justify-center gap-2"
                        >
                            Nos Services{' '}
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </Link>
                    </div>
                </div>

                {/* Right column — visual card */}
                <div className="lg:col-span-5 relative hidden lg:block">
                    <div className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full" />
                    <div className="relative rounded-2xl overflow-hidden border border-outline-variant/15 bg-surface-container-low p-2">
                        <img
                            src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80"
                            alt="AI Visualization"
                            className="rounded-xl w-full h-[500px] object-cover"
                        />
                        <div className="absolute bottom-6 left-6 right-6 p-6 bg-surface-container/80 backdrop-blur-xl rounded-xl border border-outline-variant/10">
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-secondary text-[0.65rem] font-bold uppercase mb-1">
                                        Status du Système
                                    </p>
                                    <h4 className="text-xl font-headline font-bold">Optimisation Active</h4>
                                </div>
                                <div className="text-primary font-mono text-xl font-black">+94%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
