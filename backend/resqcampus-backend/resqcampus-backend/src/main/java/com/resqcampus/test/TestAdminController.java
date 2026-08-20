package com.resqcampus.test;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class TestAdminController {

    @GetMapping("/test")
    public Map<String, String> adminEndpoint() {
        return Map.of(
                "message", "Admin access successful"
        );
    }
}