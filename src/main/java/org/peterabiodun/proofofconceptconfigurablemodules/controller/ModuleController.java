package org.peterabiodun.proofofconceptconfigurablemodules.controller;

import lombok.extern.slf4j.Slf4j;
import org.peterabiodun.proofofconceptconfigurablemodules.model.ModuleConfigDto;
import org.peterabiodun.proofofconceptconfigurablemodules.model.entity.ModuleConfig;
import org.peterabiodun.proofofconceptconfigurablemodules.service.ModuleService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/modules")
@CrossOrigin
public class ModuleController {

    private final ModuleService moduleService;
    private final String userDir = System.getProperty("user.dir");

    @Value("${app.modules-path}")
    private String modulesPath;

    public ModuleController(ModuleService moduleService) {
        this.moduleService = moduleService;
    }

    @PostMapping("/load")
    public ResponseEntity<ModuleConfigDto> loadModule(@RequestParam String filePath) throws Exception {
        ModuleConfigDto config = moduleService.loadModule(new File(filePath));
        return ResponseEntity.ok(config);
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadModule(@RequestParam("file") MultipartFile file) throws Exception {
        File dir = new File(userDir + modulesPath);
        if (!dir.exists() && !dir.mkdirs()) {
            throw new IOException("Failed to create modules directory: " + modulesPath);
        }

        String originalFileName = file.getOriginalFilename();
        if (originalFileName == null || !originalFileName.endsWith(".json")) {
            return ResponseEntity.badRequest().body("Only .json files are supported");
        }

        File savedFile = new File(dir, originalFileName);
        file.transferTo(savedFile); // save for later use/download

        // Load the module (parse JSON + evolve DB)
        moduleService.loadModule(savedFile);

        return ResponseEntity.ok("Module uploaded and loaded: " + originalFileName);
    }

    @GetMapping
    public ResponseEntity<List<ModuleConfigDto>> getModules() {
        return ResponseEntity.ok(moduleService.getAllModules());
    }
}

