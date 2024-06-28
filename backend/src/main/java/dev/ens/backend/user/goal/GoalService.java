package dev.ens.backend.user.goal;

import dev.ens.backend.model.AppUser;
import dev.ens.backend.model.Goal;
import dev.ens.backend.model.GoalDTO;
import dev.ens.backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GoalService {
    private final UserRepository userRepository;
    private final IdService idService;

    public AppUser addGoal(String userId, Goal goal) {
        AppUser user = userRepository.findById(userId).orElseThrow();
        String newGoalId = idService.generateId();

        Goal newGoal = new Goal(
                newGoalId,
                goal.goalName(),
                goal.goalPrice(),
                Instant.now(),
                false
        );

        user.goals().add(newGoal);
        return userRepository.save(user);
    }

}
