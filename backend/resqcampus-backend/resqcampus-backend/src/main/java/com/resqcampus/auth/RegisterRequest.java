package com.resqcampus.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(

        @NotBlank
        @Size(min = 2, max = 100)
        String name,

        @NotBlank
        @Email
        String email,

        @NotBlank
        @Size(min = 6, max = 100)
        String password
) {
}