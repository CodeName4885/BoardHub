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

    void InsertImgNameWithReview(CommunityImg filename);

    void RequestImageUrl(CommunityImg filename);
}
