class Eothello {

    constructor() {
        this.width = 8
        this.height = 8
        this.grid = {}
        this.turn = 'b'
        this.offsets = [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }, { x: 1, y: 1 }, { x: -1, y: -1 }, { x: 1, y: -1 }, { x: -1, y: 1 }]

        this.initGrid()
    }

    initGrid() {
        for (let y = -2; y < 10; y++) {
            this.grid[y] = {}
            for (let x = -2; x < 10; x++) {
                this.grid[y][x] = ''
            }
        }
        this.grid[4][4] = 'b'
        this.grid[5][5] = 'b'
        this.grid[5][4] = 'w'
        this.grid[4][5] = 'w'
    }

    place(x, y) {
        if (this.grid[y][x] !== '') return false

        let isValid = false
        this.offsets.forEach(o => {
            if (this.grid[y + o.y][x + o.x] === this.turn) return
            if (this.fillLine(x, y, o.x, o.y)) isValid = true
        })

        if (isValid) {
            this.grid[y][x] = this.turn
            this.turn = this.turn === 'b' ? 'w' : 'b'
        }

        return isValid
    }

    fillLine(x, y, vx, vy) {
        
        while (true) {
            x += vx
            y += vy
            const target = this.grid[y][x]
            if (target === '') return false
            if (target === this.turn) break
        }

        while(true) {
            x -= vx
            y -= vy
            const target = this.grid[y][x]
            if (target === '') return true
            if (target === this.turn) return true
            if (target !== this.turn) this.grid[y][x] = this.turn
        }
    }
}