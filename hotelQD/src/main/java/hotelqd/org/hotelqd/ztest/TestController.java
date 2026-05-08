package hotelqd.org.hotelqd.ztest;

import hotelqd.org.hotelqd.model.User;
import hotelqd.org.hotelqd.repository.UserRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/test")
public class TestController {

    private final UserRepository repository;

    public TestController(UserRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<User> test() {
        return repository.findAll();
    }
}