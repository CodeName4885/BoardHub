package com.ragtag.boardhub.repository;

import com.ragtag.boardhub.domain.Review;
import org.springframework.stereotype.Repository;


public interface ReviewRepository {

    Review addReview(Review review);
}
