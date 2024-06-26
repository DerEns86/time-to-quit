package dev.ens.backend.security;

import dev.ens.backend.model.AppUser;
import dev.ens.backend.user.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.time.Instant;
import java.util.*;

import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.oidcLogin;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class AuthIntegrationTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private OAuth2User oAuth2User;

    @BeforeEach
    void setUp() {
        AppUser testUser = new AppUser("1", "123", "testAvatarUrl", "testUser", 2, List.of("test1", "test2"), Instant.parse("2024-06-20T10:15:30Z"), List.of());

        when(userRepository.findById("1")).thenReturn(Optional.of(testUser));
    }

    @Test
//    @WithMockUser
    void testGetMe() throws Exception {
        mockMvc.perform(get("/api/auth/me").with(oidcLogin().userInfoToken(token -> token
                                .claim("id", "1")
                                .claim("githubId", "123")
                                .claim("avatar_url", "testAvatarUrl")
                                .claim("username", "testUser")
                                .claim("dailySmokedCigarettes", 2)
                                .claim("mainMotivation", List.of("test1", "test2"))
                                .claim("quitDate", Instant.parse("2024-06-20T10:15:30Z"))
                                .claim("goals", List.of())
                        ))
                )
                //THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                            "id": "1",
                            "githubId": "123",
                            "avatar_url": "testAvatarUrl",
                            "username": "testUser",
                            "dailySmokedCigarettes": 2,
                            "mainMotivation": ["test1", "test2"],
                            "quitDate": "2024-06-20T10:15:30Z",
                            "goals": []
                        }
                        """));
    }

    @Test
    void testGetMe_withNotLoggedInUser_expectError() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/auth/me"))
                .andExpect(status().isUnauthorized());

    }
}