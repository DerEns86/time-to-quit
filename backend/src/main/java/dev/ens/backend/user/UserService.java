package dev.ens.backend.user;

import dev.ens.backend.exceptions.NoSuchUserException;
import dev.ens.backend.model.AppUser;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;
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

    public AppUser saveNewAppUser(OAuth2User oAuth2User){
        AppUser newUser = new AppUser(oAuth2User.getAttributes().get("id").toString(),
                oAuth2User.getName(),
                oAuth2User.getAttributes().get("avatar_url").toString(),
                oAuth2User.getAttributes().get("name").toString(),
                0,
                Collections.emptyList(),
                null,
                Collections.emptyList()
        );

        return userRepository.save(newUser);
    }

}
