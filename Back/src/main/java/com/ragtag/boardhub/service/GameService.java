package com.ragtag.boardhub.service;

import com.ragtag.boardhub.dto.game.*;

import java.util.List;

public interface GameService {


    List<GameResponse> getList();

    List<GameResponse> getListWithSort(GameSortDTO sort);

    GameResponse findGameById(Long gameId);

    boolean updateGame(GameForm form);

//    boolean createGame(GameForm form);

    List<CategoryDTO> getCategoriesByGameId(Long gameId);

    List<CategoryDTO> getCategoryList();

    GameDataDTO getAllDataList();

    void updateCategoryByGameId(Long gameId, List<CategoryDTO> list);

    GameDataDTO getAllDataByGameId(Long gameId);

}
