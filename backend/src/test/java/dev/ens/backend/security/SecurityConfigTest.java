package dev.ens.backend.security;

import dev.ens.backend.user.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

@SpringBootTest
public class SecurityConfigTest {
    @Mock
    private DefaultOAuth2UserService mockUserService;

    @Mock
    private UserRepository mockUserRepository;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testOAuth2UserService() {
        // Mock OAuth2User data
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("id", "mockId");
        attributes.put("name", "mockName");
        attributes.put("avatar_url", "http://mockavatar.url");

        OAuth2User mockOAuth2User = new DefaultOAuth2User(
                Collections.singleton(() -> "ROLE_USER"),
                attributes,
                "id"
        );

        // Mock UserRepository behavior
        when(mockUserRepository.findById("mockId")).thenReturn(java.util.Optional.empty()); // Simulating user not found

        // Mock OAuth2UserRequest
        OAuth2UserRequest mockUserRequest = mock(OAuth2UserRequest.class);
        when(mockUserService.loadUser(mockUserRequest)).thenReturn(mockOAuth2User);

        // Create an instance of SecurityConfig
        SecurityConfig securityConfig = new SecurityConfig(mockUserRepository);

        // Call your method under test
        OAuth2User resultUser = securityConfig.oAuth2UserService(mockUserService).loadUser(mockUserRequest);

        // Assertions or further verifications
        assertNotNull(resultUser);
        assertEquals("mockId", resultUser.getAttribute("id"));
        // Add more assertions based on your expected behavior
    }
}
