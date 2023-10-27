package com.ragtag.boardhub.repository;

<<<<<<< HEAD
import com.ragtag.boardhub.domain.game.*;
import com.ragtag.boardhub.dto.game.CategoryDTO;
import com.ragtag.boardhub.dto.game.GameDataDTO;
import com.ragtag.boardhub.dto.game.GameSortDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
=======
import com.ragtag.boardhub.domain.game.Categories;
import com.ragtag.boardhub.domain.game.Games;
import com.ragtag.boardhub.dto.game.GameSortDTO;
import org.apache.ibatis.annotations.Mapper;
>>>>>>> c78795c565dca992dd7c51979aa55b10585ea39d

import java.util.List;

@Mapper
public interface GameMapper {

<<<<<<< HEAD
=======

>>>>>>> c78795c565dca992dd7c51979aa55b10585ea39d
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

    List<Mechanics> getMechanicsByGameId(Long gameId);

    List<Artists> getArtistsByGameId(Long gameId);

    List<Designers> getDesignersByGameId(Long gameId);

    List<Publishers> getPublishersByGameId(Long gameId);

    int checkCatMapping(@Param("gameId")Long gameId,
                        @Param("categoryId") Long categoryId);

    void addCatMapping(@Param("gameId") Long gameId,
                       @Param("categoryId") Long categoryId);

    int checkMechMapping(@Param("gameId") Long gameId,
                         @Param("mechanicId") Long mechanicId);

    void addMechMapping(@Param("gameId") Long gameId,
                        @Param("mechanicId") Long mechanicId);

    int checkDesMapping(@Param("gameId") Long gameId,
                        @Param("designerId") Long designerId);

    void addDesMapping(@Param("gameId") Long gameId,
                       @Param("designerId") Long designerId);

    int checkArtiMapping(@Param("gameId") Long gameId,
                         @Param("artistId") Long artistId);

    void addArtiMapping(@Param("gameId") Long gameId,
                        @Param("artistId") Long artistId);

    int checkPubMapping(@Param("gameId") Long gameId,
                        @Param("publisherId") Long publisherId);

    void addPubMapping(@Param("gameId") Long gameId,
                       @Param("publisherId") Long publisherId);

=======
>>>>>>> c78795c565dca992dd7c51979aa55b10585ea39d
}
