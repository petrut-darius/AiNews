import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Welcome({ articles }) {
    const featuredArticle = articles && articles.length > 0 ? articles[0] : null;
    const recentArticles = articles && articles.length > 1 ? articles.slice(1) : [];

    return (
        <div className="space-y-12">
            {/* Hero Section */}
            {featuredArticle ? (
                <section className="bg-white border-4 border-retro-purple p-8 rounded-xl shadow-[8px_8px_0px_0px_rgba(77,43,140,1)] hover:shadow-[12px_12px_0px_0px_rgba(77,43,140,1)] transition-all duration-300">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="flex-1 space-y-5">
                            <div className="flex items-center gap-3">
                                <span className="inline-block bg-retro-orange text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                                    Featured Story
                                </span>
                                <span className="text-gray-400 text-sm font-medium">
                                    {featuredArticle.created_at}
                                </span>
                            </div>

                            <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight">
                                <a href={featuredArticle.url} target="_blank" rel="noopener noreferrer" className="hover:text-retro-purple transition-colors decoration-retro-yellow decoration-4 hover:underline">
                                    {featuredArticle.title}
                                </a>
                            </h2>
                            
                            <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                                <span className="text-retro-purple">Source:</span>
                                <span className="uppercase tracking-wide">{featuredArticle.source}</span>
                                {featuredArticle.author && (
                                    <>
                                        <span className="text-gray-300">•</span>
                                        <span className="text-retro-purple">By:</span>
                                        <span>{featuredArticle.author}</span>
                                    </>
                                )}
                            </div>

                            <p className="text-lg text-gray-700 line-clamp-3 leading-relaxed border-l-4 border-retro-yellow pl-4">
                                {featuredArticle.body_text}
                            </p>
                            
                            <div className="pt-4">
                                <a
                                    href={featuredArticle.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-retro-purple text-white px-6 py-3 rounded-lg font-bold hover:bg-retro-pink transition-all transform hover:-translate-y-1 shadow-md hover:shadow-lg"
                                >
                                    Read Full Article 
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                    <h2 className="text-2xl font-bold text-gray-500">No articles available yet.</h2>
                    <p className="text-gray-400 mt-2">Check back later for the latest AI news.</p>
                </div>
            )}

            {/* Recent Articles Grid */}
            {recentArticles.length > 0 && (
                <section>
                    <div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-gray-100">
                        <h3 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                            <span className="w-3 h-8 bg-retro-yellow rounded-full"></span>
                            Latest News
                        </h3>
                        <Link href={route('articles.index')} className="group flex items-center gap-2 text-retro-purple font-bold hover:text-retro-pink transition-colors">
                            View Archive
                            <span className="bg-retro-purple/10 p-1 rounded-full group-hover:bg-retro-pink/20 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </span>
                        </Link>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {recentArticles.map((article) => (
                            <article key={article.id} className="group bg-white border-2 border-gray-100 rounded-xl p-6 hover:border-retro-orange transition-all duration-300 hover:shadow-lg flex flex-col h-full relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-retro-yellow/20 to-transparent rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150"></div>
                                
                                <div className="mb-4 flex justify-between items-start z-10">
                                    <span className="text-xs font-bold text-retro-purple bg-retro-purple/5 px-2 py-1 rounded border border-retro-purple/10 uppercase tracking-wider">
                                        {article.source}
                                    </span>
                                    <span className="text-xs text-gray-400 font-mono">{article.created_at}</span>
                                </div>
                                
                                <h4 className="text-xl font-bold text-gray-900 mb-3 flex-grow z-10 leading-snug">
                                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="hover:text-retro-orange transition-colors">
                                        {article.title}
                                    </a>
                                </h4>
                                
                                <p className="text-gray-600 text-sm line-clamp-3 mb-6 z-10 relative">
                                    {article.body_text}
                                </p>
                                
                                <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between z-10">
                                    <span className="text-xs text-gray-400 truncate max-w-[50%]">
                                        {article.author || 'Unknown Author'}
                                    </span>
                                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-retro-purple hover:text-retro-pink flex items-center gap-1 group/link">
                                        Read
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 transition-transform group-hover/link:translate-x-1">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                        </svg>
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            )}

            {/* About / Info Section (Restyled) */}
            <section className="grid md:grid-cols-2 gap-8 mt-16">
                <div className="bg-retro-purple/5 border-l-4 border-retro-purple p-8 rounded-r-xl">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                        <div className="w-10 h-10 bg-retro-purple text-white rounded-lg flex items-center justify-center font-black text-xl shadow-md">?</div>
                        How it works
                    </h3>
                    <div className="prose prose-sm text-gray-600">
                        <p className="mb-4">
                            We use specialized crawlers to curate the most impactful AI news from trusted tech sources.
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {['InfoQ', 'Spectrum', 'Towards Data Science', 'Venture Beat'].map(source => (
                                <span key={source} className="bg-white border border-gray-200 px-2 py-1 rounded text-xs font-semibold text-gray-700">
                                    {source}
                                </span>
                            ))}
                        </div>
                        <p className="text-xs text-gray-500 italic flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            Educational aggregator. Content belongs to original publishers.
                        </p>
                    </div>
                </div>

                <div className="bg-retro-orange/5 border-l-4 border-retro-orange p-8 rounded-r-xl">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                        <div className="w-10 h-10 bg-retro-orange text-white rounded-lg flex items-center justify-center font-black text-xl shadow-md">&lt;/&gt;</div>
                        The Project
                    </h3>
                    <div className="prose prose-sm text-gray-600">
                        <p className="mb-4">
                            Built by <strong>thePdi</strong> (Petrut Darius) to demonstrate modern web architecture using the <strong>TALL/VILT</strong> stack.
                        </p>
                        <div className="grid grid-cols-2 gap-2 mb-4">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-red-500 rounded-full"></div> Laravel
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div> Inertia.js
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div> React
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-teal-500 rounded-full"></div> TailwindCSS
                            </div>
                        </div>
                        <a href="#" className="text-sm font-bold text-retro-orange hover:text-retro-purple transition-colors flex items-center gap-1">
                            Visit Portfolio 
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                            </svg>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}

Welcome.layout = (page) => {
    const { auth } = page.props;
    if (auth?.user) {
        return <AuthenticatedLayout>{page}</AuthenticatedLayout>;
    }
    return <GuestLayout>{page}</GuestLayout>;
};
