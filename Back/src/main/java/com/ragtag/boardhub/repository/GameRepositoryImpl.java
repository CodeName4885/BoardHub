package com.ragtag.boardhub.repository;

import com.ragtag.boardhub.domain.Games;
import com.ragtag.boardhub.dto.GameSortDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
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

}
