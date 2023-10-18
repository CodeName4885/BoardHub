package com.ragtag.boardhub.repository;

import com.ragtag.boardhub.domain.Community;


public interface CommunityRepository {

    void addCommunityWithReview(Community community);

    void addCommunityWithTrade(Community community);

    void addCommunityWithSolution(Community community);

    void showReview(Community community);
}
