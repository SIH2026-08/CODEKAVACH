package com.resqcampus.test;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/test")
public class TestProtectedController {

    @GetMapping("/protected")
    public Map<String, Object> protectedEndpoint(
            Authentication authentication
    ) {
        return Map.of(
                "message", "JWT authentication successful",
                "user", authentication.getName()
        );
    }
}