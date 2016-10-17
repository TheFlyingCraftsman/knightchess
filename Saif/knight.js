var chess = (function(){
  function Point(x,y){
    this.x = x;
    this.y = y;
  }

  function Node(parent, children, point, depth, index) {
    this.parent = parent;
    this.children = children;
    this.point = point;
    this.depth = depth;
    this.index = index;
  }

  function isPointWithinBounds(point){
    return (point.x>0 && point.x<9 && point.y>0 && point.y<9);
  }

  function getNextNodes(node) {
    let moves = [
          new Point(-1,-2),
          new Point(-1,+2),
          new Point(+1,-2),
          new Point(+1,+2),
          new Point(-2,-1),
          new Point(-2,+1),
          new Point(+2,-1),
          new Point(+2,+1)
        ],
        nextNodes = [],
        p = node.point;
    for(let point of moves) {
      let dp = new Point(p.x + point.x, p.y + point.y);
      if(isPointWithinBounds(dp)) {
        nextNodes.push(new Node(node,null,dp,node.depth + 1,0));
      }
    }
    return nextNodes;
  }

  function getAllKnightPaths(start, end, n) {
    let startNode = new Node(null,null,start,0,0),
        path = [start],
        paths = [];
    function moveNextFrom(node) {
      if(node.children === null) {
        node.children = getNextNodes(node);
      }
      else {
        node.index++;
      }
      let children = node.children,
          index = node.index,
          currentChild = children[index];
      if(index>=children.length) {
        if(node.parent!==null){
          path.pop();
          children = null;
          moveNextFrom(node.parent);
        }
      }
      else if(currentChild.point.x===end.x && currentChild.point.y===end.y) {
        path.push(end);
        paths.push(JSON.parse(JSON.stringify(path)));
        path.pop();
        moveNextFrom(node);
      }
      else if(node.depth + 1 >= n) {
        moveNextFrom(node);
      }
      else {
        path.push(currentChild.point);
        moveNextFrom(currentChild);
      }
    }

    moveNextFrom(startNode);
    return paths;
  }

  function algebraicToCartesian(algebraicCoordinates){
    let cartesianCoorsinates = [];
    for(let pos of algebraicCoordinates) {
      cartesianCoorsinates.push(new Point(pos.charCodeAt(0)-96,+pos.charAt(1)))
    }
    return cartesianCoorsinates;
  }

  return {
    getAllKnightPaths: getAllKnightPaths,
    algebraicToCartesian: algebraicToCartesian
  };
}());