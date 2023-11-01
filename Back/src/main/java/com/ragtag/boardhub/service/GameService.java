package com.ragtag.boardhub.service;

import java.util.List;

import com.ragtag.boardhub.DTO.game.CategoryDTO;
import com.ragtag.boardhub.DTO.game.GameComment;
import com.ragtag.boardhub.DTO.game.GameDataDTO;
import com.ragtag.boardhub.DTO.game.GameForm;
import com.ragtag.boardhub.DTO.game.GameResponse;
import com.ragtag.boardhub.DTO.game.GameSortDTO;

public interface GameService {


    List<GameResponse> getList();

    List<GameResponse> getListWithSort(GameSortDTO sort);

    GameResponse findGameById(Long gameId);

    boolean updateGame(GameForm form);

//    boolean createGame(GameForm form);

    List<CategoryDTO> getCategoriesByGameId(Long gameId);

    List<CategoryDTO> getCategoryList();

    GameDataDTO getAllDataList();

    GameDataDTO getAllDataByGameId(Long gameId);

    void mappingData(GameForm form);

    void saveGameComment(GameComment comment);

    List<GameComment> getAllCommentByGameId(Long gameId);

}
