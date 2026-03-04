def process_dfa(dfa, input_symbols, transition_matrix, input_string):
    """
    Simulates a DFA to determine if a given string is accepted. 
    This is a general template that shows how to ask the user to input data. Then print the result.

    """

    return transition_matrix, "Accepted" if accepted else "Rejected"


# Input DFA parameters
num_states = int(input("Enter the number of states: "))
num_symbols = int(input("Enter the number of input symbols: "))

# Define the set of input symbols
print("Enter the input symbols (space-separated, e.g., '0 1'... or 'a b'...):")

# Input the transition matrix
print("Enter the transition matrix row by row (each row should contain space-separated numbers):")

# Input DFA structure
start_state = int(input("Enter the start state (an integer): "))

# **Fix: Validate accepting states input**
while True:
    try:
        print("Enter the accepting states (space-separated integers, e.g., '1 3'):")
        break  # Exit loop if input is valid
    except ValueError:
        print("Invalid input! Accepting states must be integers. Please try again.")

# Construct the DFA as a dictionary
dfa = {
    "num_states": num_states,
    "start_state": start_state,
    "accepting_states": accepting_states
}

# Keep asking for strings to evaluate until the user decides to exit
# while True:
input_string = input("\nEnter the string to evaluate): ")
"""    
    if input_string.lower() == "exit":
        print("Exiting program. Goodbye!")
        break
"""
    # Process the DFA
result_matrix, result_status = process_dfa(dfa, input_symbols, transition_matrix, input_string)
"""
    # Display results
    print("\nTransition Matrix:")
    for row in result_matrix:
        print(row)
"""
print("Result:", result_status)