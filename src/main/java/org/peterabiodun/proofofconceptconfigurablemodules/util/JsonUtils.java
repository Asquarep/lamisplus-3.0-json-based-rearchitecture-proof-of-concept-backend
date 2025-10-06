package org.peterabiodun.proofofconceptconfigurablemodules.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.peterabiodun.proofofconceptconfigurablemodules.model.ModuleConfigDto;

import java.io.File;

public class JsonUtils {
    private static final ObjectMapper mapper = new ObjectMapper();

    public static ModuleConfigDto parseModuleFile(File file) throws Exception {
        return mapper.readValue(file, ModuleConfigDto.class);
    }
}
