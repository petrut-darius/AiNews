import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="max-w-md mx-auto">
                <div className="bg-white border-4 border-retro-purple p-6 md:p-8 rounded-2xl shadow-[6px_6px_0px_0px_rgba(77,43,140,1)] md:shadow-[12px_12px_0px_0px_rgba(77,43,140,1)]">
                    <div className="mb-8 text-center">
                        <h2 className="text-3xl md:text-4xl font-black text-retro-purple uppercase tracking-tighter">Join AiNews</h2>
                        <p className="text-gray-500 font-bold mt-2">Get the latest AI updates daily</p>
                    </div>

                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <InputLabel htmlFor="name" value="Full Name" className="text-retro-purple font-black uppercase text-xs mb-1" />
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full text-base md:text-lg p-3"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            <InputError message={errors.name} className="mt-2 font-bold" />
                        </div>

                        <div>
                            <InputLabel htmlFor="email" value="Email Address" className="text-retro-purple font-black uppercase text-xs mb-1" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full text-base md:text-lg p-3"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            <InputError message={errors.email} className="mt-2 font-bold" />
                        </div>

                        <div>
                            <InputLabel htmlFor="password" value="Password" className="text-retro-purple font-black uppercase text-xs mb-1" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full text-base md:text-lg p-3"
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                            <InputError message={errors.password} className="mt-2 font-bold" />
                        </div>

                        <div>
                            <InputLabel htmlFor="password_confirmation" value="Confirm Password" className="text-retro-purple font-black uppercase text-xs mb-1" />
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full text-base md:text-lg p-3"
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                            />
                            <InputError message={errors.password_confirmation} className="mt-2 font-bold" />
                        </div>

                        <div className="pt-4">
                            <PrimaryButton className="w-full justify-center text-lg py-4" disabled={processing}>
                                Create Account
                            </PrimaryButton>
                        </div>
                    </form>

                    <div className="mt-8 pt-6 border-t-2 border-dashed border-gray-100 text-center">
                        <p className="text-gray-500 font-bold">
                            Already registered?{' '}
                            <Link href={route('login')} className="text-retro-purple hover:text-retro-pink underline decoration-2 underline-offset-4">
                                Log in instead
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
