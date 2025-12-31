function connect4Winner(player, board) {
    const rows = board.length;
    const cols = board[0].length;

    function checkDirection(r, c, dr, dc) {
        for (let i = 0; i < 4; i++) {
            const nr = r + i * dr;
            const nc = c + i * dc;

            if (
                nr < 0 ||
                nr >= rows ||
                nc < 0 ||
                nc >= cols ||
                board[nr][nc] !== player
            ) return false;
        }
        return true;
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (board[r][c] === player) {
                if (
                    checkDirection(r, c, 0, 1) ||   // →
                    checkDirection(r, c, 1, 0) ||   // ↓
                    checkDirection(r, c, 1, 1) ||   // ↘
                    checkDirection(r, c, 1, -1)     // ↙
                ) return true;
            }
        }
    }
    return false;
}

// expose globally
window.connect4Winner = connect4Winner;
