package com.ragtag.boardhub.controller;

import com.ragtag.boardhub.service.RegisterMail;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequiredArgsConstructor
public class MailController {

    private final RegisterMail mailService;

}
