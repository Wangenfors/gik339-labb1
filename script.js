/* Uppgift 2 - Variabler och scope */
// 1\. Testa console.log före blocket (bortkommenterat för att undvika krasch)
// console.log(blockVar); // Ger undefined (scriptet fortsätter köra)
// console.log(blockLet); // Kraschar med ReferenceError
// console.log(blockConst); // Kraschar med ReferenceError
{ 
    var blockVar = "Jag är skapad med var";
    let blockLet = "Jag är skapad med let";
    const blockConst = "Jag är skapad med const";
    // 2. Logga INUTI blocket – alla tre fungerar här: 
    // console.log("Inuti:", blockVar);
    // console.log("Inuti:", blockLet);
    // console.log("Inuti:", blockConst); 
    }

// 3\. Logga EFTER blocket:
// console.log("Efter:", blockVar); // Fungerar! var läcker ut ur blocket
// console.log("Efter:", blockLet); // Kraschar med ReferenceError
// console.log("Efter:", blockConst); // Kraschar med ReferenceError

/* Reflektion uppgift 2: 
1. Skillnad mellan var, let och const gällande block:
- let och const är bundna till sitt block ({ ... }) och går inte att nå utanför blocket.
- var är inte bunden till vanliga block utan kan nås även utanför blocket (den har funktions-/global scope).
- Skillnaden mellan let och const är att let kan ändras (omtilldelas), medan const är konstant.
2. Vad som händer vid olika placering av console.log():
- Före blocket: var får värdet undefined utan att krascha, medan let och const avbryter hela scriptet med ReferenceError.
- I blocket: Alla tre variabler är nåbara och skriver ut sina värden.
- Efter blocket: var går fortfarande att logga, medan let och const ger ReferenceError eftersom de bara existerar inuti blocket.
*/

// Uppgift 3 & 4 - Funktioner
const add = (num1, num2) => { 
    console.log(num1 == 0);
    console.log(num2 === '0');
    console.log(num2 === 0);
    console.log(num1 == NaN);
    console.log(num1 ? "truthy" : "falsy");

if ( 
    !(num1 === null || num1 === undefined) &&
    !(num2 === null || num2 === undefined) &&
    typeof num1 === "number" &&
    typeof num2 === "number" &&
    !Number.isNaN(num1) &&
    !Number.isNaN(num2) 
) { 
    return num1 + num2;
} else {
    return "Ogiltig input: båda argumenten måste vara siffror."; }
};

/* Reflektion uppgift 3: 
1. Om jag skapat variabeln med let istället för const hade variabeln gått att tilldela 
om senare i koden (t.ex. add = 5;), vilket av misstag skulle kunna skriva över funktionen. 
Med const skyddas variabeln mot omtilldelning.
2. Samma funktion skriven som en funktionsdeklaration:
function add(num1, num2) {
return num1 + num2; 
} 
3. Att en funktion returnerar något innebär att den skickar tillbaka ett resultat till platsen
där funktionen anropades, så att värdet kan sparas i en variabel eller skrivas ut.
*/

/* Reflektion uppgift 4:
1. En ternary operator (villkor ? sant : falskt) är ett kortfattat uttryck som returnerar
ett av två värden och kan användas direkt inne i t.ex. console.log(). En if()-sats styr programflödet
med kodblock ({}) och kan innehålla flera rader kod.
2. Skillnaden mellan == och ===:
- == gör en lös jämförelse med implicit typkonvertering (t.ex. blir '3' == 3 sant).
- === gör en strikt jämförelse där både värde och datatyp måste stämma överens ('3' === 3 blir falskt).
3. Villkoret för null/undefined och datatyp löstes genom att använda !(x === null || x === undefined)
kombinerat med &&a, typeof === "number" samt !Number.isNaN() så att bara riktiga siffror släpps igenom.
*/

/* Uppgift 5 - Anropa funktioner */

// 1. Skapa testvariablerna
const num1 = 0;
let arg1;
let sum = false;

// 2. De 6 testerna (mellanlagrar i sum och skriver ut)
console.log("--- Test 1: add(sum, 1) ---");
sum = add(sum, 1);
console.log("Returvärde:", sum);

console.log("--- Test 2: add('0' , 3) ---");
sum = add('0', 3);
console.log("Returvärde:", sum);

