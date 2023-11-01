package com.ragtag.boardhub.controller;

import org.springframework.stereotype.Controller;

import com.ragtag.boardhub.service.RegisterMail;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class MailController {

    private final RegisterMail mailService;

}
