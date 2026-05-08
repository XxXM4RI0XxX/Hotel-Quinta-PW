package hotelqd.org.hotelqd.controller;

import hotelqd.org.hotelqd.model.User;
import hotelqd.org.hotelqd.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    // =======================
    // CREAR USUARIO (ADMIN)
    // =======================
    @PostMapping
    public ResponseEntity<?> crear(@RequestBody User user) {
        try {
            if (user.getUsername() == null || user.getPassword() == null) {
                return ResponseEntity.badRequest().body("Username y password son obligatorios");
            }

            if (user.getRol() == null || user.getRol().isEmpty()) {
                user.setRol("ROLE_USER"); // rol por defecto
            }

            User userGuardado = service.guardar(user);
            return ResponseEntity.ok(userGuardado);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error al registrar user");
        }
    }

    // =======================
    // LISTAR USUARIOS (ADMIN y USER)
    // =======================
    @GetMapping
    public List<User> listar() {
        return service.listar();
    }

    // =======================
    // EDITAR USUARIO (ADMIN)
    // =======================
    @PutMapping("/{id}")
    public ResponseEntity<?> editar(@PathVariable Integer id, @RequestBody User user) {
        try {
            User u = service.actualizar(id, user);
            return ResponseEntity.ok(u);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error al actualizar user");
        }
    }

    // =======================
    // ELIMINAR USUARIO (ADMIN)
    // =======================
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Integer id) {
        try {
            service.eliminar(id);
            return ResponseEntity.ok("Usuario eliminado correctamente");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error al eliminar user");
        }
    }
    // =======================
    // INICIAR SESIÓN (Acceso)
    // =======================
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User credenciales) {
        try {
            // Mandamos a llamar la lógica que acabamos de crear en el Service
            User userAutenticado = service.login(credenciales.getUsername(), credenciales.getPassword());
            return ResponseEntity.ok(userAutenticado);
        } catch (Exception e) {
            // Si la contraseña está mal, devolvemos un Error 401 (No Autorizado)
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }
}
