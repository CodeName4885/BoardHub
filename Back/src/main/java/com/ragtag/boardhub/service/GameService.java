package com.ragtag.boardhub.service;

<<<<<<< HEAD
import com.ragtag.boardhub.dto.game.*;
=======
import com.ragtag.boardhub.dto.game.CategoryResponse;
import com.ragtag.boardhub.dto.game.GameForm;
import com.ragtag.boardhub.dto.game.GameResponse;
import com.ragtag.boardhub.dto.game.GameSortDTO;
>>>>>>> c78795c565dca992dd7c51979aa55b10585ea39d

import java.util.List;

public interface GameService {


    List<GameResponse> getList();

    List<GameResponse> getListWithSort(GameSortDTO sort);

    GameResponse findGameById(Long gameId);

    boolean updateGame(GameForm form);

<<<<<<< HEAD
//    boolean createGame(GameForm form);

    List<CategoryDTO> getCategoriesByGameId(Long gameId);

    List<CategoryDTO> getCategoryList();

    GameDataDTO getAllDataList();

    GameDataDTO getAllDataByGameId(Long gameId);

    void mappingData(GameForm form);
=======
    List<CategoryResponse> getCategoriesByGameId(Long gameId);
>>>>>>> c78795c565dca992dd7c51979aa55b10585ea39d

}
