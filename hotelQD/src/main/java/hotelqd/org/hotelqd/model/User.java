package hotelqd.org.hotelqd.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id") // Le decimos a Java que en SQL se llama user_id
    private Integer id; // En Java usamos camelCase y objetos (Integer en vez de int)

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String name;

    @Column(name = "last_name", nullable = false) // Le decimos a Java que en SQL se llama last_name
    private String lastName; // En Java usamos camelCase (lastName)

    @Column(nullable = false)
    private String mail;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private boolean promotions;

    private String rol;

    // GETTERS
    public Integer getId() { return id; }
    public String getUsername() { return username; }
    public String getName() { return name; }
    public String getLastName() { return lastName; }
    public String getMail() { return mail; }
    public String getPassword() { return password; }
    public String getPhone() { return phone; }
    public boolean isPromotions() { return promotions; }
    public String getRol() { return rol; }

    // SETTERS
    public void setId(Integer id) { this.id = id; }
    public void setUsername(String username) { this.username = username; }
    public void setName(String name) { this.name = name; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public void setMail(String mail) { this.mail = mail; }
    public void setPassword(String password) { this.password = password; }
    public void setPhone(String phone) { this.phone = phone; }
    public void setPromotions(boolean promotions) { this.promotions = promotions; }
    
    // Corrección del bug de VS Code
    public void setRol(String rol) { 
        this.rol = rol; 
    }
}