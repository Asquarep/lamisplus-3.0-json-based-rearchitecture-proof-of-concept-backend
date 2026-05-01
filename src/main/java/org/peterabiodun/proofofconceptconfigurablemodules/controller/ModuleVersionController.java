package org.peterabiodun.proofofconceptconfigurablemodules.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.peterabiodun.proofofconceptconfigurablemodules.model.FormConfigDto;
import org.peterabiodun.proofofconceptconfigurablemodules.model.ModuleVersionDto;
import org.peterabiodun.proofofconceptconfigurablemodules.model.api.ApiResponse;
import org.peterabiodun.proofofconceptconfigurablemodules.service.ModuleVersionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/modules/versions")
@CrossOrigin
@RequiredArgsConstructor
public class ModuleVersionController {
    private final ModuleVersionService moduleVersionService;

    @GetMapping("/{moduleKey}")
    public ResponseEntity<List<ModuleVersionDto>> getModuleVersions(@PathVariable("moduleKey") String moduleKey) {
        return ResponseEntity.ok(moduleVersionService.getModuleVersions(moduleKey));
    }

    @PutMapping("/activate")
    public ResponseEntity<String> activateModuleVersion(
            @RequestParam("moduleKey")String moduleKey,
            @RequestParam("versionNumber") String versionNumber){
        return ResponseEntity.ok(moduleVersionService.activateModuleVersion(moduleKey, versionNumber));
    }

    @PutMapping("/deactivate")
    public ResponseEntity<String> deactivateModuleVersion(
            @RequestParam("moduleKey")String moduleKey,
            @RequestParam("versionNumber") String versionNumber){
        return ResponseEntity.ok(moduleVersionService.deactivateModuleVersion(moduleKey, versionNumber));
    }

}
