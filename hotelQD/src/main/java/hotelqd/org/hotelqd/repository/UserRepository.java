package hotelqd.org.hotelqd.repository;

import hotelqd.org.hotelqd.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {


    Optional<User> findByUsername(String username);

    public boolean existsByUsername(String username);
}
