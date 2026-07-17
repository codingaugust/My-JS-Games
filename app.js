let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newGamebtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // playerA, playerS
let count = 0; // 👈 Yeh nayi line add karein

const winPatterns =[
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () =>{
    turnO = true;
    count = 0;
    enableboxes();
    msgContainer.classList.add("hide");

    boxes.forEach((box) => {
        box.classList.remove("color-S", "color-A"); 
    });
};

boxes.forEach ((box) =>{
    box.addEventListener("click",()=>{
        if(turnO){
            // playerO
            box.innerText = "S";
            box.classList.add("color-S"); 
            turnO = false;
        }else{
            // playerX
            box.innerText = "A";
            box.classList.add("color-A");
            turnO = true;
        }
        box.disabled = true;
        count++;
        let isWinner = checkWinner();
        if (count === 9 && !isWinner) {
            msg.innerText = "Game was a Draw!";
            msgContainer.classList.remove("hide");
            disableboxes();
        }
    });
});

const disableboxes = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
};
const enableboxes = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (Winner) => {
    msg.innerText = `Congratulation, winner is ${Winner}`;
    msgContainer.classList.remove("hide");
    disableboxes();
};

const checkWinner = () => {
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val);
                return true; 
            }
        }
    }
    return false; 
};


newGamebtn.addEventListener("click",resetGame);
resetbtn.addEventListener("click",resetGame);