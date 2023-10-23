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

    @Value("${upload.dir}") // img 저장소
    private String uploadDir;
    // 이미지 업로드 하기 위한 메서드
    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Please select a file to upload.");
        }

        try {
            // Generate a unique filename to avoid overwriting existing files
            String originalFilename = file.getOriginalFilename();
            String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
            String uniqueFileName = UUID.randomUUID().toString() + fileExtension;

            // Create the directory if it doesn't exist
            Path directoryPath = Paths.get(uploadDir);
            if (!directoryPath.toFile().exists()) {
                directoryPath.toFile().mkdirs();
            }

            // Save the file to the specified directory
            File uploadedFile = new File(uploadDir + uniqueFileName);
            file.transferTo(uploadedFile);

            // You can save the file path or perform additional processing here.

            return ResponseEntity.ok("File uploaded successfully: " + uploadedFile.getAbsolutePath());
        } catch (IOException e) {
            return ResponseEntity.status(500).body("File upload failed: " + e.getMessage());
        }
    }

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
