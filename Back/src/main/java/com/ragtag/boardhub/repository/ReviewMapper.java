package com.ragtag.boardhub.repository;

import com.ragtag.boardhub.domain.Review;
import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface ReviewMapper {

    Review addReview(Review review);
}
