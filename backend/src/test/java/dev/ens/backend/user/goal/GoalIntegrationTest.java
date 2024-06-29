package dev.ens.backend.user.goal;

import dev.ens.backend.model.Goal;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class GoalIntegrationTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    GoalRepository goalRepository;

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
        Goal goal = new Goal("goalId", "old goal", 50,  false, "1");
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
}