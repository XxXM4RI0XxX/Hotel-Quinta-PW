import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import apiService from '../services/api';
import { useDebounce } from '../hooks/useDebounce';

const registroSchema = z.object({

    // Se definen las validaciones para cada campo usando Zod
    usuario: z.string().min(3, 'Nombre de usuario mínimo 3 caracteres'),
    nombre: z.string().min(2, 'Nombre mínimo 2 caracteres'),
    apellidos: z.string().min(2, 'Apellidos mínimo 2 caracteres'),
    correo: z.string().email('Ingresa un correo válido'),
    password: z.string()
        .min(8, 'La contraseña debe tener mínimo 8 caracteres')
        .regex(/(?=.*\d)/, 'Debe contener al menos un número')
        .regex(/(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/, 'Debe contener al menos un signo común')
        .regex(/^\S+$/, 'No puede contener espacios'),
    telefono: z.string()
        .min(8, 'Número de teléfono inválido')
        .regex(/^[0-9+\s()-]+$/, 'Solo números, espacios o símbolos + - ( )'),
    promociones: z.boolean(),
});

// Funciones de validación en tiempo real
const validateEmail = (email) => {
    if (!email) return { valid: false, message: '' };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { valid: false, message: 'Formato de correo inválido' };
    }

    return { valid: true, message: 'Formato de correo válido' };
};

const validatePassword = (password) => {
    if (!password) return { valid: false, message: '', requirements: [] };

    const requirements = [
        { test: password.length >= 8, message: 'Mínimo 8 caracteres' },
        { test: /\d/.test(password), message: 'Al menos un número' },
        { test: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password), message: 'Al menos un signo especial' },
        { test: /^\S+$/.test(password), message: 'Sin espacios' }
    ];

    const failedRequirements = requirements.filter(req => !req.test);
    const allValid = failedRequirements.length === 0;

    return {
        valid: allValid,
        message: allValid ? 'Contraseña segura' : `${failedRequirements.length} requisito(s) pendiente(s)`,
        requirements: requirements.map(req => ({
            ...req,
            status: req.test ? 'valid' : 'invalid'
        }))
    };
};

// Función personalizada para integrar Zod con React Hook Form
const zodResolver = async (values) => {
    const result = registroSchema.safeParse(values);

    if (result.success) {
        return { values: result.data, errors: {} };
    }

    const fieldErrors = result.error.flatten().fieldErrors;
    const errors = Object.fromEntries(
        Object.entries(fieldErrors).map(([key, messages]) => [
            key,
            {
                type: 'validation',
                message: messages?.[0] ?? 'Valor inválido',
            },
        ])
    );

    return { values: {}, errors };
};

