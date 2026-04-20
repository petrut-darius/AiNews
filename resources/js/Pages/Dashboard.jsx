import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="py-6 md:py-12">
                <div className="max-w-7xl mx-auto space-y-8">
                    <div className="bg-white border-4 border-retro-purple p-8 rounded-2xl shadow-[6px_6px_0px_0px_rgba(77,43,140,1)] md:shadow-[12px_12px_0px_0px_rgba(77,43,140,1)] transform -rotate-1">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-retro-yellow rounded-full border-4 border-retro-purple flex items-center justify-center text-3xl shadow-md">
                                🚀
                            </div>
                            <div>
                                <h2 className="text-3xl md:text-4xl font-black text-retro-purple uppercase tracking-tighter">System Ready</h2>
                                <p className="text-gray-500 font-bold">You are successfully authenticated to the AiNews network.</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white border-4 border-retro-orange p-8 rounded-2xl shadow-[6px_6px_0px_0px_rgba(238,167,39,1)] md:shadow-[12px_12px_0px_0px_rgba(238,167,39,1)]">
                            <h3 className="text-2xl font-black text-retro-orange uppercase tracking-widest mb-4">Quick Stats</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-retro-orange/5 rounded-xl border-2 border-retro-orange/20 text-center">
                                    <div className="text-3xl font-black text-retro-orange">100+</div>
                                    <div className="text-xs font-bold uppercase text-gray-400">Articles</div>
                                </div>
                                <div className="p-4 bg-retro-orange/5 rounded-xl border-2 border-retro-orange/20 text-center">
                                    <div className="text-3xl font-black text-retro-orange">Daily</div>
                                    <div className="text-xs font-bold uppercase text-gray-400">Updates</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border-4 border-retro-pink p-8 rounded-2xl shadow-[6px_6px_0px_0px_rgba(217,70,239,0.5)] md:shadow-[12px_12px_0px_0px_rgba(217,70,239,0.5)]">
                            <h3 className="text-2xl font-black text-retro-pink uppercase tracking-widest mb-4">Account</h3>
                            <p className="text-gray-500 font-bold mb-6">Manage your subscription and profile settings.</p>
                            <a href={route('profile.edit')} className="inline-block px-6 py-2 bg-retro-pink text-white rounded-lg font-black uppercase tracking-widest shadow-md hover:translate-y-[-2px] transition-all">
                                Edit Profile
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
