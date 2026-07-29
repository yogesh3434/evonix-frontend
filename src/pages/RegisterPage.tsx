import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { z } from 'zod';
import { useAuth } from '../context/useAuth';
import { apiClient } from '../lib/apiClient';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import ErrorMessage from '../components/common/ErrorMessage';
import LoadingSpinner from '../components/common/LoadingSpinner';

const profileSchema = z
    .object({
        phone: z.string().trim().optional(),
        street: z.string().trim().optional(),
        city: z.string().trim().optional(),
        province: z.string().trim().optional(),
        postalCode: z.string().trim().optional(),
        country: z.string().trim().optional(),
    })
    .refine(
        (data) =>
            Boolean(data.phone) ||
            Boolean(
                data.street && data.city && data.province && data.postalCode
            ),
        {
            message:
                'Provide at least a phone number or a complete address (street, city, province, postal code).',
        }
    );

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function RegisterPage() {
    const { session, isLoading } = useAuth();
    const [statusMessage, setStatusMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, handleSubmit } = useForm<ProfileFormValues>();

    const onSubmit = async (values: ProfileFormValues) => {
        setStatusMessage(null);
        setErrorMessage(null);

        const parsed = profileSchema.safeParse(values);

        if (!parsed.success) {
            setErrorMessage(
                parsed.error.issues[0]?.message ?? 'Invalid input.'
            );
            return;
        }

        if (!session) {
            setErrorMessage(
                'You must be signed in to complete your profile.'
            );
            return;
        }

        const payload: {
            phone?: string;
            address?: {
                street: string;
                city: string;
                province: string;
                postalCode: string;
                country?: string;
            };
        } = {};

        if (parsed.data.phone) {
            payload.phone = parsed.data.phone;
        }

        if (
            parsed.data.street &&
            parsed.data.city &&
            parsed.data.province &&
            parsed.data.postalCode
        ) {
            payload.address = {
                street: parsed.data.street,
                city: parsed.data.city,
                province: parsed.data.province,
                postalCode: parsed.data.postalCode,
                country: parsed.data.country || undefined,
            };
        }

        setIsSubmitting(true);

        try {
            await apiClient.patch('/auth/profile', payload, {
                headers: { Authorization: `Bearer ${session.access_token}` },
            });
            setStatusMessage('Profile saved successfully.');
        } catch (err) {
            const message =
                axios.isAxiosError(err) &&
                typeof err.response?.data?.message === 'string'
                    ? err.response.data.message
                    : 'Something went wrong saving your profile.';
            setErrorMessage(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <section aria-label="Complete your profile" className="container mx-auto px-4 py-16 flex items-center justify-center flex-grow">
                <LoadingSpinner label="Checking your session..." />
            </section>
        );
    }

    if (!session) {
        return (
            <section aria-label="Complete your profile" className="container mx-auto px-4 py-16 flex flex-col items-center justify-center flex-grow">
                <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-6 text-center">
                    <h1 className="text-2xl font-bold text-slate-900">Complete Your Profile</h1>

                    <p className="text-sm text-slate-600">
                        You must sign in with Google before completing your
                        profile.
                    </p>

                    <div>
                        <Link to="/login" className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            Go to Sign In
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section aria-label="Complete your profile" className="container mx-auto px-4 py-12 flex flex-col items-center flex-grow">
            <div className="w-full max-w-2xl bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Complete Your Profile</h1>
                    <p className="text-slate-500">
                        Google does not provide a phone number or address, so please
                        add them here.
                    </p>
                </div>

                {statusMessage && <p role="status" className="p-4 rounded-lg bg-green-50 text-green-800 text-sm font-medium border border-green-200">{statusMessage}</p>}
                {errorMessage && <ErrorMessage message={errorMessage} />}

                <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-8">
                    <div className="flex flex-col gap-6">
                        <Input label="Phone" {...register('phone')} />
                    </div>

                    <div className="flex flex-col gap-6">
                        <h2 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-2">Default Address</h2>

                        <Input label="Street" {...register('street')} />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <Input label="City" {...register('city')} />
                            <Input label="Province" {...register('province')} />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <Input label="Postal Code" {...register('postalCode')} />
                            <Input label="Country" {...register('country')} />
                        </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <p className="text-sm text-blue-800">Provide at least a phone number or a complete address.</p>
                    </div>

                    <Button
                        type="submit"
                        isLoading={isSubmitting}
                        loadingText="Saving..."
                        size="lg"
                    >
                        Save Profile
                    </Button>
                </form>
            </div>
        </section>
    );
}
