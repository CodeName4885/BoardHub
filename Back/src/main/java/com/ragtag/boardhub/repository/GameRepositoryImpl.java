package com.ragtag.boardhub.repository;

import com.ragtag.boardhub.domain.game.*;
import com.ragtag.boardhub.dto.game.CategoryDTO;
import com.ragtag.boardhub.dto.game.GameDataDTO;
import com.ragtag.boardhub.dto.game.GameSortDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
@Slf4j
public class GameRepositoryImpl implements GameRepository {

    private final GameMapper gameMapper;

    @Override
    public List<Games> getList() {
        return gameMapper.getList();
    }

    @Override
    public List<Games> getListWithSort(GameSortDTO sort) {
        return gameMapper.getListWithSort(sort);
    }

    @Override
    public Games findGameById(Long gameId) {
        return gameMapper.findGameById(gameId);
    }

    @Override
    public boolean updateGame(Games game) {
        log.info("game : {}", game);
        return gameMapper.updateGame(game);
    }

    @Override
    public List<Categories> getCategoriesByGameId(Long gameId) {
        log.info("gameId : {}", gameId);
        List<Categories> cateList = gameMapper.getCategoriesByGameId(gameId);
        log.info("cateList : {}", cateList);
        return cateList;
    }

    @Override
    public List<Categories> getCategoryList() {
        return gameMapper.getCategoryList();
    }

    @Override
    public List<Mechanics> getMechanicList() {
        return gameMapper.getMechanicList();
    }

    @Override
    public List<Designers> getDesignerList() {
        return gameMapper.getDesignerList();
    }

    @Override
    public List<Artists> getArtistList() {
        return gameMapper.getArtistList();
    }

    @Override
    public List<Publishers> getPublisherList() {
        return gameMapper.getPublisherList();
    }

    @Override
    public List<Mechanics> getMechanicsByGameId(Long gameId) {
        return gameMapper.getMechanicsByGameId(gameId);
    }

    @Override
    public List<Designers> getDesignersByGameId(Long gameId) {
        return gameMapper.getDesignersByGameId(gameId);
    }

    @Override
    public List<Artists> getArtistsByGameId(Long gameId) {
        return gameMapper.getArtistsByGameId(gameId);
    }

    @Override
    public List<Publishers> getPublishersByGameId(Long gameId) {
        return gameMapper.getPublishersByGameId(gameId);
    }

    @Override
    public int checkCatMapping(Long gameId, Long categoryId) {
        return gameMapper.checkCatMapping(gameId, categoryId);
    }

    @Override
    public void addCatMapping(Long gameId, Long categoryId) {
        gameMapper.addCatMapping(gameId, categoryId);
    }

    @Override
    public int checkMechMapping(Long gameId, Long mechanicId) {
        return gameMapper.checkMechMapping(gameId, mechanicId);
    }

    @Override
    public void addMechMapping(Long gameId, Long mechanicId) {
        gameMapper.addMechMapping(gameId, mechanicId);
    }

    @Override
    public int checkDesMapping(Long gameId, Long designerId) {
        return gameMapper.checkDesMapping(gameId, designerId);
    }

    @Override
    public void addDesMapping(Long gameId, Long designerId) {
        gameMapper.addDesMapping(gameId, designerId);
    }

    @Override
    public int checkArtiMapping(Long gameId, Long artistId) {
        return gameMapper.checkArtiMapping(gameId, artistId);
    }

    @Override
    public void addArtiMapping(Long gameId, Long artistId) {
        gameMapper.addArtiMapping(gameId, artistId);
    }

    @Override
    public int checkPubMapping(Long gameId, Long publisherId) {
        return gameMapper.checkPubMapping(gameId, publisherId);
    }

    @Override
    public void addPubMapping(Long gameId, Long publisherId) {
        gameMapper.addPubMapping(gameId, publisherId);
    }

}
