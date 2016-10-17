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
        let allKnightsPaths = chess.getAllKnightPaths(cartesianCoorsinates[0],cartesianCoorsinates[1],n);
        jsPlumb.batch(function() {
            allKnightsPaths.forEach(function(path){
                chess.cartesianToAlgebraic(path).forEach(function(currentValue, index, array){
                    if(index + 1 !== array.length){
                        let source = $(".square-55d63[data-square='" + currentValue + "']");
                        let target = $(".square-55d63[data-square='" + array[index+1] + "']");
                        jsPlumb.connect({source, target, anchor: "Center",connector:"Straight"});
                    }
                });
            });
        });
    }
});

jsPlumb.ready(function() {
    $('.board-b72b1').css({position:'relative'});
    jsPlumb.setContainer(document.getElementsByClassName('board-b72b1'));
});
$('#startBtn').on('click', board1.start);
$('#clearBtn').on('click', board1.clear);