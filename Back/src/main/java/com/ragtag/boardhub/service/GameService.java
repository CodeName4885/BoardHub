package com.ragtag.boardhub.service;

import com.ragtag.boardhub.dto.game.CategoryResponse;
import com.ragtag.boardhub.dto.game.GameForm;
import com.ragtag.boardhub.dto.game.GameResponse;
import com.ragtag.boardhub.dto.game.GameSortDTO;

import java.util.List;

public interface GameService {


    List<GameResponse> getList();

    List<GameResponse> getListWithSort(GameSortDTO sort);

    GameResponse findGameById(Long gameId);

    boolean updateGame(GameForm form);

    List<CategoryResponse> getCategoriesByGameId(Long gameId);

}
