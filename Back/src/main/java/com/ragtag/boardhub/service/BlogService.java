package com.ragtag.boardhub.service;

import com.ragtag.boardhub.domain.BlogNaver;

import java.util.List;

public interface BlogService {
    void saveBlogNaver(BlogNaver blogNaver);

    List<BlogNaver> viewBlog(BlogNaver blogNaver);
}
