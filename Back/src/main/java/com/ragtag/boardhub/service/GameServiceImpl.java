package com.ragtag.boardhub.service;

import com.ragtag.boardhub.domain.game.Categories;
import com.ragtag.boardhub.domain.game.Games;
import com.ragtag.boardhub.dto.game.CategoryResponse;
import com.ragtag.boardhub.dto.game.GameForm;
import com.ragtag.boardhub.dto.game.GameResponse;
import com.ragtag.boardhub.dto.game.GameSortDTO;
import com.ragtag.boardhub.repository.GameRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class GameServiceImpl implements GameService {

    private final GameRepository gameRepository;

    @Override
    public List<GameResponse> getList() {
        return gameRepository.getList()
                .stream()
                .map(game -> new GameResponse(game))
                .collect(Collectors.toList());
    }

    @Override
    public List<GameResponse> getListWithSort(GameSortDTO sort) {
        return gameRepository.getListWithSort(sort)
                .stream()
                .map(game -> new GameResponse(game))
                .collect(Collectors.toList());
    }

    @Override
    public GameResponse findGameById(Long gameId) {
        Games findGame = gameRepository.findGameById(gameId);
        log.info("findGame : {}", findGame);
        GameResponse game = new GameResponse(findGame);
        log.info("game : {}", game);
        return game;
    }

    @Override
    public boolean updateGame(GameForm form) {
        return gameRepository.updateGame(form.toEntity());
    }

    @Override
    public List<CategoryResponse> getCategoriesByGameId(Long gameId) {
        return gameRepository.getCategoriesByGameId(gameId)
                .stream()
                .map(cate -> new CategoryResponse(cate))
                .collect(Collectors.toList());
    }

}
