#!/usr/bin/env sh

function setup {
    curl -sLO https://github.com/tailwindlabs/tailwindcss/releases/latest/download/tailwindcss-linux-x64
    chmod +x tailwindcss-linux-x64
    mv tailwindcss-linux-x64 tailwindcss
}


function watch {
    ./tailwindcss build -i ./tailwind.css -o ./static/css/index.css --watch
}


function build {
    ./tailwindcss build -i ./tailwind.css -o ./static/css/main.css
}

"$@"
