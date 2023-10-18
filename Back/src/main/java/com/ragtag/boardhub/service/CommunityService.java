package com.ragtag.boardhub.service;

import com.ragtag.boardhub.domain.Community;



public interface CommunityService {

    void addCommunityWithReview(Community community);

    void addCommunityWithTrade(Community community);

    void addCommunityWithSolution(Community community);

    void showReview(Community community);
}

