package hotelqd.org.hotelqd.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int user_id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String last_name;

    @Column(nullable = false)
    private String mail;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private boolean promotions;

    private String rol;

    // GETTERS ///////////////////////////////
    public int getUser_id() {
        return user_id;
    }

    public String getUsername() {
        return username;
    }

    public String getName() {
        return name;
    }

    public String getLast_name() {
        return last_name;
    }

    public String getMail() {
        return mail;
    }

    public String getPassword() {
        return password;
    }

    public String getPhone() {
        return phone;
    }

    public boolean isPromotions() {
        return promotions;
    }

    public String getRol() {
        return rol;
    }

    //SETTERS ////////////////////////////

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setPromotions(boolean promotions) {
        this.promotions = promotions;
    }

    public void setRol(String rol_id) {
        this.rol = rol;
    }
}
