package com.ragtag.boardhub.service;

import com.ragtag.boardhub.domain.Games;
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

}
