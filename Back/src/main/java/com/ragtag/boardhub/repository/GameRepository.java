package com.ragtag.boardhub.repository;


<<<<<<< HEAD
import com.ragtag.boardhub.domain.game.*;
import com.ragtag.boardhub.dto.game.CategoryDTO;
import com.ragtag.boardhub.dto.game.GameDataDTO;
=======
import com.ragtag.boardhub.domain.game.Categories;
import com.ragtag.boardhub.domain.game.Games;
>>>>>>> c78795c565dca992dd7c51979aa55b10585ea39d
import com.ragtag.boardhub.dto.game.GameSortDTO;

import java.util.List;

public interface GameRepository {


    List<Games> getList();

    List<Games> getListWithSort(GameSortDTO sort);

    Games findGameById(Long gameId);

    boolean updateGame(Games game);

    List<Categories> getCategoriesByGameId(Long gameId);

<<<<<<< HEAD
    List<Categories> getCategoryList();

    List<Mechanics> getMechanicList();

    List<Designers> getDesignerList();

    List<Artists> getArtistList();

    List<Publishers> getPublisherList();

    int checkCatMapping(Long gameId, Long categoryId);

    void addCatMapping(Long gameId, Long categoryId);

    List<Mechanics> getMechanicsByGameId(Long gameId);

    List<Designers> getDesignersByGameId(Long gameId);

    List<Artists> getArtistsByGameId(Long gameId);

    List<Publishers> getPublishersByGameId(Long gameId);

    int checkMechMapping(Long gameId, Long mechanicId);

    void addMechMapping(Long gameId, Long mechanicId);

    int checkDesMapping(Long gameId, Long designerId);

    void addDesMapping(Long gameId, Long designerId);

    int checkArtiMapping(Long gameId, Long artistId);

    void addArtiMapping(Long gameId, Long artistId);

    int checkPubMapping(Long gameId, Long publisherId);

    void addPubMapping(Long gameId, Long publisherId);

=======
>>>>>>> c78795c565dca992dd7c51979aa55b10585ea39d
}
