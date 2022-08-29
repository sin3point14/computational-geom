const globals = {
    canvas : document.getElementById("myCanvas"),
    ctx : document.getElementById("myCanvas").getContext("2d"),
    points: [],
    totalPoints: 30,
    sortedVertices: []
}

function setColor(col) {
    globals.ctx.fillStyle = col;
}

function plotPoint(point) {
    globals.ctx.beginPath()
    globals.ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI, true)
    globals.ctx.fill()
}

function generate() {
    let maxRadius = (globals.canvas.height - 200) / 2
    let tempData = []
    let center = point(globals.canvas.width / 2, globals.canvas.height / 2)

    for (i = 0; i < globals.totalPoints; i++) {
        tempData.push({
            dist: random.random() * maxRadius,
            angle: random.random() * Math.PI * 2
        })
    }

    tempData.sort((a, b) => a.angle - b.angle)

    globals.points = tempData.map(e => point(center.x + e.dist * Math.cos(e.angle), center.y - e.dist * Math.sin(e.angle)))

    globals.sortedVertices = globals.points.map((e, i) => vertex(i, e))

    globals.sortedVertices.sort((a, b) => a.p.x - b.p.x)
}


function drawFig() {
    globals.ctx.beginPath()

    globals.ctx.moveTo(globals.points[0].x, globals.points[0].y)

    setColor("#000000")
    globals.points.forEach(e => globals.ctx.lineTo(e.x, e.y))

    setColor("#ff0000")
    globals.ctx.lineTo(globals.points[0].x, globals.points[0].y)

    globals.ctx.stroke()
}

function calcYLines() {
    let rays = []
    globals.sortedVertices.forEach((e) => {
        curr = e.p
        prev = globals.points[(e.id - 1) % globals.points.length]
        next = globals.points[(e.id + 1) % globals.points.length]
        
        let diffPrev = normalize(subtract(curr, prev))
        let diffNext = normalize(subtract(curr, next))
        let diffPosY = point(0, 1)
        let diffNegY = point(0, -1)

        let angleNext = dirAngle(diffPrev, diffNext)
        let anglePosY = dirAngle(diffPrev, diffPosY)
        let angleNegY = dirAngle(diffPrev, diffNegY)

        if (angleNegY < angleNext)
            rays.push(ray(curr, point(0, -1)))

        if (anglePosY < angleNext)
            rays.push(ray(curr, point(0, 1)))
        
        
        
    })
}



random.seed(0)
generate()
drawFig()
// calcYLines()
// drawYLines()
trapezoid()
