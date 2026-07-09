package com.sevgi.kviz.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    // Sevgilingizning ismini application.properties faylidagi
    // "kviz.ismi" qatoridan o'zgartirishingiz mumkin.
    @Value("${kviz.ismi:Sevgilim}")
    private String ismi;

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("ismi", ismi);
        return "index";
    }
}
