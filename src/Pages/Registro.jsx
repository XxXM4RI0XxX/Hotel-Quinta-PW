import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const registroSchema = z.object({
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

    const {
        register,
        handleSubmit,
        reset,
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

    const onSubmit = (data) => {
        setSubmittedData(data);
        reset();
    };

    return (
        <div className="Form registro-form">
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


                <label htmlFor="correo">Correo</label>
                <input id="correo" type="email" {...register('correo')} />
                {errors.correo && <p className="error">{errors.correo.message}</p>}

                <label htmlFor="password">Contraseña</label>
                <input id="password" type="password" {...register('password')} />
                {errors.password && <p className="error">{errors.password.message}</p>}

                <label htmlFor="telefono">Número de teléfono</label>
                <input id="telefono" type="tel" {...register('telefono')} />
                {errors.telefono && <p className="error">{errors.telefono.message}</p>}

                <label className="checkbox-label">
                    <input type="checkbox" {...register('promociones')} />
                    Quiero recibir promociones por correo
                </label>

                <button type="submit" disabled={isSubmitting}>
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
