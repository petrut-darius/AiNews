import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import { Link } from '@inertiajs/react';

export default function Index({auth, previewArticles, articles}) {
    const user = auth?.user;

    return (
        <div>
            <h1 className='text-center text-6xl mb-6'>Articles</h1>

            {previewArticles.map(article => (
                <div key={article.id} className='py-2'>
                    <h2 className='font-extrabold text-4xl'>{article.title}</h2>
                    <div className='border-b-2 py-6  border-solid border-black'>
                    <div
                        dangerouslySetInnerHTML={{ __html: article.content }}
                        className='text-lg'
                    />
                </div>
                </div>
            ))}

            {user ? (
                <>
                    {articles.map(article => (
                        <div key={article.id} className='py-2'>
                            <h2 className='font-extrabold text-4xl'>{article.title}</h2>
                            <div className='border-b-2 py-6  border-solid border-black'>
                            <div
                                dangerouslySetInnerHTML={{ __html: article.content }}
                                className='text-lg'
                            />
                        </div>
                        </div>
                    ))}
                </>
            ) : (
                <div className="relative min-h-[500px] mt-8">
                    <div className="blur-md grayscale pointer-events-none select-none">
                        <div className='py-2'>
                            <h2 className='font-extrabold text-4xl'>Articol exclusiv premium</h2>
                            <div className='border-b-2 py-6 border-solid border-black'>
                                <div className='text-lg space-y-4'>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                    <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                                </div>
                            </div>
                        </div>
                        <div className='py-2'>
                            <h2 className='font-extrabold text-4xl'>Încă un articol exclusiv</h2>
                            <div className='border-b-2 py-6 border-solid border-black'>
                                <div className='text-lg space-y-4'>
                                    <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/80 to-white flex items-center justify-center">
                        <div className="text-center p-10 max-w-lg bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200">
                            <div className="mb-6">
                                <svg className="w-20 h-20 mx-auto text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                                </svg>
                            </div>

                            <h3 className="text-3xl font-extrabold mb-4 text-gray-900">
                                Conținut exclusiv
                            </h3>

                            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                                Autentifică-te pentru a accesa articolele complete și materialele premium
                            </p>

                            <div className="space-y-3 text-lg">
                                <Link href={route("login")} className='text-retro-orange hover:text-retro-pink hover:underline hover:decoration-retro-pink'>Log in!</Link><br></br>
                                <Link href={route("register")} className='text-retro-orange hover:text-retro-pink hover:underline hover:decoration-retro-pink'>Register!</Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

Index.layout = (page) => {
    const {auth} = page.props;

    if(auth?.user) {
        return <AuthenticatedLayout>{page}</AuthenticatedLayout>
    }

    return <GuestLayout>{page}</GuestLayout>;
};
