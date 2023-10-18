package com.ragtag.boardhub.service;

import com.ragtag.boardhub.domain.Community;
import com.ragtag.boardhub.repository.CommunityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor

public class CommunityServiceImpl implements CommunityService {
    private final CommunityRepository communityRepository;
    @Override
    public void addCommunityWithReview(Community community) {
        System.out.println("reviewDataService : " + community);
         communityRepository.addCommunityWithReview(community);

    }

    @Override
    public void addCommunityWithTrade(Community community) {
        System.out.println("TradeDataService : " + community);
        communityRepository.addCommunityWithTrade(community);
    }

    @Override
    public void addCommunityWithSolution(Community community) {
        System.out.println("SolutionDataService : " + community);
        communityRepository.addCommunityWithSolution(community);
    }

    @Override
    public void showReview(Community community) {
        communityRepository.showReview(community);
    }
}
