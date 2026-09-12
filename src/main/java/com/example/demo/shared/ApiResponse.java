package com.example.demo.shared;

import java.util.Arrays;

public record ApiResponse<T>(
        Boolean success,
        T data,
        String message
) {

    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(true, data, null);
    }

    public static <T> ApiResponse<T> success(T data, String message) {
        return new ApiResponse<>(true, data, message);
    }

    public static <T> ApiResponse<T> success(String message) {
        return new ApiResponse<>(true, null, message);
    }

    public static <T> ApiResponse<T> error(String message) {
        return new ApiResponse<>(false, null, message);
    }


    @Override
    public String toString() {
        return "{" +
                "success=" + success +
                ", data=" + data +
                ", message='" + message + '\'' +
                '}';
    }
}
