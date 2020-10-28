document.addEventListener("DOMContentLoaded", function() {
  class Game {
    constructor() {
      this.boxs = document.querySelectorAll(".box");
      this.panelResult = document.querySelector(".wrapper__p");
      this.resetButton = document.querySelector(".wrapper__btn");
      this.winCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
      this.resetGame();
      this.boxs.forEach(box => {
        box.addEventListener("click", this.pick);
      });
      this.resetButton.addEventListener("click", () => {
        if (this.finisGame) {
          this.resetGame();
        } else {
          this.panelResult.innerHTML = `Proszę dokończyć pojedynek`;
        }
      });
    }
    resetGame = () => {
      this.playerOne = "fa-times";
      this.playerTwo = "fa-circle-o";
      this.turn;
      this.finisGame = false;
      this.boxsValue = ["", "", "", "", "", "", "", "", ""];
      this.panelResult.innerHTML = "";
      this.boxs.forEach(box => {
        box.classList.remove("fa-times", "fa-circle-o");
      });
    };
    pick = event => {
      if (this.finisGame) return;
      this.panelResult.innerHTML = "";
      const { position } = event.target.dataset;

      if (this.boxsValue[position] !== "") return;
      this.turn =
        this.turn === this.playerOne ? this.playerTwo : this.playerOne;

      this.boxsValue[position] = this.turn;
      event.target.classList.add(this.turn);

      this.checkGame();
    };
    checkGame = () => {
      for (const combination of this.winCombinations) {
        const [posA, posB, posC] = combination;
        const valueI = this.boxsValue[posA];
        const valueII = this.boxsValue[posB];
        const valueIII = this.boxsValue[posC];

        if (valueI != "" && valueI === valueII && valueI === valueIII) {
          this.finisGame = true;
        }
      }
      this.draw = this.boxsValue.find(box => box === "") === undefined;

      if (this.finisGame) {
        this.displayWinMessage();
      } else if (this.draw) {
        this.finisGame = true;
        this.displayDrawMessage();
      }
    };
    displayWinMessage = () => {
      this.winner;
      if (this.turn === "fa-times") {
        this.winner = "PlayerOne";
      } else {
        this.winner = "PlayerTwo";
      }
      this.panelResult.innerHTML = `Gratulację ${this.winner}`;
    };
    displayDrawMessage = () => {
      this.panelResult.innerHTML = `Remis`;
    };
  }

  new Game();
});
