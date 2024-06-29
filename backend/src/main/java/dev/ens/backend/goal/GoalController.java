package dev.ens.backend.goal;

import dev.ens.backend.model.Goal;
import dev.ens.backend.model.GoalDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/users")
@RequiredArgsConstructor
public class GoalController {

    private final GoalService goalService;

    @GetMapping("/{userId}/goals")
    public List<Goal> getGoals(@PathVariable String userId) {
        return goalService.getGoals(userId);
    }

    @PostMapping("/{userId}/goals")
    public Goal addGoal(@PathVariable String userId, @RequestBody Goal goal) {
        return goalService.addGoal(userId, goal);
    }

    @PutMapping("/{userId}/{goalId}")
    public Goal updateGoal(@PathVariable String userId, @PathVariable String goalId, @RequestBody GoalDTO goalDTO) {
        return goalService.updateGoal(userId, goalId, goalDTO);
    }

    @DeleteMapping("/{userId}/{goalId}")
    public void deleteGoal(@PathVariable String userId, @PathVariable String goalId) {
        goalService.deleteGoal(userId, goalId);
    }
}
