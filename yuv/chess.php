<?php
ini_set('xdebug.var_display_max_depth', 10);
ini_set('xdebug.var_display_max_children', 500);

function moveKnight(array $start, array $end, int $maxMoves) {

    if($start === $end) return (object)$end;
    if($maxMoves == 0) return false;

    list($posX, $posY) = $start; 
    if(($posX < 1) || ($posY < 1)) return false;
    if(($posX > 8) || ($posY > 8)) return false;

    $maxMoves--;

    $moves = [
        0 => (object)$start,
        1 => moveKnight([$posX - 1, $posY - 2], $end, $maxMoves),
        2 => moveKnight([$posX - 1, $posY + 2], $end, $maxMoves),
        3 => moveKnight([$posX + 1, $posY - 2], $end, $maxMoves),
        4 => moveKnight([$posX + 1, $posY + 2], $end, $maxMoves),
        5 => moveKnight([$posX - 2, $posY - 1], $end, $maxMoves),
        6 => moveKnight([$posX - 2, $posY + 1], $end, $maxMoves),
        7 => moveKnight([$posX + 2, $posY - 1], $end, $maxMoves),
        8 => moveKnight([$posX + 2, $posY + 1], $end, $maxMoves),
    ];    

    return $moves;
}

function parseMoves($moves) {

    if($moves instanceof stdClass) {
        return $moves;
    }

    $start = $moves[0];
    unset($moves[0]);

    if(empty($moves)) {
        return $start;
    }

    $parsedMoves = [];

    foreach ($moves as $key => $value) {

        $parsedMove = parseMoves($value);

        if($parsedMove instanceof stdClass) {
            $parsedMoves[] = json_encode([(array)$start, (array)$parsedMove]);
        }
        elseif(is_array($parsedMove)) {
            foreach ($parsedMove as $pm) {
                $pmx = json_decode($pm);
                $pmx = array_merge([(array)$start], $pmx);
                $parsedMoves[] = json_encode($pmx);
            }
        }
    }

    return $parsedMoves;
}



$knightMoves = moveKnight([8,8], [6,7], 3);
var_dump(parseMoves($knightMoves));
