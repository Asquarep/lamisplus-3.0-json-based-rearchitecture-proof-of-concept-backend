package org.peterabiodun.proofofconceptconfigurablemodules.controller;

import org.peterabiodun.proofofconceptconfigurablemodules.model.FormConfigDto;
import org.peterabiodun.proofofconceptconfigurablemodules.service.FormDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/forms")
@CrossOrigin
public class FormDataController {

    @Autowired
    private FormDataService service;

    // Save form data
    @PostMapping("/{tableName}")
    public ResponseEntity<String> saveFormData(
            @PathVariable String tableName,
            @RequestBody Map<String, Object> payload) {
        service.saveFormData(tableName, payload);
        return ResponseEntity.ok("Data saved");
    }
    // Fetch form data
    @GetMapping("/{formName}/data")
    public List<Map<String, Object>> fetchFormData(@PathVariable String formName) {
        return service.fetchFormData(formName);
    }

    @GetMapping("/module/{moduleId}")
    public ResponseEntity<List<FormConfigDto>> fetchFormData(@PathVariable("moduleId") Long moduleId) {
        return ResponseEntity.ok(service.fetchFormsByModuleId(moduleId));
    }
}
