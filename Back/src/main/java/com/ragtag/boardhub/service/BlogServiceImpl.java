package com.ragtag.boardhub.service;

import com.ragtag.boardhub.domain.BlogNaver;
import com.ragtag.boardhub.repository.BlogMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BlogServiceImpl implements  BlogService{
    private final BlogMapper blogMapper;
    @Override
    public void saveBlogNaver(BlogNaver blogNaver) {
        System.out.println("blogNaver Data : " + blogNaver);
        blogMapper.saveBlogNaver(blogNaver);
    }

    @Override
    public List<BlogNaver> viewBlog(BlogNaver blogNaver) {
        return blogMapper.viewBlog(blogNaver);
    }
}
