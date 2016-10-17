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
    console.log(n=="");

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
        let allKnightsPath = chess.getAllKnightPaths(cartesianCoorsinates[0],cartesianCoorsinates[1],6);
        console.info("START",knightsOnBoard[0]);
        console.info("END",knightsOnBoard[1]);
        console.info("PATHS",allKnightsPath);
    }
});


$('#startBtn').on('click', board1.start);
$('#clearBtn').on('click', board1.clear);