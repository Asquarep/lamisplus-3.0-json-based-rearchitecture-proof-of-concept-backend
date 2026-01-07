package org.peterabiodun.proofofconceptconfigurablemodules.model.api;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class ApiResponse<T> {
    private final boolean success;
    private final String message;
    private final T data;
    private ArrayList<T> actions;
}
