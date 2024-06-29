package dev.ens.backend.user.goal;

import dev.ens.backend.model.AppUser;
import dev.ens.backend.model.Goal;
import dev.ens.backend.model.GoalDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/users")
@RequiredArgsConstructor
public class GoalController {

    private final GoalService goalService;


    @PostMapping("/{userId}/goals")
    public AppUser addGoal(@PathVariable String userId, @RequestBody Goal goal) {
        return goalService.addGoal(userId, goal);
    }

    @PutMapping("/{userId}/{goalId}")
    public AppUser updateGoal(@PathVariable String userId, @PathVariable String goalId, @RequestBody GoalDTO goalDTO) {
        return goalService.updateGoal(userId, goalId, goalDTO);
    }
}
