package com.ragtag.boardhub.repository;

import com.ragtag.boardhub.domain.Community;

import java.util.List;


public interface CommunityRepository {

    void addCommunityWithReview(Community community);

    void addCommunityWithTrade(Community community);

    void addCommunityWithSolution(Community community);

    List<Community> showReview();
}
