"""Simple number guessing game."""

import random


def play():
    secret = random.randint(1, 100)
    attempts = 0

    print("Guess the number (1-100)!")

    while True:
        try:
            guess = int(input("Your guess: "))
        except ValueError:
            print("Please enter a valid number.")
            continue

        attempts += 1

        if guess < secret:
            print("Too low.")
        elif guess > secret:
            print("Too high.")
        else:
            print(f"Correct! You got it in {attempts} attempt(s).")
            break


if __name__ == "__main__":
    play()
