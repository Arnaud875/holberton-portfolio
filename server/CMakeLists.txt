cmake_minimum_required(VERSION 3.13)
project(ChatServer LANGUAGES C)

find_program(CLANG_TIDY "clang-tidy")
find_program(CLANG_FORMAT "clang-format")

set(CMAKE_C_STANDARD 11)
set(CMAKE_C_STANDARD_REQUIRED ON)

# Get all source files
file(GLOB_RECURSE SOURCE_FILES
    ${PROJECT_SOURCE_DIR}/**/*.c
    ${PROJECT_SOURCE_DIR}/**/*.h
)

add_executable(ChatServer ${SOURCE_FILES})

# Clang compile flags
if(CMAKE_CXX_COMPILER_ID STREQUAL "Clang")
    target_compile_options(ChatServer PRIVATE
        $<$<CONFIG:DEBUG>:
            -g
            -O0
            -Wall -Wextra -Wpedantic
            -Wshadow -Wconversion -Wsign-conversion
            -fsanitize=address,undefined
            -fno-omit-frame-pointer
            -fstack-protector-strong>
        $<$<CONFIG:RELEASE>:
            -O3
            -DNDEBUG
            -march=native
            -flto
            -Wall -Wextra -Wpedantic
            -Wshadow -Wconversion -Wsign-conversion
            -fstack-protector-strong
            -fno-omit-frame-pointer>
    )
endif()

# Add clang-format target
if (CLANG_FORMAT)
    add_custom_target(format COMMAND clang-format -i ${SOURCE_FILES})
endif()
