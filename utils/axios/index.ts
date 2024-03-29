import type { CookieValueTypes } from 'cookies-next';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { getCookie } from 'cookies-next';

interface CreateInstanceOption {
    token?: CookieValueTypes;
    baseURL: string;
}

export function createAxiosInstance(
    option: CreateInstanceOption,
): AxiosInstance {
    const { token, baseURL } = option;

    const newInstance = axios.create({
        baseURL,
        // timeout: 5000,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // 서버에서 요청 시 기본 헤더를 설정
    let authorization = 'Bearer ';
    if (token) {
        authorization += token;
    } else {
        authorization += 'Non-members';
    }

    newInstance.defaults.headers.common['authorization'] = authorization;

    // 클라이언트에서 요청을 보내기 전에 실행되는 인터셉터 설정
    newInstance.interceptors.request.use((config: AxiosRequestConfig) => {
        if (typeof window !== 'undefined') {
            const token = getCookie(process.env.COOKIE_TOKEN_KEY || '');
            // let token;
            // if (process.env.NODE_ENV === 'development') {
            //     token = 'test';
            // } else {
            //     token = getCookie(process.env.COOKIE_TOKEN_KEY || '');
            // }

            let authorization = 'Bearer ';
            if (token) {
                authorization += token;
            } else {
                authorization += 'Non-members';
            }

            config.headers!['authorization'] = authorization;
        }

        return config;
    });

    return newInstance;
}
