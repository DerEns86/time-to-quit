package dev.ens.backend.user.goal;

import dev.ens.backend.model.AppUser;
import dev.ens.backend.model.Goal;
import dev.ens.backend.user.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.time.Instant;
import java.util.List;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class GoalIntegrationTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    UserRepository userRepository;

    @Autowired
    GoalService goalService;

    @Test
    @DirtiesContext
    void addGoal_shouldAddGoalToUser_whenCalledWithValidUserIdAndGoal() throws Exception {
        // Given
        Instant fixedInstant = Instant.parse("2024-06-20T10:15:30.00Z");
        AppUser user = new AppUser("1", "123", "avatar_url", "username", 2, List.of("test1", "test2"), fixedInstant, List.of());
        userRepository.save(user);

        String goalJson = """
                {
                    "goalName": "new goal",
                    "goalPrice": 100
                }
                """;

        // When & Then
        mockMvc.perform(MockMvcRequestBuilders.post("/api/users/1/goals")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(goalJson))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                            "id": "1",
                            "githubId": "123",
                            "avatar_url": "avatar_url",
                            "username": "username",
                            "dailySmokedCigarettes": 2,
                            "mainMotivation": ["test1", "test2"],
                            "quitDate": "2024-06-20T10:15:30Z",
                            "goals": [{
                                "goalName": "new goal",
                                "goalPrice": 100
                            }]
                        }
                        """));
    }

    @Test
    @DirtiesContext
    void updateGoal_shouldUpdateGoalOfUser_whenCalledWithValidUserIdAndGoalDTO() throws Exception {
        // Given
        Instant fixedInstant = Instant.parse("2024-06-20T10:15:30.00Z");
        Goal goal = new Goal("goalId", "old goal", 50, fixedInstant, false);
        AppUser user = new AppUser("1", "123", "avatar_url", "username", 2, List.of("test1", "test2"), fixedInstant, List.of(goal));
        userRepository.save(user);

        String goalDTOJson = """
                {
                    "goalName": "updated goal",
                    "goalPrice": 150
                }
                """;

        // When & Then
        mockMvc.perform(MockMvcRequestBuilders.put("/api/users/1/goalId")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(goalDTOJson))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                            "id": "1",
                            "githubId": "123",
                            "avatar_url": "avatar_url",
                            "username": "username",
                            "dailySmokedCigarettes": 2,
                            "mainMotivation": ["test1", "test2"],
                            "quitDate": "2024-06-20T10:15:30Z",
                            "goals": [{
                                "goalId": "goalId",
                                "goalName": "updated goal",
                                "goalPrice": 150,
                                "createAt": "2024-06-20T10:15:30Z",
                                "isCompleted": false
                            }]
                        }
                        """));
    }
}