function Registro({ setPagina }) {
    const [submittedData, setSubmittedData] = useState(null);

    // Estados para verificaciones AJAX
    const [usernameCheck, setUsernameCheck] = useState({ loading: false, available: null, message: '' });
    const [emailCheck, setEmailCheck] = useState({ loading: false, available: null, message: '' });

    // Estados para validación en tiempo real
    const [emailValidation, setEmailValidation] = useState({ valid: false, message: '' });
    const [passwordValidation, setPasswordValidation] = useState({ valid: false, message: '', requirements: [] });

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm({
        defaultValues: {
            usuario: '',
            nombre: '',
            apellidos: '',
            correo: '',
            password: '',
            telefono: '',
            promociones: false,
        },
        resolver: zodResolver,
    });

    // Valores de los campos para debounce
    const watchedUsername = watch('usuario');
    const watchedEmail = watch('correo');
    const watchedPassword = watch('password');

    // Debounce para username (500ms)
    const debouncedUsername = useDebounce(watchedUsername, 500);

    // Debounce para email (500ms)
    const debouncedEmail = useDebounce(watchedEmail, 500);

    // Debounce para password (300ms - más rápido para feedback inmediato)
    const debouncedPassword = useDebounce(watchedPassword, 300);

    // Verificación AJAX para username
    useEffect(() => {
        const checkUsername = async () => {
            if (!debouncedUsername || debouncedUsername.length < 3) {
                setUsernameCheck({ loading: false, available: null, message: '' });
                return;
            }

            setUsernameCheck({ loading: true, available: null, message: '' });

            try {
                const result = await apiService.verificarUsername(debouncedUsername);
                setUsernameCheck({ loading: false, available: result.available, message: result.message });
            } catch (error) {
                setUsernameCheck({ loading: false, available: false, message: 'Error al verificar' });
            }
        };

        checkUsername();
    }, [debouncedUsername]);

    // Verificación AJAX para email
    useEffect(() => {
        const checkEmail = async () => {
            if (!debouncedEmail || !debouncedEmail.includes('@')) {
                setEmailCheck({ loading: false, available: null, message: '' });
                return;
            }

            setEmailCheck({ loading: true, available: null, message: '' });

            try {
                const result = await apiService.verificarEmail(debouncedEmail);
                setEmailCheck({ loading: false, available: result.available, message: result.message });
            } catch (error) {
                setEmailCheck({ loading: false, available: false, message: 'Error al verificar' });
            }
        };

        checkEmail();
    }, [debouncedEmail]);

    // Validación en tiempo real para email (sin debounce para feedback inmediato)
    useEffect(() => {
        const validation = validateEmail(watchedEmail);
        setEmailValidation(validation);
    }, [watchedEmail]);

    // Validación en tiempo real para password
    useEffect(() => {
        const validation = validatePassword(debouncedPassword);
        setPasswordValidation(validation);
    }, [debouncedPassword]);

    const onSubmit = async (data) => {
        try {
            // Se mapean/traducen los datos de React al formato que espera Java
            const userData = {
                username: data.usuario,
                name: data.nombre,
                last_name: data.apellidos,
                mail: data.correo,
                password: data.password,
                phone: data.telefono,
                promotions: data.promociones,
                rol: 'ROLE_USER'
            };

            const respuesta = await apiService.registrarUsuario(userData);

            console.log("Usuario creado en Supabase:", respuesta);
            setSubmittedData(data);
            reset();
            alert('Registro exitoso. Ahora puedes iniciar sesión.');
            setPagina('login');

        } catch (error) {
            // Si el backend rechaza la petición (ej. el usuario ya existe)
            console.error("Error al registrar:", error);
            alert("Error al registrar: " + error.message);
        }
    };

    return (
        <div className="Form registro-form" style={{ marginTop: '50px', marginBottom: '60px', maxWidth: '800px', marginInline: 'auto', padding: '0 20px' }}>
            <h2>Crear nuevo usuario</h2>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>

                <label htmlFor="nombre">Nombre</label>
                <input id="nombre" type="text" {...register('nombre')} />
                {errors.nombre && <p className="error">{errors.nombre.message}</p>}

                <label htmlFor="apellidos">Apellidos</label>
                <input id="apellidos" type="text" {...register('apellidos')} />
                {errors.apellidos && <p className="error">{errors.apellidos.message}</p>}

                <label htmlFor="usuario">Nombre de usuario</label>
                <input id="usuario" type="text" {...register('usuario')} />
                {errors.usuario && <p className="error">{errors.usuario.message}</p>}
                {usernameCheck.loading && <p className="checking">Verificando...</p>}
                {usernameCheck.message && !usernameCheck.loading && (
                    <p className={usernameCheck.available ? "success" : "error"}>
                        {usernameCheck.message}
                    </p>
                )}

                <label htmlFor="correo">Correo</label>
                <input id="correo" type="email" {...register('correo')} />
                {errors.correo && <p className="error">{errors.correo.message}</p>}
                {emailValidation.message && !errors.correo && (
                    <p className={emailValidation.valid ? "success" : "error"}>
                        {emailValidation.message}
                    </p>
                )}
                {emailCheck.loading && <p className="checking">Verificando disponibilidad...</p>}
                {emailCheck.message && !emailCheck.loading && (
                    <p className={emailCheck.available ? "success" : "error"}>
                        {emailCheck.message}
                    </p>
                )}

                <label htmlFor="password">Contraseña</label>
                <input id="password" type="password" {...register('password')} />
                {errors.password && <p className="error">{errors.password.message}</p>}
                {passwordValidation.message && !errors.password && watchedPassword && (
                    <p className={passwordValidation.valid ? "success" : "warning"}>
                        {passwordValidation.message}
                    </p>
                )}
                {watchedPassword && passwordValidation.requirements.length > 0 && (
                    <div className="password-requirements">
                        {passwordValidation.requirements.map((req, index) => (
                            <p key={index} className={`requirement ${req.status}`}>
                                {req.status === 'valid' ? '✓' : '✗'} {req.message}
                            </p>
                        ))}
                    </div>
                )}

                <label htmlFor="telefono">Número de teléfono</label>
                <input id="telefono" type="tel" {...register('telefono')} />
                {errors.telefono && <p className="error">{errors.telefono.message}</p>}

                <label className="checkbox-label">
                    <input type="checkbox" {...register('promociones')} />
                    Quiero recibir promociones por correo
                </label>

                <button type="submit" className="btn-primario" disabled={isSubmitting}>
                    {isSubmitting ? 'Registrando...' : 'Crear cuenta'}
                </button>
            </form>

            {isSubmitSuccessful && submittedData && (
                <div className="success-message">
                    <h3>Usuario registrado</h3>
                    <p>Nombre: {submittedData.nombre} {submittedData.apellidos}</p>
                    <p>Correo: {submittedData.correo}</p>
                    <p>Teléfono: {submittedData.telefono}</p>
                    <p>{submittedData.promociones ? 'Aceptó recibir promociones.' : 'No aceptó promociones.'}</p>
                </div>
            )}
        </div>
    );
}

export default Registro;
