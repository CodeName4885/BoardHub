package com.ragtag.boardhub.repository;

import com.ragtag.boardhub.domain.Community;
import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface CommunityMapper {

    void addCommunityWithReview(Community community);

    void addReview(Community community);

    void addCommunityWithTrade(Community community);

    void addTrade(Community community);

    void addCommunityWithSolution(Community community);

    void addSolution(Community community);

    void showReview(Community community);
}
