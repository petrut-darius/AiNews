import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import { usePage } from '@inertiajs/react';

function SubscribeButtons() {
    const subscribe = (interval) => {
        const form = document.createElement("form");
        form.method = "POST";
        form.action = route("checkout.store");

        const token = document.querySelector('meta[name="csrf-token"]').content;

        form.innerHTML = `
            <input type="hidden" name="_token" value="${token}">
            <input type="hidden" name="plan" value="premium">
            <input type="hidden" name="interval" value="${interval}">
        `;

        document.body.appendChild(form);
        form.submit();
    };

    return (
        <>
            <div className='flex justify-evenly'>
                <div className='border p-4 rounded bg-retro-pink'>
                    <span>Lifetime.</span><br></br>
                    <div className=" bg-retro-orange p-2 rounded text-center hover:bg-retro-yellow hover:underline hover:decoration-retro-yellow">
                        <SecondaryButton onClick={() => subscribe("one-time")}>Pay!</SecondaryButton>
                    </div>
                </div>
                <div className='border p-4 rounded bg-retro-pink'>
                    <span>Yearly.</span><br></br>
                    <div className=" bg-retro-orange p-2 rounded text-center hover:bg-retro-yellow hover:underline hover:decoration-retro-yellow">
                        <SecondaryButton onClick={() => subscribe("yearly")}>Pay!</SecondaryButton>
                    </div>
                </div>
                <div className='border p-4 rounded bg-retro-pink'>
                    <span>Monthly.</span><br></br>
                    <div className=" bg-retro-orange p-2 rounded text-center hover:bg-retro-yellow hover:underline hover:decoration-retro-yellow">
                        <SecondaryButton onClick={() => subscribe("monthly")}>Pay!</SecondaryButton>
                    </div>
                </div>
            </div>
        </>
    );
};

export default function Index({data}) {
    const {auth} = usePage().props;

    return (
        <>
            <h1>Hello, {auth.user.subscribed}</h1>

            {SubscribeButtons()}
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
