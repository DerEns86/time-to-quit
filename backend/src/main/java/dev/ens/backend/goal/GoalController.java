package dev.ens.backend.goal;

import dev.ens.backend.model.Goal;
import dev.ens.backend.model.GoalDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/users")
@RequiredArgsConstructor
public class GoalController {

    private final GoalService goalService;

    @Operation(summary = "Get user goals", description = "Retrieve a list of goals for a specific user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved goals"),
            @ApiResponse(responseCode = "404", description = "User not found")
    })
    @GetMapping("/{userId}/goals")
    public List<Goal> getGoals(@PathVariable String userId) {
        return goalService.getGoals(userId);
    }

    @Operation(summary = "Add a new goal", description = "Add a new goal for a specific user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Successfully added goal"),
            @ApiResponse(responseCode = "404", description = "User not found")
    })
    @PostMapping("/{userId}/goals")
    public Goal addGoal(@PathVariable String userId, @RequestBody Goal goal) {
        return goalService.addGoal(userId, goal);
    }

    @Operation(summary = "Update a goal", description = "Update an existing goal for a specific user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully updated goal"),
            @ApiResponse(responseCode = "404", description = "Goal or user not found")
    })
    @PutMapping("/{userId}/{goalId}")
    public Goal updateGoal(@PathVariable String userId, @PathVariable String goalId, @RequestBody GoalDTO goalDTO) {
        return goalService.updateGoal(userId, goalId, goalDTO);
    }

    @Operation(summary = "Delete a goal", description = "Delete an existing goal for a specific user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Successfully deleted goal"),
            @ApiResponse(responseCode = "404", description = "Goal or user not found")
    })
    @DeleteMapping("/{userId}/{goalId}")
    public void deleteGoal(@PathVariable String userId, @PathVariable String goalId) {
        goalService.deleteGoal(userId, goalId);
    }
}
