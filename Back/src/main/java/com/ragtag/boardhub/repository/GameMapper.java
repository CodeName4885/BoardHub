package com.ragtag.boardhub.repository;

import com.ragtag.boardhub.domain.game.*;
import com.ragtag.boardhub.DTO.game.GameSortDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface GameMapper {

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

    int saveGameComment(Comments comment);

    Long getCommentCountByGameId(Long gameId);

    List<String> getCommentByGameId(Long gameId);

    List<Comments> getAllCommentByGameId(Long gameId);

}
