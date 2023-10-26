package com.ragtag.boardhub.repository;


import com.ragtag.boardhub.domain.game.*;
import com.ragtag.boardhub.dto.game.CategoryDTO;
import com.ragtag.boardhub.dto.game.GameDataDTO;
import com.ragtag.boardhub.dto.game.GameSortDTO;

import java.util.List;

public interface GameRepository {


    List<Games> getList();

    List<Games> getListWithSort(GameSortDTO sort);

    Games findGameById(Long gameId);

    boolean updateGame(Games game);

    List<Categories> getCategoriesByGameId(Long gameId);

    List<Categories> getCategoryList();

    List<Mechanics> getMechanicList();

    List<Designers> getDesignerList();

    List<Artists> getArtistList();

    List<Publishers> getPublisherList();

    boolean updateCategoryByGameId(Categories category);

    int checkCatMapping(Long gameId, Long categoryId);

    void addCatMapping(Long gameId, Long categoryId);

    List<Mechanics> getMechanicsByGameId(Long gameId);

    List<Designers> getDesignersByGameId(Long gameId);

    List<Artists> getArtistsByGameId(Long gameId);

    List<Publishers> getPublishersByGameId(Long gameId);

}
