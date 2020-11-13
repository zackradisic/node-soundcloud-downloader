if npm run test; then
    if npm run build && npm run docs; then 
        npm publish
    fi
fi