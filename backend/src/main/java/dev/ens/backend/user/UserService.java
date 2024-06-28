package dev.ens.backend.user;

import dev.ens.backend.exceptions.NoSuchUserException;
import dev.ens.backend.model.AppUser;
import dev.ens.backend.model.AppUserDTO;
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
        String id = oAuth2User.getAttributes().get("id") != null ? oAuth2User.getAttributes().get("id").toString() : null;
        String avatar_url = oAuth2User.getAttributes().get("avatar_url") != null ? oAuth2User.getAttributes().get("avatar_url").toString() : null;
        String username = oAuth2User.getAttributes().get("name") != null ? oAuth2User.getAttributes().get("name").toString() : null;
        AppUser newUser = new AppUser(id,
                oAuth2User.getName(),
                avatar_url,
                username,
                0,
                Collections.emptyList(),
                null,
                Collections.emptyList()
        );

        return userRepository.save(newUser);
    }

    public AppUser updateUser(String id, AppUserDTO updatedUser) {
        AppUser user = userRepository.findById(id)
                .orElseThrow(() -> new NoSuchUserException("No user found with id: " + id));

        AppUser appUserToUpdate = new AppUser(user.id(),
                user.githubId(),
                user.avatar_url(),
                user.username(),
                updatedUser.dailySmokedCigarettes(),
                updatedUser.mainMotivation(),
                updatedUser.quitDate(),
                updatedUser.goals()
        );
        return userRepository.save(appUserToUpdate);
    }


}
