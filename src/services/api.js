import supabase from './supabaseClient';
import CryptoJS from 'crypto-js';

const TABLE = 'users';

const buildUserSelection = () => `user_id, username, name, last_name, mail, phone, promotions, rol`;

// Función para hashear contraseñas usando SHA-256
const hashPassword = (password) => {
    return CryptoJS.SHA256(password).toString();
};

const apiService = {
    async getNextUserId() {
        const { data, error } = await supabase
            .from(TABLE)
            .select('user_id')
            .order('user_id', { ascending: false })
            .limit(1)
            .maybeSingle();

        if (error) {
            throw new Error(error.message);
        }

        return data?.user_id ? data.user_id + 1 : 1;
    },

    // Verificación AJAX para username
    async verificarUsername(username) {
        if (!username || username.length < 3) return { available: false, message: 'Mínimo 3 caracteres' };

        const { data, error } = await supabase
            .from(TABLE)
            .select('user_id')
            .eq('username', username)
            .limit(1)
            .maybeSingle();

        if (error) {
            throw new Error(error.message);
        }

        return {
            available: !data,
            message: data ? 'Nombre de usuario ya en uso' : 'Nombre de usuario disponible'
        };
    },

    // Verificación AJAX para email
    async verificarEmail(email) {
        if (!email || !email.includes('@')) return { available: false, message: 'Correo inválido' };

        const { data, error } = await supabase
            .from(TABLE)
            .select('user_id')
            .eq('mail', email)
            .limit(1)
            .maybeSingle();

        if (error) {
            throw new Error(error.message);
        }

        return {
            available: !data,
            message: data ? 'Correo ya registrado' : 'Correo disponible'
        };
    },

    async registrarUsuario(userData) {
        const { data: existingUser, error: existingError } = await supabase
            .from(TABLE)
            .select('user_id')
            .or(`username.eq.${userData.username},mail.eq.${userData.mail}`)
            .limit(1)
            .maybeSingle();

        if (existingError) {
            throw new Error(existingError.message);
        }

        if (existingUser) {
            throw new Error('El nombre de usuario o correo ya está en uso');
        }

        const nextId = await this.getNextUserId();

        // Hashear la contraseña antes de guardar
        const hashedPassword = hashPassword(userData.password);

        const { data, error } = await supabase
            .from(TABLE)
            .insert([{
                user_id: nextId,
                ...userData,
                password: hashedPassword, // Usar contraseña hasheada
                rol: userData.rol ?? 'ROLE_USER'
            }])
            .select(buildUserSelection())
            .single();

        if (error) {
            throw new Error(error.message);
        }

        return data;
    },

    async loginUsuario({ username, password }) {
        // Hashear la contraseña para comparar con la almacenada
        const hashedPassword = hashPassword(password);

        const { data, error } = await supabase
            .from(TABLE)
            .select(buildUserSelection())
            .eq('username', username)
            .eq('password', hashedPassword)
            .single();

        if (error || !data) {
            throw new Error('Usuario o contraseña incorrectos');
        }

        return data;
    },

    async getUsuarioPorId(user_id) {
        const { data, error } = await supabase
            .from(TABLE)
            .select(buildUserSelection())
            .eq('user_id', user_id)
            .single();

        if (error) {
            throw new Error(error.message);
        }

        return data;
    },

    async actualizarUsuario(user_id, fields) {
        const updateFields = {};
        const allowed = ['username', 'name', 'last_name', 'mail', 'password', 'phone', 'promotions'];

        allowed.forEach((key) => {
            if (Object.prototype.hasOwnProperty.call(fields, key)) {
                // Hashear la contraseña si se está actualizando
                if (key === 'password' && fields[key]) {
                    updateFields[key] = hashPassword(fields[key]);
                } else {
                    updateFields[key] = fields[key];
                }
            }
        });

        const { data, error } = await supabase
            .from(TABLE)
            .update(updateFields)
            .eq('user_id', user_id)
            .select(buildUserSelection())
            .single();

        if (error) {
            throw new Error(error.message);
        }

        return data;
    },

    async listarUsuarios() {
        const { data, error } = await supabase
            .from(TABLE)
            .select(buildUserSelection())
            .order('user_id', { ascending: true });

        if (error) {
            throw new Error(error.message);
        }

        return data;
    },

    async eliminarUsuario(user_id) {
        const { error } = await supabase
            .from(TABLE)
            .delete()
            .eq('user_id', user_id);

        if (error) {
            throw new Error(error.message);
        }

        return true;
    },
};

export default apiService;
