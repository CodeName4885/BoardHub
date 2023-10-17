package com.ragtag.boardhub.controller;

import com.ragtag.boardhub.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
public class ReviewController {
    private final ReviewService reviewService;

    @PostMapping("/api/reviews")
    public ResponseEntity<String> addReview(@RequestBody String ReviewData) {

        System.out.println("reviewData : " + ReviewData);
        return ResponseEntity.ok("Review data received successfully");
    }
}
