package com.ragtag.boardhub.repository;

import com.ragtag.boardhub.domain.Community;
import com.ragtag.boardhub.domain.CommunityImg;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;


@Mapper
public interface CommunityMapper {

    void addCommunityWithReview(Community community);

    void addReview(Community community);

    void addCommunityWithTrade(Community community);

    void addTrade(Community community);

    void addCommunityWithSolution(Community community);

    void addSolution(Community community);


    List<Community> showReview();
    List<Community> showTrade();

    List<Community> showSolution();

    List<Community> showMate();

    void InsertImgNameWithReview(CommunityImg filename);

    void RequestImageUrl(CommunityImg filename);


    Community showReviewDetail(Long commId);

    Community showTradeDetail(Long commId);

    Community showSolutionDetail(Long commId);

    Community showMateDetail(Long commId);
    void likeReview(Long commId);

    void addCommunityWithMate(Community community);

    void addMate(Community community);


    Community upViews(Long commId);


     void deleteCommunity(Long comm_id);
}
