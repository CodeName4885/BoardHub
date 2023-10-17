package com.ragtag.boardhub.repository;

import com.ragtag.boardhub.domain.Review;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class ReviewRepositoryImpl implements ReviewRepository{
    private final ReviewMapper reviewMapper;
    @Override
    public Review addReview(Review review) {
        System.out.println("reviewData Repository : " + review);
         reviewMapper.addReview(review);
        return review;
    }
}
