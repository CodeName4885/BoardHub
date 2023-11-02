package com.ragtag.boardhub.controller;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ragtag.boardhub.domain.Community;
import com.ragtag.boardhub.domain.CommunityImg;
import com.ragtag.boardhub.domain.Reply;
import com.ragtag.boardhub.domain.Reply_Comment;
import com.ragtag.boardhub.service.CommunityService;
import com.ragtag.boardhub.service.ReplyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@RestController
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "localhost:3000/")
public class CommunityController {
    private final CommunityService communityService;
    private final ReplyService replyService;

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
    public ResponseEntity<String> addReview(@RequestBody Community community) {
        communityService.addCommunityWithReview(community);
        log.info("Reviews DATA : {}", community);
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
        System.out.println("solution : " + community);
        communityService.addCommunityWithSolution(community);
        return ResponseEntity.ok("Review data received successfully");
    }

    @PostMapping("/add/mate")
    public ResponseEntity<String> addMate(@RequestBody Community community) {
        System.out.println("mateData : " + community);
        communityService.addCommunityWithMate(community);
        return ResponseEntity.ok("Review data received successfully");
    }


    @GetMapping("/show/reviewsList")
    public ResponseEntity<List<Community>> showReviewList() {
        List<Community> reviews = communityService.showReview();

        System.out.println(communityService.showReview());
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/show/tradeList")
    public ResponseEntity<List<Community>> showTradeList() {
        List<Community> reviews = communityService.showTrade();

        System.out.println(communityService.showTrade());
        return ResponseEntity.ok(reviews);
    }
    @GetMapping("/show/solutionList")
    public ResponseEntity<List<Community>> showSolutionList() {
        List<Community> reviews = communityService.showSolution();

        System.out.println(communityService.showSolution());
        return ResponseEntity.ok(reviews);
    }
    @GetMapping("/show/mateList")
    public ResponseEntity<List<Community>> showMateList() {
        List<Community> reviews = communityService.showMate();

        System.out.println(communityService.showMate());
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/show/reviewDetail/{comm_id}")
    public ResponseEntity<Community> showReview(@PathVariable Long comm_id) {
        Community review = communityService.getReviewById(comm_id); // Modify this to get a single review by comm_id
        if (review == null) {
            return ResponseEntity.notFound().build(); // Return 404 Not Found if the review is not found
        }
        return ResponseEntity.ok(review);
    }

    @GetMapping("/show/tradeDetail/{comm_id}")
    public ResponseEntity<Community> showTrade(@PathVariable Long comm_id) {
        Community review = communityService.getTradeById(comm_id); // Modify this to get a single review by comm_id
        if (review == null) {
            return ResponseEntity.notFound().build(); // Return 404 Not Found if the review is not found
        }
        return ResponseEntity.ok(review);
    }

    @GetMapping("/show/solutionDetail/{comm_id}")
    public ResponseEntity<Community> showSolution(@PathVariable Long comm_id) {
        Community review = communityService.getSolutionById(comm_id); // Modify this to get a single review by comm_id
        if (review == null) {
            return ResponseEntity.notFound().build(); // Return 404 Not Found if the review is not found
        }
        return ResponseEntity.ok(review);
    }

    @GetMapping("/show/mateDetail/{comm_id}")
    public ResponseEntity<Community> showMate(@PathVariable Long comm_id) {
        Community review = communityService.getMateById(comm_id); // Modify this to get a single review by comm_id
        if (review == null) {
            return ResponseEntity.notFound().build(); // Return 404 Not Found if the review is not found
        }
        return ResponseEntity.ok(review);
    }


    @PostMapping("/add/reply/{comm_id}")
    public ResponseEntity<Reply> addReplyWithReview(@PathVariable Long comm_id, @RequestBody Reply requestBody) {
        // 클라이언트에서 전송한 JSON 데이터가 `requestBody` 객체로 매핑됩니다.
        System.out.println("comm_id Data: " + comm_id);

        // 데이터베이스에 댓글을 저장하는 서비스 메서드를 호출합니다.
        Reply addedReply = replyService.addReplyWithReview(requestBody);

        if (addedReply != null) {
            return new ResponseEntity<>(addedReply, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/show/Detail/reply/{comm_id}")
    public ResponseEntity<List<Reply>> showReplyWithReview(@PathVariable Long comm_id) {
        List<Reply> replyList = replyService.getRepliesByCommId(comm_id);
        if (replyList.isEmpty()) {
            return ResponseEntity.notFound().build(); // Return 404 Not Found if the list is empty
        }
        return ResponseEntity.ok(replyList);
    }

    @PostMapping("/detail/like/{comm_id}")
    public ResponseEntity<String> likeReview(@PathVariable Long comm_id) {
        try {
            // reviewId에 해당하는 리뷰를 찾거나 좋아요 수를 증가시키는 등의 로직을 수행합니다.
            communityService.likeReview(comm_id);
            return new ResponseEntity<>("Liked", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error", HttpStatus.INTERNAL_SERVER_ERROR);

        }

    }
    @PostMapping ("/add/reply/comment/{reply_id}")
    public ResponseEntity<Reply> addCommentWithReply(@PathVariable Long reply_id, @RequestBody Reply_Comment replyCommentData ) {
        System.out.println("reply_id Data : " + reply_id);
        Reply addComment = replyService.addCommentWithReply(replyCommentData );
        System.out.println("replyComment Data : " + replyCommentData );
        if (addComment != null) {
            return new ResponseEntity<>(addComment, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/show/reply/comment/{reply_id}")
    public ResponseEntity<List<Reply_Comment>> showCommentWithReply(@PathVariable Long reply_id) {
        List<Reply_Comment> CommentList = replyService.getCommentWithReply(reply_id);
        if (CommentList.isEmpty()) {
            return ResponseEntity.notFound().build(); // Return 404 Not Found if the list is empty
        }
        return ResponseEntity.ok(CommentList);
    }

    @PostMapping("/up/views/{comm_id}")
    public ResponseEntity<String> upViews(@PathVariable Long comm_id) {
        Community community = communityService.upViews(comm_id);
        System.out.println("Community Data: " + community);
        return ResponseEntity.ok("Views incremented successfully");

    }
    @DeleteMapping("/deleteCommunity/{comm_id}")
    public ResponseEntity<String> deleteCommunity(@PathVariable Long comm_id) {
        System.out.println("Delete 호출!!!" + comm_id);
        communityService.deleteCommunity(comm_id);
        // 삭제가 성공적으로 이루어진 경우
        return new ResponseEntity<>("게시물이 성공적으로 삭제되었습니다.", HttpStatus.OK);

        // 삭제에 실패한 경우
        // return new ResponseEntity<>("게시물 삭제에 실패했습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

