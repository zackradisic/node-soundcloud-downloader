if npm run test; then
    
    if npm run build && npm run docs; then 
        npm publish
    fi

    echo "Build or docs failed"
else
    echo "Test failed"
fi