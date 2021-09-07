class Othello {

    constructor() {
        this.width = 8
        this.height = 8
        this.grid = {}
        this.turn = 'b'
        this.logs = []
        this.steps = 0
        this.offsets = [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }, { x: 1, y: 1 }, { x: -1, y: -1 }, { x: 1, y: -1 }, { x: -1, y: 1 }]

        this.initGrid()
    }

    reset() {
        this.turn = 'b'
        this.logs = []
        this.steps = 0
        this.initGrid()
    }

    initGrid() {
        for (let y = -2; y < 10; y++) {
            this.grid[y] = {}
            for (let x = -2; x < 10; x++) {
                this.grid[y][x] = ''
            }
        }
        this.grid[3][3] = 'b'
        this.grid[4][4] = 'b'
        this.grid[4][3] = 'w'
        this.grid[3][4] = 'w'
    }

    getValidPos() {
        const arr = []
        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {
                if (this.place(x, y)) {
                    arr.push({ x, y })
                    this.undo()
                }
            }
        }
        return arr
    }

    place(x, y) {
        if (this.grid[y][x] !== '') return false

        let isValid = false
        this.offsets.forEach(o => {
            if (this.grid[y + o.y][x + o.x] === this.turn) return
            if (this.fillLine(x, y, o.x, o.y)) isValid = true
        })

        if (isValid) {
            this.logs.unshift({ x, y, status: this.grid[y][x], steps: this.steps })
            this.grid[y][x] = this.turn
            this.switch()
            this.steps++
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

        while (true) {
            x -= vx
            y -= vy
            const target = this.grid[y][x]
            if (target === '') return true
            if (target === this.turn) return true
            if (target !== this.turn) {
                this.logs.unshift({ x, y, status: this.grid[y][x], steps: this.steps })
                this.grid[y][x] = this.turn
            }
        }
    }

    switch() {
        this.turn = this.turn === 'b' ? 'w' : 'b'
    }

    undo() {
        if (this.steps > 0) {
            this.steps--
            while (this.logs[0] && this.logs[0].steps === this.steps) {
                const diff = this.logs.shift()
                this.grid[diff.y][diff.x] = diff.status
            }
            this.switch()
        }
    }

    clone() {
        const virtual = new Othello()
        virtual.grid = JSON.parse(JSON.stringify(this.grid))
        virtual.logs = JSON.parse(JSON.stringify(this.logs))
        virtual.turn = this.turn
        virtual.steps = this.steps
        return virtual
    }
}