console.log("--- Test 3: add(3, 'num1') ---");
sum = add(3, 'num1');
console.log("Returvärde:", sum);

console.log("--- Test 4: add(-5, num1) ---");
sum = add(-5, num1);
console.log("Returvärde:", sum);

console.log("--- Test 5: add(arg1, 7) ---");
sum = add(arg1, 7);
console.log("Returvärde:", sum);

console.log("--- Test 6: add() ---");
sum = add();
console.log("Returvärde:", sum);

// 3. Skriv ut variablerna num1 och sum efter alla anrop
console.log("--- Slutresultat ---");
console.log("num1:", num1);
console.log("sum:", sum);

/* Reflektion uppgift 5:
1. Skillnaden mellan parameter, variabel och argument:
- Variabel: En namngiven behållare för ett värde i koden (t.ex. const num1 = 0).
- Parameter: Platshållaren i funktionsdefinitionen som tar emot värden (num1, num2 i add).
- Argument: Det faktiska värdet som skickas in när funktionen anropas (t.ex. -5 och num1 i Test 4).
2. Slutvärdet på num1 blir 0. Anledningen är att parametern num1 inuti add() har ett eget lokalt scope
som skuggar den yttre konstanten num1. Den yttre variabeln påverkas alltså inte av funktionsanropen.
3. Steg-för-steg-förklaring av testerna:
- Test 1 (false, 1): false == 0 blir true (typkonvertering), 1 === '0' är false, 1 === 0 är false, false == NaN är false. 
Ternary loggar "falsy". if-satsen misslyckas eftersom false är en boolean.
- Test 2 ("0", 3): "0" == 0 blir true (typkonvertering), 3 === '0' är false, 3 === 0 är false, "0" == NaN är false. 
Ternary loggar "truthy" (icke-tom sträng). if-satsen misslyckas (sträng).
- Test 3 (3, "num1"): Alla fyra jämförelser blir false. Ternary loggar "truthy". if-satsen misslyckas eftersom "num1" är en sträng.
- Test 4 (-5, 0): -5 == 0 är false, 0 === '0' är false, 0 === 0 är true, -5 == NaN är false. Ternary loggar "truthy". Båda är giltiga siffror, så if-satsen returnerar -5 + 0 = -5\.
- Test 5 (undefined, 7): Alla fyra jämförelser blir false. Ternary loggar "falsy" (undefined är falsy). if-satsen misslyckas eftersom arg1 är undefined.
- Test 6 (inga argument): Både num1 och num2 blir undefined. Alla fyra jämförelser blir false, ternary loggar "falsy" och if-satsen misslyckas.
*/

/* Uppgift 6 - Räknare */

const input1 = prompt("Ange det första talet:");
const input2 = prompt("Ange det andra talet:");

// Kontrollera att användaren inte avbröt (null) eller lämnade tomt
if (input1 === null || input2 === null || input1.trim() === "" || input2.trim() === "") {
    console.log("Ogiltig input: du måste fylla i båda fälten.");
} else {
    const numA = Number(input1);
    const numB = Number(input2);

    // Kontrollera att båda faktiskt är siffror (inte NaN)
    if (Number.isNaN(numA) || Number.isNaN(numB)) {
        console.log("Ogiltig input: båda värdena måste vara siffror.");
    } else {
        const calculate = (a, b) => {
            return {
                difference: a - b,
                product: a * b,
                isEqual: a === b 
            };
        };
        
        const result = calculate(numA, numB);
        console.table(result); 
    } 
}

/* Reflektion uppgift 6:
1. Sträng vs array vs objekt:
- Sträng (t.ex. template-sträng) är bra för att visa färdig läsbar text direkt, men svår att plocka ut enskilda värden ur i kod.
- Array passar för listor i en viss ordning, men man måste komma ihåg vilket index (0, 1, 2) som betyder vad.
- Objekt är tydligast eftersom varje resultat har ett beskrivande nyckelnamn (difference, product, isEqual) och fungerar bra med console.table().
2. Kodstruktur:
- Att funktionen gör tre olika beräkningar kan vara smidigt i ett litet exempel, men i större program är det bättre att dela upp funktioner
så att varje funktion har ett enda tydligt ansvar (lättare att återanvända och testa).
*/