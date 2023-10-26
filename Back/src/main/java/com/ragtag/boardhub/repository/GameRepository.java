package com.ragtag.boardhub.repository;


import com.ragtag.boardhub.domain.game.Categories;
import com.ragtag.boardhub.domain.game.Games;
import com.ragtag.boardhub.dto.game.GameSortDTO;

import java.util.List;

public interface GameRepository {


    List<Games> getList();

    List<Games> getListWithSort(GameSortDTO sort);

    Games findGameById(Long gameId);

    boolean updateGame(Games game);

    List<Categories> getCategoriesByGameId(Long gameId);

}
