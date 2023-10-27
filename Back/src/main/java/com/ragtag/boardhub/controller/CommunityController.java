package com.ragtag.boardhub.controller;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

import com.ragtag.boardhub.domain.Community;
import com.ragtag.boardhub.domain.CommunityImg;
import com.ragtag.boardhub.service.CommunityService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@Slf4j
public class CommunityController {
    private final CommunityService communityService;


    @PostMapping("/uploadFile")
    public ResponseEntity<String> uploadFile(@RequestPart("file") MultipartFile file) {
        String uploadDirectory = "C:\\ktw/image";
        String originalFileName = file.getOriginalFilename();
        String fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
        String uniqueFileName = UUID.randomUUID().toString() + fileExtension;
        try {
            file.transferTo(new File(uploadDirectory, uniqueFileName));
            String imageURL = uploadDirectory + File.separator + uniqueFileName;
            System.out.println("Uploaded image URL: " + imageURL);

            // CommunityImg 객체를 생성하여 파일 이름 설정
            CommunityImg img = new CommunityImg();
            img.setFilename(uniqueFileName);
            communityService.SaveImgNameWithReview(img); // 이미지 파일 정보 전달

            return ResponseEntity.ok(imageURL);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("File upload failed.");
        }
    }
    @GetMapping("RequestImageUrl")
    public ResponseEntity<String> RequestImageUrl(@RequestParam String filename) {
        String imageUrl = "C:\\ktw/image" + filename;
        return ResponseEntity.ok(imageUrl);
    }

    // Review 테이블 추가하는 메서드
            @PostMapping("/add/reviews")
            public ResponseEntity<String> addReview (@RequestBody Community community){
                communityService.addCommunityWithReview(community);
                log.info("Reviews DATA : {}", community);
                return ResponseEntity.ok("Review data received successfully");
            }

            // trade 테이블 추가하는 메서드
            @PostMapping("/add/trade")
            public ResponseEntity<String> addTrade (@RequestBody Community community){
                System.out.println("tradeData : " + community);
                communityService.addCommunityWithTrade(community);
                return ResponseEntity.ok("Review data received successfully");
            }
            // trade 테이블 추가하는 메서드
            @PostMapping("/add/solution")
            public ResponseEntity<String> addSolution (@RequestBody Community community){
                System.out.println("tradeData : " + community);
                communityService.addCommunityWithSolution(community);
                return ResponseEntity.ok("Review data received successfully");
            }
            @GetMapping("/show/reviews")
            public ResponseEntity<List<Community>> showReview() {
                List<Community> reviews = communityService.showReview();
                System.out.println(communityService.showReview());
                return ResponseEntity.ok(reviews);
            }


        }

