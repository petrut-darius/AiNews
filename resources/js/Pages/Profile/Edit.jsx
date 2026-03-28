import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout>
            <Head title="Profile" />

            <div className="py-12 space-y-12">
                <div className="max-w-3xl mx-auto space-y-12">
                    <div className="bg-white border-4 border-retro-purple p-8 rounded-2xl shadow-[12px_12px_0px_0px_rgba(77,43,140,1)]">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="w-full"
                        />
                    </div>

                    <div className="bg-white border-4 border-retro-orange p-8 rounded-2xl shadow-[12px_12px_0px_0px_rgba(238,167,39,1)]">
                        <UpdatePasswordForm className="w-full" />
                    </div>

                    <div className="bg-white border-4 border-red-500 p-8 rounded-2xl shadow-[12px_12px_0px_0px_rgba(239,68,68,1)]">
                        <DeleteUserForm className="w-full" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
