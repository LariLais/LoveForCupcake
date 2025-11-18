package com.loveforcupcake.service;

import com.loveforcupcake.dto.AuthResponse;
import com.loveforcupcake.dto.LoginRequest;
import com.loveforcupcake.dto.RegisterRequest;
import com.loveforcupcake.model.User;
import com.loveforcupcake.util.JwtUtil;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserService userService;

    @Mock
    private JwtUtil jwtUtil;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AuthService authService;

    @Test
    void register_generatesToken_andReturnsResponse() {
        RegisterRequest req = new RegisterRequest();
        req.setEmail("u@example.com");
        req.setPassword("pass");
        req.setName("User");

        User user = new User();
        user.setId(5L);
        user.setEmail(req.getEmail());
        user.setName(req.getName());
        user.setRole(User.Role.USER);

        when(userService.createUser(anyString(), anyString(), anyString())).thenReturn(user);
        when(jwtUtil.generateToken(user.getEmail(), user.getRole().name())).thenReturn("tok-123");

        AuthResponse resp = authService.register(req);

        assertNotNull(resp);
        assertEquals("tok-123", resp.getToken());
        assertEquals(user.getEmail(), resp.getEmail());
        verify(userService).createUser(anyString(), anyString(), anyString());
        verify(jwtUtil).generateToken(user.getEmail(), user.getRole().name());
    }

    @Test
    void login_invalidPassword_throws() {
        LoginRequest req = new LoginRequest();
        req.setEmail("a@b.com");
        req.setPassword("bad");

        User user = new User();
        user.setPassword("encoded-pass");
        user.setEmail(req.getEmail());

        when(userService.findByEmail(req.getEmail())).thenReturn(Optional.of(user));
        when(passwordEncoder.matches(req.getPassword(), user.getPassword())).thenReturn(false);

        assertThrows(RuntimeException.class, () -> authService.login(req));
        verify(passwordEncoder).matches(req.getPassword(), user.getPassword());
    }

    @Test
    void login_success_returnsAuthResponse() {
        LoginRequest req = new LoginRequest();
        req.setEmail("ok@ok.com");
        req.setPassword("good");

        User user = new User();
        user.setId(7L);
        user.setEmail(req.getEmail());
        user.setName("Ok");
        user.setPassword("encoded");
        user.setRole(User.Role.USER);

        when(userService.findByEmail(req.getEmail())).thenReturn(Optional.of(user));
        when(passwordEncoder.matches(req.getPassword(), user.getPassword())).thenReturn(true);
        when(jwtUtil.generateToken(user.getEmail(), user.getRole().name())).thenReturn("tok-ok");

        var resp = authService.login(req);

        assertNotNull(resp);
        assertEquals("tok-ok", resp.getToken());
        assertEquals(user.getEmail(), resp.getEmail());
    }
}
