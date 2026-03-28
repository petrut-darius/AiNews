import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="max-w-md mx-auto">
                <div className="bg-white border-4 border-retro-purple p-8 rounded-2xl shadow-[12px_12px_0px_0px_rgba(77,43,140,1)]">
                    <div className="mb-8 text-center">
                        <h2 className="text-4xl font-black text-retro-purple uppercase tracking-tighter">Welcome Back</h2>
                        <p className="text-gray-500 font-bold mt-2">Log in to your account</p>
                    </div>

                    {status && (
                        <div className="mb-4 bg-green-50 border-2 border-green-500 p-3 rounded-lg text-sm font-bold text-green-700">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <InputLabel htmlFor="email" value="Email Address" className="text-retro-purple font-black uppercase text-xs mb-1" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full text-lg p-3"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
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
                                className="mt-1 block w-full text-lg p-3"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            <InputError message={errors.password} className="mt-2 font-bold" />
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center group cursor-pointer">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="border-2 border-retro-purple rounded text-retro-purple focus:ring-retro-pink"
                                />
                                <span className="ms-2 text-sm font-bold text-gray-600 group-hover:text-retro-purple transition-colors">Remember me</span>
                            </label>

                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-sm font-bold text-retro-orange hover:text-retro-pink transition-colors underline decoration-2 underline-offset-4"
                                >
                                    Forgot?
                                </Link>
                            )}
                        </div>

                        <div className="pt-2">
                            <PrimaryButton className="w-full justify-center text-lg py-4" disabled={processing}>
                                Sign In
                            </PrimaryButton>
                        </div>
                    </form>

                    <div className="mt-8 pt-6 border-t-2 border-dashed border-gray-100 text-center">
                        <p className="text-gray-500 font-bold">
                            Don't have an account?{' '}
                            <Link href={route('register')} className="text-retro-purple hover:text-retro-pink underline decoration-2 underline-offset-4">
                                Create one now
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
