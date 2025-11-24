import { FC, useEffect, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import './RegisterForm.css';
import { createUser } from '../../api/createUser';
import { loginUser } from '../../api/loginUser';
import { getUserProfile } from '../../api/getUserProfile';
import { useSearch } from '../../hooks/UseSearch';
import { EmailIcon, UserIcon, LockIcon } from './icons'; 


const registerSchema = z.object({
    name: z.string()
        .min(2, { message: 'Имя должно содержать минимум 2 символа' })
        .max(100, { message: 'Имя не может быть длиннее 100 символов' })
        .trim(),
    surname: z.string()
        .min(2, { message: 'Фамилия должна содержать минимум 2 символа' })
        .max(100, { message: 'Фамилия не может быть длиннее 100 символов' })
        .trim(),
    email: z.string()
        .email({ message: 'Введите корректный email' })
        .min(5, { message: 'Email слишком короткий' })
        .max(100, { message: 'Email слишком длинный' })
        .trim(),
    password: z.string()
        .min(6, { message: 'Пароль должен быть не короче 6 символов' })
        .max(100, { message: 'Пароль слишком длинный' })
        .trim()
        .refine((val) => /[A-Z]/.test(val), {
            message: 'Пароль должен содержать хотя бы одну заглавную букву',
        })
        .refine((val) => /[0-9]/.test(val), {
            message: 'Пароль должен содержать хотя бы одну цифру',
        }),

    confirmPassword: z.string().min(6, { message: 'Подтверждение пароля должно быть не короче 6 символов' }).max(100, { message: 'Подтверждение пароля слишком длинное' })
        .trim(),
}).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Пароли не совпадают',
});

const loginSchema = z.object({
    email: z.string()
        .email({ message: 'Введите корректный email' })
        .min(5, { message: 'Email слишком короткий' })
        .max(100, { message: 'Email слишком длинный' })
        .trim(),
    password: z.string()
        .min(6, { message: 'Пароль должен быть не короче 6 символов' })
        .max(100, { message: 'Пароль слишком длинный' })
        .trim(),
});

type RegisterFormProps = {
    isOpen: boolean;
    onClose: () => void;
};

type RegisterData = z.infer<typeof registerSchema>;
type LoginData = z.infer<typeof loginSchema>;

export const RegisterForm: FC<RegisterFormProps> = ({ isOpen, onClose }) => {
    const { setUserProfile } = useSearch();
    const [mode, setMode] = useState<'register' | 'login' | 'registerComplete'>('register');
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);
    const resolver = zodResolver(mode === 'register' ? registerSchema : loginSchema);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<Partial<RegisterData & LoginData>>({
        resolver,
        mode: 'onTouched',
    });

    useEffect(() => {

        reset();
        setServerError(null);
    }, [mode, reset]);

    useEffect(() => {

        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    const onSubmit = async (data: Partial<RegisterData & LoginData>) => {
        setIsLoading(true);
        setServerError(null);
        try {
            if (mode === 'register') {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { confirmPassword, ...payload } = data as RegisterData;
                const user = await createUser(payload);
                console.log(user);
                if (user.success) {
                    setMode('registerComplete');
                    reset();

                }

            } else {
                try {
                    await loginUser(data.email!, data.password!);
                    const userProfile = await getUserProfile();
                    setUserProfile(userProfile);
                    console.log('User Profile after login:', userProfile);
                    onClose();
                } catch (error) {
                    throw new Error('Login failed');
                }

            }
        } catch (e: string | unknown) {
            setServerError((e as Error)?.message || 'Ошибка сервера');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
            <div
                className="modal-card"
                role="dialog"
                aria-modal="true"
                aria-labelledby="register-title"
                onMouseDown={(e) => e.stopPropagation()}
            >

                <button aria-label="Закрыть" className="close-button" type="button" onClick={onClose}>
                    ×
                </button>

                <div className="logo-wrap">
                    <img className="logo-main" src="/Logo.svg" alt="Logo" />
                    <img className="logo-accent" src="/маруся.svg" alt="Accent" />
                </div>

                <h2 id="register-title" className="register-title">
                    {/* {mode === 'register' ? 'Регистрация' : 'Вход'} */}
                    {mode === 'register' ? 'Регистрация' : mode === 'login' ? 'Войти' : ' Регистрация завершена!'}


                </h2>

                {mode === 'registerComplete' && (
                    <p className="register-complete-message">
                        Используйте свою электронную почту для входа
                    </p>
                )}

                <form className="register-form" onSubmit={handleSubmit(onSubmit)} noValidate>
                    {(mode === 'register' || mode === 'login') && (
                        <label className="register-label" >
                            <EmailIcon fill={errors.email ? '#FF7575' : ''} />
                            <input className={`register-input` + (errors.email ? ' register-input--error' : '')} 
                            {...register('email' as const)} 
                            placeholder="Электронная почта" 
                            />
                            
                            {errors.email && <span className="field-error">{errors.email.message}</span>}
                        </label>
                    )}
                    {mode === 'register' && (
                        <>
                        <label className="register-label" >
                            <UserIcon  fill={errors.name ? '#FF7575' : ''} />
                            <input className={
                                `register-input` + (errors.name ? ' register-input--error' : '')    
                            } {...register('name' as const)} placeholder="Имя" />
                            {errors.name && <span className="field-error">{errors.name.message}</span>}
                        </label>

                        <label className="register-label" >
                            <UserIcon fill={errors.surname ? '#FF7575' : ''} />
                            <input className={
                                `register-input` + (errors.surname ? ' register-input--error' : '')
                            } {...register('surname' as const)} placeholder="Фамилия" />
                            {errors.surname && <span className="field-error">{errors.surname.message}</span>}
                        </label>
                        </>
                    )}
                    {(mode === 'register' || mode === 'login') && (
                        <label className="register-label" >
                            <LockIcon fill={errors.password ? '#FF7575' : ''} />
                            <input className={
                                `register-input` + (errors.password ? ' register-input--error' : '')
                            } {...register('password' as const)} type="password" placeholder="Пароль" />
                            {errors.password && <span className="field-error">{errors.password.message}</span>}
                        </label>
                    )}

                    {mode === 'register' && (
                        <label className="register-label" >
                            <LockIcon fill={errors.confirmPassword ? '#FF7575' : ''} />
                            <input className={
                                `register-input` + (errors.confirmPassword ? ' register-input--error' : '')
                            } {...register('confirmPassword' as const)} type="password" placeholder="Подтвердите пароль" />
                            {errors.confirmPassword && <span className="field-error">{errors.confirmPassword.message}</span>}
                        </label>
                    )}

                    <button className="register-button" type="submit" disabled={isLoading} onClick={(e) => {
                        if (mode === 'registerComplete') {
                            e.preventDefault();
                            setMode('login');
                        }
                    }}>
                        {isLoading ? 'Загрузка...' : (mode === 'register' ? 'Создать аккаунт' : 'Войти')}
                    </button>

                    {serverError && <div className="error-message">{serverError}</div>}
                    {mode !== 'registerComplete' && (
                        <button
                            type="button"
                            className="toLogin-button"
                            onClick={() => setMode((m) => (m === 'register' ? 'login' : 'register'))}
                        >
                            {mode === 'register' ? 'У меня есть пароль' : 'Создать аккаунт'}
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};