package com.ragtag.boardhub.repository;

import com.ragtag.boardhub.domain.Games;
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

}
