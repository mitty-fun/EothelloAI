function AI(game, depth) {
    const startTime = Date.now()
    const result = alphabeta(game.clone(), depth)
    console.log(`depth: ${depth} cost: ${Date.now() - startTime}ms`)
    game.place(result.x, result.y)
}

function alphabeta(game, depth, alpha = -Infinity, beta = Infinity) {

    let best = {
        x: undefined,
        y: undefined,
        score: game.turn === 'w' ? Infinity : -Infinity
    }

    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            if (game.place(x, y)) {

                let result = depth > 0 ? alphabeta(game, depth - 1, alpha, beta) : (
                    { x, y, score: evaluation(game.grid) }
                )

                if (game.turn === 'w' && result.score > best.score) {
                    alpha = best.score = result.score
                    best.x = x
                    best.y = y
                }

                if (game.turn === 'b' && result.score < best.score) {
                    beta = best.score = result.score
                    best.x = x
                    best.y = y
                }

                game.undo()

                if (alpha > beta) return best
            }
        }
    }

    if (best.x === undefined) {
        best.score = evaluation(game.grid)
    }

    return best
}

function evaluation(grid) {
    let score = 0
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            let i = 1
            if (x === 0 || x === 7) i *= 10
            if (y === 0 || y === 7) i *= 10
            if (x === 1 || y === 1 || x === 6 || y === 6) i *= -1
            if (grid[y][x] === 'b') score += i
            if (grid[y][x] === 'w') score -= i
        }
    }
    return score
}