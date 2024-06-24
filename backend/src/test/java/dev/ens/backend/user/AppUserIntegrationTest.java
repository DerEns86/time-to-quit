package dev.ens.backend.user;

import dev.ens.backend.model.AppUser;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.time.Instant;
import java.util.List;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class AppUserIntegrationTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    UserRepository userRepository;

    @Test
    @DirtiesContext
    void getUsers_shouldReturnEmptyList_whenNoUsersPresent() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/users"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    @DirtiesContext
    void getUsers_shouldReturnListOfUsers_whenUsersPresent() throws Exception {
        Instant fixedInstant = Instant.parse("2024-06-20T10:15:30.00Z");
        AppUser appUser = new AppUser("1", "123" , "avatar_url" ,"123", 2, List.of("test1", "test2"), fixedInstant);
        userRepository.save(appUser);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/users"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
    [{
        "id": "1",
        "githubId": "123",
        "avatar_url": "avatar_url",
        "username": "123",
        "dailySmokedCigarettes": 2,
        "mainMotivation": ["test1", "test2"],
        "quitDate": "2024-06-20T10:15:30Z"
                            }]
    """));
    }

    @Test
    @DirtiesContext
    void getUserById_shouldReturnUser_whenUserExist() throws Exception {
        Instant fixedInstant = Instant.parse("2024-06-20T10:15:30.00Z");
        AppUser appUser = new AppUser("1", "123",  "avatar_url" ,"123",2 ,List.of("test1", "test2"),  fixedInstant);
        userRepository.save(appUser);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/users/" + appUser.id()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
    {
        "id": "1",
        "githubId": "123",
        "avatar_url": "avatar_url",
        "username": "123",
        "dailySmokedCigarettes": 2,
        "mainMotivation": ["test1", "test2"],
        "quitDate": "2024-06-20T10:15:30Z"
    }
    """));
    }

    @Test
    @DirtiesContext
    void getUserById_shouldReturnNotFound_whenInvalidIdProvided() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/users/1"))
                .andExpect(status().isNotFound());
    }
}