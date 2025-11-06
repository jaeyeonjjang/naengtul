import axios from 'axios';
import { SERVER_URL } from '../constants';

// axios 인스턴스 생성
const api = axios.create({
    baseURL: SERVER_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// 요청 인터셉터: 모든 요청에 자동으로 JWT 추가
// api.interceptors.request.use(
//     (config) => {
//         const token = sessionStorage.getItem('jwt');
//         if (token) {
//             config.headers.Authorization = token;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// 응답 인터셉터: 401 에러 시 자동 로그아웃
// api.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     (error) => {
//         if (error.response && error.response.status === 401) {
//             // 토큰 만료 또는 인증 실패
//             sessionStorage.removeItem('jwt');
//             window.location.href = '/login';
//         }
//         return Promise.reject(error);
//     }
// );

export default api;