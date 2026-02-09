import NavLink from '@/Components/NavLink';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Index({articles}) {
    return (
        <>
            {articles.data.map(article => (
                <ul key={article.id}>
                    {article.title}
                </ul>
            ))}
        </>
    );
}

Index.layout = (page) => {
    const {auth} = page.props;

    if(auth?.user) {
        return <AuthenticatedLayout>{page}</AuthenticatedLayout>
    }

    return <GuestLayout>{page}</GuestLayout>;
};
