package com.ragtag.boardhub.repository;

import com.ragtag.boardhub.domain.Community;
import com.ragtag.boardhub.domain.CommunityImg;

import java.util.List;


public interface CommunityRepository {

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


    Community showReviewDetail(Long comm_id);

    Community showTradeDetail(Long commId);

    Community showSolutionDetail(Long commId);

    Community showMateDetail(Long commId);
    void likeReview(Long commId);


    Community upViews(Long commId);


    void deleteCommunity(Long commId);
}
