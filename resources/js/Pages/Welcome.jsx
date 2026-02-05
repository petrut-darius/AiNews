import NavLink from '@/Components/NavLink';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';


export default function Welcome(props) {
    return (
        <>
            <div>
                <div>
                    <span className='text-9xl'>This is AiNews!</span>
                </div>
                <div> image in parelele to this</div>
            </div>
            <hr />
            <div>
                <p>We present you the news the news in the Ai world, you can see the latest news here <Link href={route("login")}>articles</Link></p>
            </div>
            <hr />
            <div>
                <h1>This site is created for educational purposes!</h1>
            </div>
            <div>
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
                Who created this?
                <p>This website is created by thePdi using Laravel and React, etc</p>
                <p>Here is the link to my root portofolio</p>
            </div>
        </>
    );
}

//page se refera la Welcome
Welcome.layout = (page) => {
    if(page.props.layout === "auth") {
        return <AuthenticatedLayout>{page}</AuthenticatedLayout>
    }

    return <GuestLayout>{page}</GuestLayout>;
};
