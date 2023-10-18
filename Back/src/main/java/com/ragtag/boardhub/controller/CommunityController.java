package com.ragtag.boardhub.controller;

import com.ragtag.boardhub.domain.Community;
import com.ragtag.boardhub.service.CommunityService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
public class CommunityController {
    private final CommunityService communityService;

    // Review 테이블 추가하는 메서드
    @PostMapping("/add/reviews")
    public ResponseEntity<String> addReview(@RequestBody Community community) {
        System.out.println("reviewData : " + community);
        communityService.addCommunityWithReview(community);
        return ResponseEntity.ok("Review data received successfully");
    }

    // trade 테이블 추가하는 메서드
    @PostMapping("/add/trade")
    public ResponseEntity<String> addTrade(@RequestBody Community community) {
        System.out.println("tradeData : " + community);
        communityService.addCommunityWithTrade(community);
        return ResponseEntity.ok("Review data received successfully");
    }
    // trade 테이블 추가하는 메서드
    @PostMapping("/add/solution")
    public ResponseEntity<String> addSolution(@RequestBody Community community) {
        System.out.println("tradeData : " + community);
        communityService.addCommunityWithSolution(community);
        return ResponseEntity.ok("Review data received successfully");
    }
    @GetMapping("/show/reviews")
    public  List showReview(){

    }

}
