package com.ragtag.boardhub.service;

import com.ragtag.boardhub.domain.Community;
import com.ragtag.boardhub.domain.CommunityImg;

import java.util.List;


public interface CommunityService {

    void addCommunityWithReview(Community community);

    void addCommunityWithTrade(Community community);

    void addCommunityWithSolution(Community community);

    void addCommunityWithMate(Community community);

    List<Community> showReview();

    List<Community> showTrade();

    List<Community> showSolution();

    List<Community> showMate();
    void SaveImgNameWithReview(CommunityImg filename);

    void RequestImageUrl(CommunityImg filename);

    Community getReviewById(Long comm_id);

    Community getTradeById(Long comm_id);

    Community getSolutionById(Long comm_id);

    Community getMateById(Long comm_id);

    void likeReview(Long comm_id);


    Community upViews(Long comm_id);


    void deleteCommunity(Long comm_id);
}

