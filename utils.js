var m_w = NaN;
var m_z = NaN;
var mask = 0xffffffff;

var random = {
    seed : function (i) {
        m_w = (123456789 + i) & mask;
        m_z = (987654321 - i) & mask;
    },
    random : function () {
        m_z = (36969 * (m_z & 65535) + (m_z >> 16)) & mask;
        m_w = (18000 * (m_w & 65535) + (m_w >> 16)) & mask;
        let result = ((m_z << 16) + (m_w & 65535)) >>> 0;
        result /= 4294967296;
        return result;
    },
    randomInt : function (limit) {
        return parseInt(this.random() * limit) 
    }
}

// fix shit modulo
Number.prototype.mod = function (n) {
    return ((this % n) + n) % n;
};


function point(x,y) {
    return {
        x,
        y
    }
}

function vertex(id, p) {
    return {
        id,
        p
    }
}

function pointPair(p1,p2) {
    return {
        p1,
        p2
    }
}

// ax + by + c = 0
function line(a,b,c) {
    return {
        a,
        b,
        c
    }
}

function ray(p, dir) {
    return {
        p,
        dir
    }
}

function edge(e1, e2) {
    return {
        e1,
        e2
    }
}

function subtract(p1, p2) {
    return point(p1.x - p2.x, p1.y - p2.y)
}

function normalize(p1) {
    let length = Math.sqrt(p1.x * p1.x + p1.y * p1.y)
    return point(p1.x / length, p1.y / length)
}

function dot(p1, p2) {
    return p1.x * p2.x + p1.y * p2.y
}

function cross(p1, p2) {
    return p1.x * p2.y - p1.y * p2.x
}

function evalLineAt(l1, p1) {
    return l1.a * p1.x + l1.b * p1.y + l1.c
}

function slopePointToLine(p1, m) {
    return line(m, -1, p1.y - m * p1.x)
}

function dirPointToLine(p1, dir) {
    m = dir.y / dir.x
    return slopePointToLine(p1, m)
}

function dirToLine(p1, dir) {
    return slopePointToLine(point(0,0), m)
}

function dirAngle(from, to) {
    let cosAngle = dot(from, to)
    let sinAngle = cross(from, to)
    let angle = Math.acos(cosAngle)
    if (sinAngle > 0) {
        return angle
    } else {
        return 2 * Math.PI - angle;
    }
}

function findQuadrant(origin, point) {
    diff = subtract(point, origin)

    if (diff.x > 0 && diff.y > 0) {
        return 1
    }
    if (diff.x < 0 && diff.y > 0) {
        return 2
    }
    if (diff.x < 0 && diff.y < 0) {
        return 3
    }
    if (diff.x > 0 && diff.y < 0) {
        return 4
    }
}


class Node
{
    constructor(data)
    {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree
{
    constructor()
    {
        this.root = null;
    }
 
    insert(data)
    {
        let newNode = new Node(data);
        if(this.root === null)
            this.root = newNode;
        else
            this.insertNode(this.root, newNode);
    }

    insertNode(node, newNode)
    {
        if(newNode.data < node.data)
        {
            if(node.left === null)
                node.left = newNode;
            else
                this.insertNode(node.left, newNode);
        }
        else
        {
            if(node.right === null)
                node.right = newNode;
            else
                this.insertNode(node.right,newNode);
        }
    }

    remove(data)
    {
        this.root = this.removeNode(this.root, data);
    }
    
    removeNode(node, key)
    {
            
        if(node === null)
            return null;
    
        else if(key < node.data)
        {
            node.left = this.removeNode(node.left, key);
            return node;
        }
        else if(key > node.data)
        {
            node.right = this.removeNode(node.right, key);
            return node;
        }
        else
        {
            if(node.left === null && node.right === null)
            {
                node = null;
                return node;
            }
            if(node.left === null)
            {
                node = node.right;
                return node;
            }
            else if(node.right === null)
            {
                node = node.left;
                return node;
            }

            let aux = this.findMinNode(node.right);
            node.data = aux.data;
    
            node.right = this.removeNode(node.right, aux.data);
            return node;
        }
    
    }

    search(node, data)
    {
        if(node === null)
            return null;
        else if(data < node.data)
            return this.search(node.left, data);
        else if(data > node.data)
            return this.search(node.right, data);
        else
            return node;
    }
}