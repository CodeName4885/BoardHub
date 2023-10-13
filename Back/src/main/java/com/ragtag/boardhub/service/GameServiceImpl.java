package com.ragtag.boardhub.service;

import com.ragtag.boardhub.domain.Games;
import com.ragtag.boardhub.dto.GameSortDTO;
import com.ragtag.boardhub.repository.GameRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GameServiceImpl implements GameService {

    private final GameRepository gameRepository;

    @Override
    public List<Games> getList() {
        return gameRepository.getList();
    }

    @Override
    public List<Games> getListWithSort(GameSortDTO sort) {
        return gameRepository.getListWithSort(sort);
    }

}
