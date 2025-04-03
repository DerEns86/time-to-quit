package dev.ens.backend.goal;

import dev.ens.backend.model.Goal;
import dev.ens.backend.model.GoalDTO;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/users")
@RequiredArgsConstructor
public class GoalController {

    private final GoalService goalService;

    @Operation(summary = "Get user goals", description = "Retrieve a list of goals for a specific user")
    @GetMapping("/{userId}/goals")
    public List<Goal> getGoals(@PathVariable String userId) {
        return goalService.getGoals(userId);
    }

    @Operation(summary = "Add a new goal", description = "Add a new goal for a specific user")
    @PostMapping("/{userId}/goals")
    public Goal addGoal(@PathVariable String userId, @RequestBody Goal goal) {
        return goalService.addGoal(userId, goal);
    }

    @Operation(summary = "Update a goal", description = "Update an existing goal for a specific user")
    @PutMapping("/{userId}/{goalId}")
    public Goal updateGoal(@PathVariable String userId, @PathVariable String goalId, @RequestBody GoalDTO goalDTO) {
        return goalService.updateGoal(userId, goalId, goalDTO);
    }

    @Operation(summary = "Delete a goal", description = "Delete an existing goal for a specific user")
    @DeleteMapping("/{userId}/{goalId}")
    public void deleteGoal(@PathVariable String userId, @PathVariable String goalId) {
        goalService.deleteGoal(userId, goalId);
    }
}
