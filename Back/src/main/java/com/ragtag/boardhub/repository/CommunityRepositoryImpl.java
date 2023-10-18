package com.ragtag.boardhub.repository;

import com.ragtag.boardhub.domain.Community;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class CommunityRepositoryImpl implements CommunityRepository {
    private final CommunityMapper communityMapper;
    @Override
    public void addCommunityWithReview(Community community) {
        System.out.println("reviewData Repository : " + community);
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
    public void showReview(Community community) {
        communityMapper.showReview(community);
    }
}
