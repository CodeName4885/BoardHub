package com.ragtag.boardhub.repository;

import com.ragtag.boardhub.domain.BlogNaver;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BlogMapper {

    void saveBlogNaver(BlogNaver blogNaver);

    List<BlogNaver> viewBlog(BlogNaver blogNaver);
}
