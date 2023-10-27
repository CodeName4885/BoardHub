package com.ragtag.boardhub.repository;

import com.ragtag.boardhub.domain.Community;
import com.ragtag.boardhub.domain.CommunityImg;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@RequiredArgsConstructor
@Repository
public class CommunityRepositoryImpl implements CommunityRepository {
    private final CommunityMapper communityMapper;
    @Override
    public void addCommunityWithReview(Community community) {

     communityMapper.addCommunityWithReview(community);
     communityMapper.addReview(community);
    }

    @Override
    public void addCommunityWithTrade(Community community) {
        System.out.println("TradeData Repository : " + community);
        communityMapper.addCommunityWithTrade(community);
        communityMapper.addTrade(community);
    }

    @Override
    public void addCommunityWithSolution(Community community) {
        System.out.println("SolutionData Repository : " + community);
        communityMapper.addCommunityWithSolution(community);
        communityMapper.addSolution(community);
    }

    @Override
    public List<Community> showReview() {
        return communityMapper.showReview();
    }

    @Override
    public void SaveImgNameWithReview(CommunityImg filename) {
        communityMapper.InsertImgNameWithReview(filename);
    }

    @Override
    public void RequestImageUrl(CommunityImg filename) {
        communityMapper.RequestImageUrl(filename);
    }


}
