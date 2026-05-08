package hotelqd.org.hotelqd.ztest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Test {

    @GetMapping("/testing")
    public String test() {
        return "funciona";
    }
}