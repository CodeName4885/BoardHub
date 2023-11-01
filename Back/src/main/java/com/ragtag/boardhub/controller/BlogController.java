package com.ragtag.boardhub.controller;

import com.ragtag.boardhub.domain.BlogNaver;
import com.ragtag.boardhub.service.BlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "localhost:3000/")
public class BlogController {
    private final BlogService blogService;
    @PostMapping("/blogData")
    public ResponseEntity<String> saveBlogNaverData(@RequestBody BlogNaver dataRequest) {
        // 데이터를 서비스로 전달
        blogService.saveBlogNaver(dataRequest);

        System.out.println(dataRequest);
        return ResponseEntity.ok("데이터가 성공적으로 저장되었습니다.");
    }
    @GetMapping("/show/blog")
    public ResponseEntity<List<BlogNaver>> viewBlog(BlogNaver blogNaver) {
        List<BlogNaver> blogNaverList = blogService.viewBlog(blogNaver);
        return ResponseEntity.ok(blogNaverList);
    }

}