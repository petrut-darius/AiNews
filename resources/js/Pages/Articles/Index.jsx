import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, previewArticles, articles }) {
    const user = auth?.user;

    return (
        <div className="space-y-12">
            <Head title="Exclusive Articles" />
            
            <header className="text-center space-y-4">
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-retro-purple uppercase tracking-tighter italic">
                    The <span className="text-retro-orange underline decoration-retro-yellow decoration-8">Archive</span>
                </h1>
                <p className="text-gray-500 font-bold text-lg md:text-xl">Deep dives into the world of Artificial Intelligence.</p>
            </header>

            {/* Preview Articles (Visible to everyone) */}
            <div className="space-y-8">
                {previewArticles.map((article, index) => (
                    <article key={article.id} className="bg-white border-4 border-retro-purple rounded-2xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(77,43,140,1)] flex flex-col md:flex-row">
                        <div className="bg-retro-purple text-white p-6 md:w-48 flex flex-col justify-center items-center text-center space-y-2">
                            <span className="text-4xl font-black italic text-retro-yellow">#{index + 1}</span>
                            <span className="text-xs font-bold uppercase tracking-widest opacity-70">Public Release</span>
                        </div>
                        <div className="p-8 flex-1 space-y-4">
                            <h2 className="text-3xl font-black text-gray-900 leading-tight hover:text-retro-orange transition-colors">
                                {article.title}
                            </h2>
                            <div 
                                dangerouslySetInnerHTML={{ __html: article.content }}
                                className="prose prose-lg text-gray-600 line-clamp-4 font-medium"
                            />
                            <div className="pt-4 flex items-center justify-between">
                                <span className="text-sm font-black text-retro-purple uppercase tracking-wider bg-retro-purple/5 px-3 py-1 rounded-full border border-retro-purple/10">
                                    Full Access
                                </span>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            {/* Restricted Content Area */}
            {user ? (
                <div className="space-y-8 mt-12 pt-12 border-t-4 border-dashed border-retro-purple/20">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-2 flex-grow bg-retro-orange rounded-full"></div>
                        <h2 className="text-2xl font-black text-retro-orange uppercase italic tracking-widest px-4">Premium Content</h2>
                        <div className="h-2 flex-grow bg-retro-orange rounded-full"></div>
                    </div>
                    {articles.map((article, index) => (
                        <article key={article.id} className="bg-white border-4 border-retro-orange rounded-2xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(238,167,39,1)] flex flex-col md:flex-row">
                            <div className="bg-retro-orange text-white p-6 md:w-48 flex flex-col justify-center items-center text-center space-y-2">
                                <span className="text-4xl font-black italic text-retro-purple">#{index + 4}</span>
                                <span className="text-xs font-bold uppercase tracking-widest text-retro-purple">Exclusive</span>
                            </div>
                            <div className="p-8 flex-1 space-y-4">
                                <h2 className="text-3xl font-black text-gray-900 leading-tight">
                                    {article.title}
                                </h2>
                                <div 
                                    dangerouslySetInnerHTML={{ __html: article.content }}
                                    className="prose prose-lg text-gray-600 font-medium"
                                />
                            </div>
                        </article>
                    ))}
                </div>
            ) : (
                <div className="relative mt-16">
                    {/* Blurred Mockup Background */}
                    <div className="blur-xl opacity-30 pointer-events-none select-none space-y-8">
                        {[1, 2].map((i) => (
                            <div key={i} className="bg-white border-4 border-gray-200 rounded-2xl p-8 space-y-4">
                                <div className="h-8 bg-gray-200 rounded-lg w-3/4"></div>
                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-100 rounded w-full"></div>
                                    <div className="h-4 bg-gray-100 rounded w-full"></div>
                                    <div className="h-4 bg-gray-100 rounded w-5/6"></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* High-Impact Retro Paywall Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                        <div className="bg-white border-8 border-retro-purple p-2 rounded-[2.5rem] shadow-[20px_20px_0px_0px_rgba(255,239,95,1)] transform rotate-1 max-w-2xl w-full">
                            <div className="bg-retro-yellow border-4 border-retro-purple rounded-[2rem] p-8 md:p-12 text-center space-y-8 relative overflow-hidden">
                                {/* Hazard Stripes Decoration */}
                                <div className="absolute top-0 left-0 w-full h-4 bg-retro-purple flex gap-4">
                                    {[...Array(20)].map((_, i) => (
                                        <div key={i} className="w-8 h-full bg-retro-orange -skew-x-45 transform translate-x-2"></div>
                                    ))}
                                </div>
                                
                                <div className="pt-6">
                                    <div className="inline-block bg-retro-purple text-retro-yellow px-6 py-2 rounded-full font-black text-xl uppercase tracking-tighter transform -rotate-2 mb-6">
                                        Restricted Area
                                    </div>
                                    
                                    <h3 className="text-4xl md:text-5xl font-black text-retro-purple leading-none uppercase tracking-tighter">
                                        Unlock the <br/>
                                        <span className="text-6xl text-retro-orange">Full Story</span>
                                    </h3>
                                    
                                    <p className="text-retro-purple font-bold text-lg max-w-sm mx-auto mt-6">
                                        You've reached the edge of public news. Join our community to access 100+ exclusive AI deep dives and premium reports.
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                                    <Link 
                                        href={route("login")} 
                                        className="w-full sm:w-auto px-10 py-4 bg-retro-purple text-white rounded-xl font-black text-xl uppercase tracking-widest shadow-[6px_6px_0px_0px_rgba(238,167,39,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                                    >
                                        Log In
                                    </Link>
                                    <Link 
                                        href={route("register")} 
                                        className="w-full sm:w-auto px-10 py-4 bg-white border-4 border-retro-purple text-retro-purple rounded-xl font-black text-xl uppercase tracking-widest shadow-[6px_6px_0px_0px_rgba(77,43,140,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                                    >
                                        Register
                                    </Link>
                                </div>

                                <p className="text-retro-purple/60 font-black text-xs uppercase tracking-widest pt-4">
                                    Premium membership is currently free for educational purposes!
                                </p>
                                
                                {/* Bottom Hazard Stripes */}
                                <div className="absolute bottom-0 left-0 w-full h-4 bg-retro-purple flex gap-4">
                                    {[...Array(20)].map((_, i) => (
                                        <div key={i} className="w-8 h-full bg-retro-orange -skew-x-45 transform translate-x-2"></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

Index.layout = (page) => {
    const { auth } = page.props;
    if (auth?.user) {
        return <AuthenticatedLayout>{page}</AuthenticatedLayout>;
    }
    return <GuestLayout>{page}</GuestLayout>;
};
