// DOM Methods
function createConnector(diagram) {
    var connector = document.createElement('div');
    diagram.appendChild(connector);
    return connector;
}
function connect(connector, vector) {
    // place the top&left corner of the connector such that the midpoint of the connector
    // intersects the midpoint of the final path and can simply rotate into place.
    var pivot = vectorMidpoint(vector);
    connector.style.left = pivot.x - connector.offsetWidth / 2 + 'px';
    connector.style.top = pivot.y - vector.magnitude / 2 + 'px';
    // stretch to the other midpoint
    connector.style.height = vector.magnitude + 'px';
    connector.style.transform = 'rotate(' + polarToCompass(vector.angle) + 'rad)';
}
function closestAttachments(e1, e2) {
    return combinations(attachmentPoints(e1), attachmentPoints(e2)).sort(function (pair1, pair2) {
        return dz(pair1) - dz(pair2);
    })[0];
}
function attachmentPoints(element) {
    var borderWidth = parseInt(window.getComputedStyle(element).borderWidth || '', 10);
    var xs = [
        element.offsetLeft + element.offsetWidth / 2,
        element.offsetLeft + borderWidth,
        element.offsetLeft + element.offsetWidth - borderWidth
    ];
    var ys = [
        element.offsetTop + element.offsetHeight / 2,
        element.offsetTop + borderWidth,
        element.offsetTop + element.offsetHeight - borderWidth
    ];
    return combinations(xs, ys).map(pairToPoint);
}
// MATH METHODS
// TODO: private
function polarToCompass(rad) {
    return (2.5 * Math.PI - rad) % (2 * Math.PI);
}
function vector(pointA, pointB) {
    var dx = pointB.x - pointA.x;
    var dy = pointB.y - pointA.y;
    var dz = Math.sqrt(dx * dx + dy * dy);
    // NOTE: y coordinate is inverted!
    var angle = Math.atan2(-1 * dy, dx);
    return {
        point: pointA,
        magnitude: dz,
        angle: angle
    };
}
function vectorMidpoint(vec) {
    var dx = vec.magnitude / 2 * Math.cos(vec.angle);
    var dy = vec.magnitude / 2 * Math.sin(vec.angle);
    return {
        x: vec.point.x + dx,
        y: vec.point.y - dy // NOTE: y coordinate is inverted!
    };
}
function shrinkVec(vec, shrink) {
    return {
        point: vec.point,
        magnitude: vec.magnitude - shrink,
        angle: vec.angle
    };
}
function pairToPoint(pointPair) {
    return { x: pointPair[0], y: pointPair[1] };
}
function combinations(a1, a2) {
    var pairs = [];
    a1.forEach(function (i1) {
        a2.forEach(function (i2) {
            pairs.push([i1, i2]);
        });
    });
    return pairs;
}
function dz(pointPair) {
    return vector(pointPair[0], pointPair[1]).magnitude;
}
