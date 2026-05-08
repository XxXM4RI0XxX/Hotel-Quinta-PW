package hotelqd.org.hotelqd.service;

import hotelqd.org.hotelqd.model.User;
import hotelqd.org.hotelqd.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    // =======================
    // CREAR USUARIO
    // =======================
    public User guardar(User user) throws Exception {
        if (repository.existsByUsername(user.getUsername())) {
            throw new Exception("El username ya existe");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if (user.getRol() == null || user.getRol().isEmpty()) {
            user.setRol("ROLE_USER");
        }
        return repository.save(user);
    }

    // =======================
    // LISTAR USUARIOS
    // =======================
    public List<User> listar() {
        return repository.findAll();
    }

    // =======================
    // ACTUALIZAR USUARIO
    // =======================
    public User actualizar(Long id, User userActualizado) throws Exception {
        Optional<User> optional = repository.findById(id);
        if (!optional.isPresent()) {
            throw new Exception("User no encontrado");
        }

        User user = optional.get();
        user.setUsername(userActualizado.getUsername());
        if (userActualizado.getPassword() != null && !userActualizado.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(userActualizado.getPassword()));
        }
        if (userActualizado.getRol() != null && !userActualizado.getRol().isEmpty()) {
            user.setRol(userActualizado.getRol());
        }
        return repository.save(user);
    }

    // =======================
    // ELIMINAR USUARIO
    // =======================
    public void eliminar(Long id) throws Exception {
        if (!repository.existsById(id)) {
            throw new Exception("User no encontrado");
        }
        repository.deleteById(id);
    }

    // =======================
    // VERIFICAR EXISTENCIA
    // =======================
    public boolean existeUser(String username) {
        return repository.existsByUsername(username);
    }

}
