package dev.ens.backend.security;


import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {


    @GetMapping("/me")
    public Map<String, Object> getMe(@AuthenticationPrincipal OAuth2User user) {
        Map<String, Object> attributes = user.getAttributes();
        String login = attributes.get("login").toString();
        String name = attributes.get("name").toString();

        return attributes;
    }
}
