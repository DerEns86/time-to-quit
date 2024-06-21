package dev.ens.backend.user;

import dev.ens.backend.exceptions.NoSuchUserException;
import dev.ens.backend.model.AppUser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    public final UserRepository userRepository;

    public List<AppUser> getUsers() {
        return userRepository.findAll();
    }

    public AppUser getUserById(String id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new NoSuchUserException("No user found with id: " + id));
    }

}
