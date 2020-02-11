function AI(game) {
    const startTime = Date.now()
    const result = search(game.clone())
    game.place(result.x, result.y)
    console.log(`cost: ${Date.now() - startTime}ms`)
}

function search(game) {

    let bestX, bestY, bestScore = Infinity;

    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            if (game.place(x, y)) {
                const score = evaluation(game.grid)
                if (score < bestScore) {
                    bestScore = score
                    bestX = x
                    bestY = y
                }
                game.undo()
            }
        }
    }

    return { x: bestX, y: bestY }

}

function evaluation (grid) {
    let i = 0
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            if (grid[y][x] === 'b') i++
            if (grid[y][x] === 'w') i--
        }
    }
    return i
}