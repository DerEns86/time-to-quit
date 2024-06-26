package dev.ens.backend.user;

import dev.ens.backend.exceptions.NoSuchUserException;
import dev.ens.backend.model.AppUser;
import org.junit.jupiter.api.Test;


import java.time.Instant;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AppUserServiceTest {

    UserRepository userRepository = mock(UserRepository.class);
    UserService userService = new UserService(userRepository);

    @Test
    void getUsers_shouldReturnEmptyList_whenCalledInitially() {
        //GIVEN
        List<AppUser> expected = List.of();
        when(userRepository.findAll()).thenReturn(List.of());
        //WHEN
        List<AppUser> actual = userService.getUsers();
        //THEN
        assertEquals(expected, actual);
        verify(userRepository).findAll();
    }

    @Test
    void getUsers_shouldReturnListOfUsers_whenCalled() {
        //GIVEN
        Instant fixedInstant = Instant.parse("2024-06-20T10:15:30.00Z");
        List<AppUser> expected = List.of(new AppUser("1", "123", "avatar_url" ,"username", 2 ,List.of("test1", "test2"),  fixedInstant, List.of()));
        when(userRepository.findAll()).thenReturn(List.of(new AppUser("1", "123","avatar_url" , "username", 2 ,List.of("test1", "test2"),  fixedInstant, List.of())));
        //WHEN
        List<AppUser> actual = userService.getUsers();
        //THEN
        assertEquals(expected, actual);
        verify(userRepository).findAll();
    }

    @Test
    void getUserById_shouldReturnUser_whenUserExists() {
        //GIVEN
        Instant fixedInstant = Instant.parse("2024-06-20T10:15:30.00Z");
        AppUser expected = new AppUser("1", "123", "avatar_url" ,"username", 2 ,List.of("test1", "test2"),  fixedInstant, List.of());
        when(userRepository.findById("1")).thenReturn(Optional.of(expected));
        //WHEN
        AppUser actual = userService.getUserById("1");
        //THEN
        assertEquals(expected, actual);
        verify(userRepository).findById("1");
    }

    @Test
    void getUserById_shouldThrowNoSuchUserException_whenUserDoesNotExist() {
        //GIVEN
        when(userRepository.findById("1")).thenReturn(Optional.empty());
        //WHEN
        Exception exception = assertThrows(NoSuchUserException.class, () -> userService.getUserById("1"));
        //THEN
        assertEquals("No user found with id: 1", exception.getMessage());
        verify(userRepository).findById("1");
    }

}