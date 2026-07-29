import axios from 'axios';
import { supabase } from './supabaseClient';

const baseURL =
    import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000/api';

export const apiClient = axios.create({ baseURL });

apiClient.interceptors.request.use(async (config) => {
    const { data } = await supabase.auth.getSession();
    const accessToken = data.session?.access_token;

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});