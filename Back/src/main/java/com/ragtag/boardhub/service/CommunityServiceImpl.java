package com.ragtag.boardhub.service;

import com.ragtag.boardhub.domain.Community;
import com.ragtag.boardhub.repository.CommunityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class CommunityServiceImpl implements CommunityService {
    private final CommunityRepository communityRepository;
    @Override
    public void addCommunityWithReview(Community community) {
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
        public List<Community> showReview() {
            // 여기에서 검색 조건에 따라 리뷰를 가져오는 코드 작성
            List<Community> reviewList = communityRepository.showReview();
            return reviewList;
        }


}
