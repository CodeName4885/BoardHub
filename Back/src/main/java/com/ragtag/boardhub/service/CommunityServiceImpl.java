package com.ragtag.boardhub.service;

import com.ragtag.boardhub.domain.Community;
import com.ragtag.boardhub.domain.CommunityImg;
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
    public void addCommunityWithMate(Community community) {
        communityRepository.addCommunityWithMate(community);
    }

    @Override
    public List<Community> showReview() {
        // 여기에서 검색 조건에 따라 리뷰를 가져오는 코드 작성
        List<Community> reviewList = communityRepository.showReview();
        return reviewList;
    }

    @Override
    public List<Community> showTrade() {
        List<Community> TradeList = communityRepository.showTrade();
        return TradeList;
    }

    @Override
    public List<Community> showSolution() {
        List<Community> SolutionList = communityRepository.showSolution();
        return SolutionList;
    }

    @Override
    public List<Community> showMate() {
        List<Community> MateList = communityRepository.showMate();
        return MateList;
    }

    @Override
    public void SaveImgNameWithReview(CommunityImg filename) {
        System.out.println("imageURL : " + filename);
        communityRepository.SaveImgNameWithReview(filename);
    }

    @Override
    public void RequestImageUrl(CommunityImg filename) {
        communityRepository.RequestImageUrl(filename);
    }

    @Override
    public Community getReviewById(Long comm_id) {
        return communityRepository.showReviewDetail(comm_id); // Assuming showReviewDetail returns a single Community object
    }

    @Override
    public Community getTradeById(Long comm_id) {
        return communityRepository.showTradeDetail(comm_id);
    }

    @Override
    public Community getSolutionById(Long comm_id) {
        return communityRepository.showSolutionDetail(comm_id);
    }

    @Override
    public Community getMateById(Long comm_id) {
        return communityRepository.showMateDetail(comm_id);
    }

    @Override
    public void likeReview(Long comm_id) {
        communityRepository.likeReview(comm_id);
    }

    @Override
    public Community upViews(Long comm_id) {
      return communityRepository.upViews(comm_id);
    }



}



