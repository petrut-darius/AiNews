import NavLink from '@/Components/NavLink';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, usePage } from '@inertiajs/react';


export default function Welcome(props) {
    return (
        <>  <div>
                <div className='flex flex-col lg:flex-row items-center justify-evenly'>
                    <div>
                        <span className='font-bold text-4xl sm:text-6xl lg:text-8xl'>This is AiNews!</span>
                    </div>
                    <div>
                        <svg viewBox="0 0 512 512" version="1.1" className='w-32 h-32 sm:w-32 sm:h-32 lg:w-64 lg:h-64' xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="icon" fill="#000000" transform="translate(64.000000, 64.000000)"> <path d="M320,64 L320,320 L64,320 L64,64 L320,64 Z M171.749388,128 L146.817842,128 L99.4840387,256 L121.976629,256 L130.913039,230.977 L187.575039,230.977 L196.319607,256 L220.167172,256 L171.749388,128 Z M260.093778,128 L237.691519,128 L237.691519,256 L260.093778,256 L260.093778,128 Z M159.094727,149.47526 L181.409039,213.333 L137.135039,213.333 L159.094727,149.47526 Z M341.333333,256 L384,256 L384,298.666667 L341.333333,298.666667 L341.333333,256 Z M85.3333333,341.333333 L128,341.333333 L128,384 L85.3333333,384 L85.3333333,341.333333 Z M170.666667,341.333333 L213.333333,341.333333 L213.333333,384 L170.666667,384 L170.666667,341.333333 Z M85.3333333,0 L128,0 L128,42.6666667 L85.3333333,42.6666667 L85.3333333,0 Z M256,341.333333 L298.666667,341.333333 L298.666667,384 L256,384 L256,341.333333 Z M170.666667,0 L213.333333,0 L213.333333,42.6666667 L170.666667,42.6666667 L170.666667,0 Z M256,0 L298.666667,0 L298.666667,42.6666667 L256,42.6666667 L256,0 Z M341.333333,170.666667 L384,170.666667 L384,213.333333 L341.333333,213.333333 L341.333333,170.666667 Z M0,256 L42.6666667,256 L42.6666667,298.666667 L0,298.666667 L0,256 Z M341.333333,85.3333333 L384,85.3333333 L384,128 L341.333333,128 L341.333333,85.3333333 Z M0,170.666667 L42.6666667,170.666667 L42.6666667,213.333333 L0,213.333333 L0,170.666667 Z M0,85.3333333 L42.6666667,85.3333333 L42.6666667,128 L0,128 L0,85.3333333 Z" id="Combined-Shape"> </path> </g> </g> </g></svg>
                    </div>
                </div>
            </div>
            <hr />
            <div className='font-bold text-2xl sm:text-4xl lg:text-6xl my-6'>
                <p>We present you the news in the Ai world, you can see the latest news here <Link href={route("articles.index")} className='text-retro-orange hover:text-retro-yellow hover:underline hover:decoration-retro-yellow'>articles</Link>.</p>
            </div>
            <hr />
            <div className='font-bold text-xl sm:text-2xl lg:text-4xl my-6'>
                <span>How do we get our data?</span>
                <div>
                    <span>Crawlers</span>
                    <p>blablabla</p>
                    <span>We thank the guts at infoq, spectrum, towardsdatascience, venture beat</span><br />
                    <span>To get get better info you can checkout links to them</span>
                </div>
            </div>
            <hr />
            <div>
                <h1>This site is created for educational purposes!</h1>
            </div>
            <div className='font-bold text-lg sm:text-xl lg:text-2xl my-6'>
                <div>
                    <span className='font-bold text-xl sm:text-2xl lg:text-4xl my-6'>Who created this?</span>
                    <p>This website is created by thePdi using Laravel and React, etc</p>
                    <p>Hello I am Petrut Darius blablabla</p>

                    <p>Here is the link to my root portofolio</p>
                </div>
                <div>
                    photo with me
                </div>
            </div>
        </>
    );
}

//page se refera la Welcome
Welcome.layout = (page) => {
    const {auth} = page.props;

    if(auth?.user) {
        return <AuthenticatedLayout>{page}</AuthenticatedLayout>
    }

    return <GuestLayout>{page}</GuestLayout>;
};
