package dev.ens.backend.user;

import dev.ens.backend.model.AppUser;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;


    @GetMapping
    public List<AppUser> getUsers() {
        return userService.getUsers();
    }

    @GetMapping("/{id}")
    public AppUser getUserById(@PathVariable String id) {
        return userService.getUserById(id);
    }

}
