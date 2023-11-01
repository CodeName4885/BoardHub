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
    public void addCommunityWithMate(Community community) {
        communityMapper.addCommunityWithMate(community);
        communityMapper.addMate(community);
    }

    @Override
    public List<Community> showReview() {
        return communityMapper.showReview();
    }

    @Override
    public List<Community> showTrade() {
        return communityMapper.showTrade();
    }

    @Override
    public List<Community> showSolution() {
        return communityMapper.showSolution();
    }

    @Override
    public List<Community> showMate() {
        return communityMapper.showMate();
    }

    @Override
    public void SaveImgNameWithReview(CommunityImg filename) {
        communityMapper.InsertImgNameWithReview(filename);
    }

    @Override
    public void RequestImageUrl(CommunityImg filename) {
        communityMapper.RequestImageUrl(filename);
    }

    @Override
    public Community showReviewDetail(Long comm_id) {
        return communityMapper.showReviewDetail(comm_id);
    }

    @Override
    public Community showTradeDetail(Long comm_id) {
        return communityMapper.showTradeDetail(comm_id);
    }

    @Override
    public Community showSolutionDetail(Long comm_id) {
        return communityMapper.showSolutionDetail(comm_id);
    }

    @Override
    public Community showMateDetail(Long comm_id) {
        return communityMapper.showMateDetail(comm_id);
    }

    @Override
    public void likeReview(Long comm_id) {
        communityMapper.likeReview(comm_id);
    }

    @Override
    public Community upViews(Long comm_id) {
        return communityMapper.upViews(comm_id);
    }



}
