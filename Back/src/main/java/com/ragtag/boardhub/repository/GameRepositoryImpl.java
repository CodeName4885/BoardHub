package com.ragtag.boardhub.repository;

import com.ragtag.boardhub.domain.game.Categories;
import com.ragtag.boardhub.domain.game.Games;
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
        List<Games> list = gameMapper.getList();
        log.info("list : {}", list);

        return list;
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
        return gameMapper.updateGame(game);
    }

    @Override
    public List<Categories> getCategoriesByGameId(Long gameId) {
        log.info("gameId : {}", gameId);
        List<Categories> cateList = gameMapper.getCategoriesByGameId(gameId);
        log.info("cateList : {}", cateList);
        return cateList;
    }

}
