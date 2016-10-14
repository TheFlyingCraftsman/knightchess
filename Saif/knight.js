function getNextStates(state) {
  let moves = [[-1,-2],[-1,+2],[+1,-2],[+1,+2],[-2,-1],[-2,+1],[+2,-1],[+2,+1]],
    nextStates = [],
    p0 = state.position[0],
    p1 = state.position[1],
    depth = state.depth + 1;
  for(let delta of moves) {
    let x = p0 + delta[0],
      y = p1 + delta[1];
    if(x>0 && x<9 && y>0 && y<9) {
      nextStates.push({
        parent: state,
        children: null,
        position: [x,y],
        depth: depth,
        index: 0
      });
    }
  }
  return nextStates;
}

function getAllKnightPaths(start, end, n) {
  let stateTree = {
        parent: null,
        children: null,
        position: start,
        depth: 0,
        index: 0
    },
    path = [start],
    paths = [];
  function moveNextFrom(thisState) {
    if(thisState.children === null) {
      thisState.children = getNextStates(thisState);
    }
    else{
      thisState.index++;
    }
    if(thisState.index>=thisState.children.length) {
      if(thisState.parent===null) {
        console.info('finished');
        return;
      }
      else {
        path.pop();
        thisState.children = null;
        moveNextFrom(thisState.parent);
        return;
      }
    }
    let currentChildren = thisState.children[thisState.index],
        currentPos = currentChildren.position;
    if(currentPos[0]===end[0] && currentPos[1]===end[1]) {
      path.push(end);
      paths.push(JSON.parse(JSON.stringify(path)));
      path.pop();
      moveNextFrom(thisState);
    }
    else if(thisState.depth + 1 === n){
      moveNextFrom(thisState);
    }
    else {
      path.push(currentPos);
      moveNextFrom(currentChildren);
    }
  }

  moveNextFrom(stateTree);
  return paths;
}