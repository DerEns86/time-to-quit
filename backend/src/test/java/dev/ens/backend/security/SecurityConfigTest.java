package dev.ens.backend.security;

import dev.ens.backend.user.UserService;
import dev.ens.backend.user.UserRepository;
import dev.ens.backend.model.AppUser;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.time.Instant;
import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.mock;

@SpringBootTest
class SecurityConfigTest {

    @Mock
    private UserRepository mockUserRepository;

    @Mock
    private UserService mockUserService;

    @InjectMocks
    private SecurityConfig securityConfig;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testOAuth2UserService() {
        // Mock OAuth2User data
        Map<String, Object> attributes = createOAuth2UserAttributes();

        OAuth2User mockOAuth2User = new DefaultOAuth2User(
                Collections.singleton(() -> "ROLE_USER"),
                attributes,
                "id"
        );

        // Mock AppUser data
        AppUser mockAppUser = new AppUser("mockId", "mockGithubId", "http://mockavatar.url", "mockUsername", 0, List.of(), Instant.now(), List.of());

        // Mock UserRepository behavior
        when(mockUserRepository.findById("mockId")).thenReturn(Optional.of(mockAppUser)); // Simulating user found

        // Mock UserService behavior
        when(mockUserService.saveNewAppUser(any(OAuth2User.class))).thenReturn(mockAppUser);

        // Create a ClientRegistration
        ClientRegistration clientRegistration = ClientRegistration
                .withRegistrationId("github")
                .clientId("client-id")
                .clientSecret("client-secret")
                .redirectUri("redirect-uri")
                .scope("read:user")
                .authorizationUri("https://github.com/login/oauth/authorize")
                .tokenUri("https://github.com/login/oauth/access_token")
                .userInfoUri("https://api.github.com/user")
                .userNameAttributeName("id")
                .clientName("GitHub")
                .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
                .build();

        OAuth2AccessToken accessToken = new OAuth2AccessToken(OAuth2AccessToken.TokenType.BEARER, "mock-token", Instant.now(), Instant.now().plusSeconds(3600));

        // Create an OAuth2UserRequest with the ClientRegistration
        OAuth2UserRequest userRequest = new OAuth2UserRequest(clientRegistration, accessToken);

        // Mock OAuth2UserService
        OAuth2UserService<OAuth2UserRequest, OAuth2User> mockOAuth2UserService = mock(OAuth2UserService.class);
        when(mockOAuth2UserService.loadUser(any(OAuth2UserRequest.class))).thenReturn(mockOAuth2User);

        // Create an instance of SecurityConfig and override the oAuth2UserService method
        SecurityConfig securityConfigWithMockedService = new SecurityConfig(mockUserService) {
            @Override
            public OAuth2UserService<OAuth2UserRequest, OAuth2User> oAuth2UserService() {
                return mockOAuth2UserService;
            }
        };

        // Call your method under test
        OAuth2User resultUser = securityConfigWithMockedService.oAuth2UserService().loadUser(userRequest);

        // Assertions or further verifications
        assertNotNull(resultUser);
        assertEquals("mockId", resultUser.getAttribute("id"));
    }

    private Map<String, Object> createOAuth2UserAttributes() {
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("id", "mockId");
        attributes.put("githubId", "mockGithubId");
        attributes.put("avatar_url", "http://mockavatar.url");
        attributes.put("username", "mockUsername");
        attributes.put("dailySmokedCigarettes", 0);
        attributes.put("mainMotivation", Collections.emptyList());
        attributes.put("quitDate", Instant.now());
        attributes.put("goals", Collections.emptyList());
        return attributes;
    }
}
