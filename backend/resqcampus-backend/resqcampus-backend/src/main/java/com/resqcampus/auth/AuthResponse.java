package com.resqcampus.auth;

import com.resqcampus.user.Role;

import java.util.UUID;

public record AuthResponse(
        String token,
        UUID userId,
        String name,
        String email,
        Role role
) {
}