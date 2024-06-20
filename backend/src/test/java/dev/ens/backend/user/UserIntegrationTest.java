package dev.ens.backend.user;

import dev.ens.backend.exceptions.NoSuchUserException;
import dev.ens.backend.model.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;


import java.time.Instant;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class UserIntegrationTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    UserRepository userRepository;

    @Test
    @DirtiesContext
    void getUsers_shouldReturnEmptyList_whenNoUsersPresent() throws Exception {
        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.get("/api/users"))
                //THEN
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    @DirtiesContext
    void getUsers_shouldReturnListOfUsers_whenUsersPresent() throws Exception {
        // GIVEN
        Instant fixedInstant = Instant.parse("2024-06-20T10:15:30.00Z");
        User user = new User("1", "TestUser", 2, List.of("test1", "test2"), fixedInstant, fixedInstant, fixedInstant);
        userRepository.save(user);

        // WHEN
        mockMvc.perform(MockMvcRequestBuilders.get("/api/users"))
                // THEN
                .andExpect(status().isOk())
                .andExpect(content().json("[{\"id\":\"1\",\"username\":\"TestUser\",\"dailySmokedCigarettes\":2,\"mainMotivation\":[\"test1\",\"test2\"],\"createAt\":\"2024-06-20T10:15:30Z\",\"updateAt\":\"2024-06-20T10:15:30Z\",\"quitDate\":\"2024-06-20T10:15:30Z\"}]"));
    }

    @Test
    @DirtiesContext
    void getUserById_shouldReturnUser_whenUserExist() throws Exception {
        // Given
        Instant fixedInstant = Instant.parse("2024-06-20T10:15:30.00Z");
        User user = new User("1", "TestUser", 2, List.of("test1", "test2"), fixedInstant, fixedInstant, fixedInstant);
        userRepository.save(user);

        // When & Then
        mockMvc.perform(MockMvcRequestBuilders.get("/api/users/" + user.id()))
                .andExpect(status().isOk())
                .andExpect(content().json("{\"id\":\"1\",\"username\":\"TestUser\",\"dailySmokedCigarettes\":2,\"mainMotivation\":[\"test1\",\"test2\"],\"createAt\":\"2024-06-20T10:15:30Z\",\"updateAt\":\"2024-06-20T10:15:30Z\",\"quitDate\":\"2024-06-20T10:15:30Z\"}"));
    }

    @Test
    @DirtiesContext
    void getUserById_shouldReturnNotFound_whenInvalidIdProvided() throws Exception {

        // WHEN
        mockMvc.perform(MockMvcRequestBuilders.get("/api/users/1"))
                // THEN
                .andExpect(status().isNotFound());

    }
}