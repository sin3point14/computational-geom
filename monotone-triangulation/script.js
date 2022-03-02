const globals = {
    canvas : document.getElementById("myCanvas"),
    ctx : document.getElementById("myCanvas").getContext("2d"),
    basePoints : {},
    points: [],
    totalPoints: 30,
    internalEdges: []
}

function setColor(col) {
    globals.ctx.fillStyle = col;
}

function plotPoint(point) {
    globals.ctx.beginPath()
    globals.ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI, true)
    globals.ctx.fill()
}

function point(x,y) {
    return {
        x,
        y
    }
}

function edge(e1, e2) {
    return {
        e1,
        e2
    }
}

function generate() {
    globals.basePoints.p1 = point(100, globals.canvas.height - 100)
    globals.basePoints.p2 = point(globals.canvas.width - 100, globals.canvas.height - 100)

    let rangeX = globals.basePoints.p2.x - globals.basePoints.p1.x
    let rangeY = globals.canvas.height - 200

    globals.points.push(globals.basePoints.p1)

    for(i = 0; i < globals.totalPoints; i++) {
        globals.points.push(point(globals.basePoints.p1.x + random.randomInt(rangeX), 
            globals.basePoints.p1.y - random.randomInt(rangeY)))
    }

    globals.points.push(globals.basePoints.p2)

    globals.points.sort((a,b) => a.x - b.x)
}

function drawFig() {
    globals.ctx.beginPath()

    globals.ctx.moveTo(globals.basePoints.p1.x, globals.basePoints.p1.y)

    setColor("#000000")
    globals.points.forEach(e => globals.ctx.lineTo(e.x, e.y))
    globals.ctx.lineTo(globals.basePoints.p2.x, globals.basePoints.p2.y)

    setColor("#ff0000")
    globals.ctx.lineTo(globals.basePoints.p1.x, globals.basePoints.p1.y)

    globals.ctx.stroke()
}

function checkRight(p1, p2, toCheck) {
    return (toCheck.x-p1.x) * (p2.y-p1.y) - (toCheck.y-p1.y) * (p2.x-p1.x) > 0
}

function triangulate() {
    let stack = []

    for(i = 0; i < globals.points.length;) {
        if(stack.length < 2) {
            stack.push(i)
            i++
            continue
        }
        let prev1 = globals.points[stack[stack.length - 1]]
        let prev2 = globals.points[stack[stack.length - 2]]
        if (checkRight(prev1, prev2, globals.points[i])) {
            globals.internalEdges.push(edge(stack[stack.length - 2], i))
            stack.pop()
            // stack.push(i)
        } else {
            stack.push(i)
            i++
        }
    }

    console.log(globals.internalEdges)
}

function plotEdges() {

    globals.ctx.beginPath()

    setColor("#00ff00")

    globals.internalEdges.forEach(e => {
        let {e1, e2} = e
        globals.ctx.moveTo(globals.points[e1].x, globals.points[e1].y)
        globals.ctx.lineTo(globals.points[e2].x, globals.points[e2].y)
    })
    globals.ctx.stroke()
}

// random.seed(0)
random.seed(parseInt(Math.random() * 1000))
generate()
drawFig()
triangulate()
plotEdges()
