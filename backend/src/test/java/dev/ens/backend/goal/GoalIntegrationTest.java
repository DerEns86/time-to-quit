package dev.ens.backend.goal;

import dev.ens.backend.model.AppUser;
import dev.ens.backend.model.Goal;
import dev.ens.backend.user.UserRepository;
import org.junit.jupiter.api.BeforeEach;
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

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class GoalIntegrationTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    GoalRepository goalRepository;

    @Autowired
    UserRepository userRepository;


    @BeforeEach
    void setUp() {
        AppUser testAppUser = new AppUser("1",
                "123",
                "avatar_url",
                "username",
                2,
                List.of("test1", "test2"),
                Instant.parse("2024-06-20T10:15:30.00Z"),
                List.of());
        userRepository.save(testAppUser);
    }

    @Test
    void getGoals_shouldReturnListOfGoals_whenCalledWithValidUserId() throws Exception {
        Goal goal1 = new Goal("goalId1", "goal1", 100, false, "1");
        Goal goal2 = new Goal("goalId2", "goal2", 200, false, "1");
        goalRepository.saveAll(List.of(goal1, goal2));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/users/1/goals")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                    [
                        {
                            "goalId": "goalId1",
                            "goalName": "goal1",
                            "goalPrice": 100,
                            "isCompleted": false,
                            "appUserId": "1"
                        },
                        {
                            "goalId": "goalId2",
                            "goalName": "goal2",
                            "goalPrice": 200,
                            "isCompleted": false,
                            "appUserId": "1"
                        }
                    ]
                    """));
    }

    @Test
    @DirtiesContext
    void addGoal_shouldAddGoal_whenCalledWithValidGoal() throws Exception {
        String goalJson = """
                {
                    "goalName": "new goal",
                    "goalPrice": 100,
                    "isCompleted": false,
                    "appUserId": "1"
                }
                """;

        mockMvc.perform(MockMvcRequestBuilders.post("/api/users/1/goals")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(goalJson))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                            "goalName": "new goal",
                            "goalPrice": 100,
                            "isCompleted": false,
                            "appUserId": "1"
                        }
                        """));
    }

    @Test
    @DirtiesContext
    void updateGoal_shouldUpdateGoal_whenCalledWithValidGoalIdAndGoalDTO() throws Exception {
        Goal goal = new Goal("goalId", "old goal", 50, false, "1");
        goalRepository.save(goal);

        String goalDTOJson = """
                {
                    "goalName": "updated goal",
                    "goalPrice": 150,
                    "isCompleted": false,
                    "appUserId": "1"
                }
                """;

        mockMvc.perform(MockMvcRequestBuilders.put("/api/users/1/" + goal.goalId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(goalDTOJson))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                            "goalId": "goalId",
                            "goalName": "updated goal",
                            "goalPrice": 150,
                            "isCompleted": false,
                            "appUserId": "1"
                        }
                        """));
    }

    @Test
    @DirtiesContext
    void deleteGoal_shouldDeleteGoal_whenCalledWithValidUserIdAndGoalId() throws Exception {
        Goal goal = new Goal("goalId", "goal", 100, false, "1");
        goalRepository.save(goal);

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/users/1/" + goal.goalId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        assertFalse(goalRepository.findById("goalId").isPresent());
    }
}