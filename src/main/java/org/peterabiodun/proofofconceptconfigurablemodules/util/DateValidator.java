package org.peterabiodun.proofofconceptconfigurablemodules.util;

import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Component
public class DateValidator {

    private static final String DATE_FORMAT = "yyyy-MM-dd";

    public void validateDate(String dateString) throws IllegalArgumentException {
        if (dateString == null) {
            return;
        }
        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat(DATE_FORMAT);
            dateFormat.setLenient(false);  // Disallow lenient parsing

            Date date = dateFormat.parse(dateString);
            // If the date is valid, you can proceed with the business logic
        } catch (ParseException e) {
            throw new IllegalArgumentException("Invalid date format. Use only valid dates in yyyy-MM-dd");
        }
    }
}
