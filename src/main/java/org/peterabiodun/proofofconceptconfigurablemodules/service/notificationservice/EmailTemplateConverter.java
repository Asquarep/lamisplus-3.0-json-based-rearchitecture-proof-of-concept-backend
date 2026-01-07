package org.peterabiodun.proofofconceptconfigurablemodules.service.notificationservice;

import java.util.Map;

public class EmailTemplateConverter {

    public static String convertTemplate(String template, Map<String, Object> emailVariables) {
        for (Map.Entry<String, Object> entry : emailVariables.entrySet()) {
            template = template.replace("{" + entry.getKey() + "}", entry.getValue().toString());
        }
        return template;
    }
}
