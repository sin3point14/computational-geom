
const globals = {
    canvas : document.getElementById("myCanvas"),
    ctx : document.getElementById("myCanvas").getContext("2d"),
    vertexGraph : new Map()
}

function plotPoint(point) {
    // globals.ctx.moveTo(point.x, point.y)
    // globals.ctx.lineTo(point.x + 1, point.y + 1)
    globals.ctx.beginPath()
    globals.ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI, true)
    globals.ctx.fill()
}

for(i = 0; i < 30; i++) {
    globals.vertexGraph.set(i, {
        x: randomInt(globals.canvas.width),
        y: randomInt(globals.canvas.width),
        adj: []
    })

    plotPoint(globals.vertexGraph.get(i))
}

globals.ctx.stroke()
