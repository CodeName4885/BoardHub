package com.ragtag.boardhub.service;

import com.ragtag.boardhub.domain.Community;
import com.ragtag.boardhub.domain.CommunityImg;

import java.util.List;


public interface CommunityService {

    void addCommunityWithReview(Community community);

    void addCommunityWithTrade(Community community);

    void addCommunityWithSolution(Community community);

    List<Community> showReview();


    void SaveImgName(CommunityImg filename);
}
