// DINAMICA DO CODIGO //
/*
    Definir variaveis das pontuacoes do usuario e do computador; alem de promover outras variaveis para mudar os valores no front-end
    Basicamente, define-se uma variavel que vai ser a escolha do usuario e outra que sera aleatoriamente definida pelo computador. 
    Em seguida, determinar um metodo de comparacao entre os valores das duas variaveis e definir um 'vencedor'. 
*/
let userScore = 0;
let computerScore = 0;
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
const scoreBoard_div = document.querySelector(".placar");
const result_p = document.querySelector(".resultado > p"); // devolvendo o resultado da comparacao PEDRA, PAPEL OU TESOURA; dentro da tag elemento 'p'
const rock_div = document.getElementById("r"); // PEDRA
const paper_div = document.getElementById("p"); // PAPEL
const scissors_div = document.getElementById("s"); // TESOURA

// NOVA SECAO
// funcao para o computador definir um valor
function getComputerChoice(){
    const choices = ['r', 'p', 's']; 
    const randomNumber = Math.floor(Math.random() * 3); // logica em JS para determinar a escolha aleatoria de um valor entre 0 e 3
    return choices[randomNumber]; // aqui define um valor numerico para uma letra r, p e s ou elementos do vetor 'choices' 
}
// funcao para converter os valores de 'r','p' e 's'; em palavras completas 'Pedra', 'Papel' ou 'Tesoura'
function convertToWord(letter){
    if (letter == "r") return "Pedra";
    if (letter == "p") return "Papel";
    return "Tesoura"; // se nem um dos dois for "r" ou "p"; entao retorna 'Tesoura' como se fosse um "else".
}
function win(userChoice, computerChoice){
    const userChoice_div = document.getElementById(userChoice);
    userScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = `Você escolheu ${convertToWord(userChoice)} e o Computador escolheu ${convertToWord(computerChoice)}.<br>
                        ${convertToWord(userChoice)} vence de ${convertToWord(computerChoice)}. Você venceu &#x1F525`; // sintaxe para o CSS5
    userChoice_div.classList.add('green-glow');
    setTimeout(function() {userChoice_div.classList.remove('green-glow')}, 300)
}
function lose(userChoice, computerChoice){
    const userChoice_div = document.getElementById(userChoice);
    computerScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = `Você escolheu ${convertToWord(userChoice)} e o Computador escolheu ${convertToWord(computerChoice)}.<br>
                        ${convertToWord(userChoice)} perde para ${convertToWord(computerChoice)}. Você perdeu &#x1F480`; // sintaxe para o CSS5 
    userChoice_div.classList.add('red-glow');
    setTimeout(function() {userChoice_div.classList.remove('red-glow')}, 300)
}
function draw(userChoice, computerChoice){
    const userChoice_div = document.getElementById(userChoice);
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = `Você escolheu ${convertToWord(userChoice)} e o Computador escolheu ${convertToWord(computerChoice)}.<br>
                        Houve um EMPATE &#x1F435`; // sintaxe para o CSS5 
    userChoice_div.classList.add('gray-glow');
    setTimeout(function() {userChoice_div.classList.remove('gray-glow')}, 300)
}
// funcao para o usuario definir um valor
/*
A LOGICA UTILIZADA NA FUNCAO GAME, EH DECIDIR UM VENCEDOR ATRAVES DA SOMA DAS STRINGS COMO SE OBSERVA NA LINHA 31
NESTE CASO, "R" DE ROCK; "P" DE PAPER; E "S" DE SCISSOR; PODEMOS USAR UM SWITCH PARA DEFINIR UM VENCEDOR ATRAVES 
DA CASE  NAS SITUACOES DE 
"RP" => ROCK AND PAPER; PAPER VENCE !
"RS" => ROCK AND SCISSOR; ROCK VENCE ! 
"RR" => EMPATE, OU ANULA RODADA...
"PR" => PAPER AND ROCK; PAPER VENCE
"PS" => PAPER AND SCISSOR; SCISSOR VENCE !
"PP" => EMPATE, OU ANULA RODADA
"SR" => SCISSOR AND ROCK; ROCK VENCE !
"SP" => SCISSOR AND PAPER; SCISSOR VENCE !
"SS" => EMPATE, OU ANULA RODADA
.
.
.
*/
function game(userChoice){
    const computerChoice = getComputerChoice();
    switch(userChoice + computerChoice){
        case "rs":
        case "pr":
        case "sp":
            win(userChoice, computerChoice); // FUNCAO INDICANDO COMPARATIVO PARA VITORIA 
        break;
        case "rp":
        case "ps":
        case "sr":
            lose(userChoice, computerChoice); // FUNCAO INDICANDO COMPARATIVO  PARA DERROTA
        break;
        case "rr":
        case "pp":
        case "ss":
            draw(); // FUNCAO DETERMINANDO EMPATE
        break;
    }
}

game("c");

function main(){

    rock_div.addEventListener('click',function(){
        game("r");
    }) // adicionando um evento para o botao de Pedra 

    paper_div.addEventListener('click',function(){
        game("p");
    }) // adicionando um evento para o botao de Papel 

    scissors_div.addEventListener('click',function(){
        game("s");
    }) // adicionando um evento para o botao de Tesoura 
}

main();