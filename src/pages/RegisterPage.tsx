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
            <section aria-label="Complete your profile">
                <LoadingSpinner label="Checking your session..." />
            </section>
        );
    }

    if (!session) {
        return (
            <section aria-label="Complete your profile">
                <h1>Complete Your Profile</h1>

                <p>
                    You must sign in with Google before completing your
                    profile.
                </p>

                <p>
                    <Link to="/login">Go to Sign In</Link>
                </p>
            </section>
        );
    }

    return (
        <section aria-label="Complete your profile">
            <h1>Complete Your Profile</h1>

            <p>
                Google does not provide a phone number or address, so please
                add them here.
            </p>

            {statusMessage && <p role="status">{statusMessage}</p>}
            {errorMessage && <ErrorMessage message={errorMessage} />}

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Input label="Phone" {...register('phone')} />

                <h2>Default Address</h2>

                <Input label="Street" {...register('street')} />
                <Input label="City" {...register('city')} />
                <Input label="Province" {...register('province')} />
                <Input label="Postal Code" {...register('postalCode')} />
                <Input label="Country" {...register('country')} />

                <p>Provide at least a phone number or a complete address.</p>

                <Button
                    type="submit"
                    isLoading={isSubmitting}
                    loadingText="Saving..."
                >
                    Save Profile
                </Button>
            </form>
        </section>
    );
}
