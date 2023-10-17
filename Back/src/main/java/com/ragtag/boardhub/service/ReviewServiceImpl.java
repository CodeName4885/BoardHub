package com.ragtag.boardhub.service;

import com.ragtag.boardhub.domain.Review;
import com.ragtag.boardhub.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor

public class ReviewServiceImpl implements ReviewService{
    private final ReviewRepository reviewRepository;
    @Override
    public Review addReview(Review review) {
        System.out.println("reviewDataService : " + review);
        return reviewRepository.addReview(review);
    }
}
