/**
 * Created by ballgobina on 17/10/2016.
 */
var board1 = ChessBoard('board1', {
    position : {a1: 'bN'},
    draggable: true,
    dropOffBoard: 'trash',
    sparePieces: true
});
$('#locateKnights').on('click', function(){
    let piecesOnBoard = board1.position();
    let knightsOnBoard = [];
    let n = $('#txtMaxKnightsMove').val();
    Object.keys(piecesOnBoard).forEach(function (position) {
        if(piecesOnBoard[position]==="bN"){
            knightsOnBoard.push(position);
        }
    });
    if(knightsOnBoard.length > 2) {
        alert("Too many knights on board. Only two required");
    }
    else if(knightsOnBoard.length < 2) {
        alert("Not enough knights on board. Two required");
    }
    else if(!n) {
        alert("Please input the max knight move");
    }
    else {
        let cartesianCoorsinates = chess.algebraicToCartesian(knightsOnBoard);
        let allKnightsPath = chess.getAllKnightPaths(cartesianCoorsinates[0],cartesianCoorsinates[1],n);
        console.info("START",knightsOnBoard[0]);
        console.info("START",knightsOnBoard[0]);
        console.info("n",n);
        console.info("PATHS",allKnightsPath);

        /*jsPlumb.batch(function() {
            // import here
            for (var i = 0, j = connections.length; i < j; i++) {
                jsPlumb.connect(connections[i]);
            }
        });*/
    }
});

jsPlumb.ready(function() {
    $('.board-b72b1').css({position:'relative'});
    jsPlumb.setContainer(document.getElementsByClassName('board-b72b1'));
});
$('#startBtn').on('click', board1.start);
$('#clearBtn').on('click', board1.clear);