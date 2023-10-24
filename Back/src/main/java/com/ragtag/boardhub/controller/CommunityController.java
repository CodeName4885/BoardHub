package com.ragtag.boardhub.controller;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

import com.ragtag.boardhub.domain.Community;
import com.ragtag.boardhub.service.CommunityService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@Slf4j
public class CommunityController {
    private final CommunityService communityService;



    @PostMapping("/uploadFile")
    public String addReview(@RequestPart("file") MultipartFile file) {
        // Saving directory path
        String uploadDirectory = "/images";
        // Original file name extraction
        String originalFileName = file.getOriginalFilename();
        String fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
        // Generating a unique file name using UUID
        String uniqueFileName = UUID.randomUUID().toString() + fileExtension;

        try {
            // Saving the file with the unique name
            file.transferTo(new File(uploadDirectory + uniqueFileName));
            String imageURL = "/images/" + uniqueFileName;

            // Log the URL of the uploaded image
            System.out.println("Uploaded image URL: " + imageURL);

            return imageURL;
        } catch (IOException e) {
            e.printStackTrace();
            return "File upload failed.";
        }
    }

    // Review 테이블 추가하는 메서드
    @PostMapping("/add/reviews")
    public ResponseEntity<String> addReview(@RequestBody Community community) {
        communityService.addCommunityWithReview(community);
        community.setImageurl(community.getImageurl());
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
    public List<Community> showReview() {
        return communityService.showReview();
    }




}
