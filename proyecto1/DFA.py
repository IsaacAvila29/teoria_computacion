#Isaac Avila Saenz 238925
"""DFA Simulator - Standard DFA Run Algorithm (Aho & Ullman)

Simulates a Deterministic Finite Automaton (DFA) on input strings.
Returns "yes" (accepted) or "no" (rejected).

Transition matrix format: array of rows; each row has exactly `num_symbols`
integers indicating the destination state for each symbol index.
Use negative numbers (e.g., -1) to indicate dead/no-transition states.
"""

from typing import Any
from dataclasses import dataclass
@dataclass
class DFA:
    """Represents a Deterministic Finite Automaton."""
    startState: int
    acceptingStates: set[int]


def simulateDfa(dfa: DFA, symbols: list[str], transitionMatrix: list[list[int]], inputString: str) -> str:
    """Simulate DFA on input string. Returns 'yes' or 'no'.
    
    Args:
        dfa: DFA instance with startState and acceptingStates
        symbols: Ordered array mapping characters to column indices
        transitionMatrix: 2D array where row s, column i gives next state
        inputString: Input string to simulate
    """
    symbolToIndex = {}
    for i, sym in enumerate(symbols):
        if sym not in symbolToIndex:
            symbolToIndex[sym] = i
    current = dfa.startState

    for ch in inputString:
        if ch not in symbolToIndex:
            return "no"
        
        idx = symbolToIndex[ch]
        if current < 0 or current >= len(transitionMatrix):
            return "no"
        
        row = transitionMatrix[current]
        if idx < 0 or idx >= len(row):
            return "no"
        
        nextState = row[idx]
        if nextState is None or nextState < 0:
            return "no"
        
        current = nextState

    return "yes" if current in dfa.acceptingStates else "no"

def readTransitionMatrix(numStates: int, numSymbols: int) -> list[list[int]]:
    """Read transition matrix from stdin: one row per state.
    
    Args:
        numStates: Number of states
        numSymbols: Number of symbols per row
    
    Returns:
        Transition matrix as 2D list
    """
    matrix: list[list[int]] = []
    
    for s in range(numStates):
        valid = False
        while not valid:
            line = input(f"Row for state {s} (space-separated {numSymbols} ints): ").strip()
            parts = line.split()
            
            if len(parts) != numSymbols:
                print(f"Expected {numSymbols} values, got {len(parts)}. Try again.")
                continue
            
            try:
                row = [int(p) for p in parts]
                matrix.append(row)
                valid = True
            except ValueError:
                print("All entries must be integers. Use -1 for dead states.")
    
    return matrix

def exampleDfaAbb() -> tuple[DFA, list[str], list[list[int]]]:
    """Example DFA for language (a|b)*abb.
    
    Returns:
        Tuple of (dfa, symbols, transitionMatrix)
    """
    symbols = ['a', 'b']
    transitionMatrix = [
        [1, 0],  # state 0: a→1, b→0
        [1, 2],  # state 1: a→1, b→2
        [1, 3],  # state 2: a→1, b→3
        [1, 0],  # state 3: cycle back on success
    ]
    dfa = DFA(startState=0, acceptingStates={3})
    return dfa, symbols, transitionMatrix


def main() -> None:
    """Parse DFA from stdin and simulate it on input string.
    
    Expected format:
    1) num_states (int)
    2) num_symbols (int)
    3) symbols (space-separated)
    4) transition matrix (num_states rows)
    5) start state (int)
    6) accepting states (space-separated ints)
    7) input string
    """
    import sys

    dataLines = [line.rstrip('\n') for line in sys.stdin]
    
    # Remove leading empty lines but preserve structure
    while dataLines and not dataLines[0].strip():
        dataLines.pop(0)

    if not dataLines:
        return

    ptr = 0
    try:
        numStates = int(dataLines[ptr].strip())
        ptr += 1
        numSymbols = int(dataLines[ptr].strip())
        ptr += 1
    except Exception:
        raise SystemExit("Invalid header: expected numStates and numSymbols")

    symbols = dataLines[ptr].strip().split()
    ptr += 1
    
    if len(symbols) != numSymbols:
        raise SystemExit("Number of symbols does not match the given count.")

    # Parse transition matrix
    transitionMatrix: list[list[int]] = []
    for s in range(numStates):
        if ptr >= len(dataLines):
            raise SystemExit(f"Not enough transition rows (expected {numStates}, got {s})")
        
        parts = dataLines[ptr].strip().split()
        ptr += 1
        
        if len(parts) != numSymbols:
            raise SystemExit(f"Row {s} must have {numSymbols} entries, got {len(parts)}")
        
        try:
            transitionMatrix.append([int(p) for p in parts])
        except ValueError:
            raise SystemExit("Transition entries must be integers")

    # Parse DFA config
    if ptr >= len(dataLines):
        raise SystemExit("Missing start state")
    startState = int(dataLines[ptr].strip())
    ptr += 1

    if ptr >= len(dataLines):
        raise SystemExit("Missing accepting states")
    acceptingStates = set(
        int(x) for x in dataLines[ptr].strip().split() if x
    )
    ptr += 1

    # Input string can be empty
    if ptr >= len(dataLines):
        inputString = ""
    else:
        inputString = dataLines[ptr]

    # Run simulation
    dfa = DFA(startState=startState, acceptingStates=acceptingStates)
    result = simulateDfa(dfa, symbols, transitionMatrix, inputString)
    
    status = "Accepted" if result == "yes" else "Rejected"
    print(f"Result: {status}")
if __name__ == '__main__':
    main()      