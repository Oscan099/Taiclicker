/* Med document.queryselector(selector) kan vi hämta
 * de element som vi behöver från html dokumentet.
 * Vi spearar elementen i const variabler då vi inte kommer att
 * ändra dess värden.
 * Läs mer:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
 * Viktigt: queryselector ger oss ett html element eller flera om det finns.
 */
const clickerButton = document.querySelector('#click');
const moneyTracker = document.querySelector('#money');
const mpsTracker = document.querySelector('#mps'); // money per second
const mpcTracker = document.querySelector('#mpc'); // money per click
const upgradeList = document.querySelector('#upgradelist');
const msgbox = document.querySelector('#msgbox');

/* Följande variabler använder vi för att hålla reda på hur mycket pengar som
 * spelaren, har och tjänar.
 * last används för att hålla koll på tiden.
 * För dessa variabler kan vi inte använda const, eftersom vi tilldelar dem nya
 * värden, utan då använder vi let.
 * Läs mer: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
 */
let money = 0;
let moneyPerClick = 1;
let moneyPerSecond = 0;
let last = 0;

let achievementTest = false;
let achievementTest2 = false;
let achievementTest3 = false;
let achievementTest4 = false;
let achievementTest5 = false;
let achievementTest6 = false;
let achievementTest7 = false;
let achievementTest8 = false;
let achievementTest9 = false;
let achievementTest10 = false;
/* Med ett valt element, som knappen i detta fall så kan vi skapa listeners
 * med addEventListener så kan vi lyssna på ett specifikt event på ett html-element
 * som ett klick.
 * Detta kommer att driva klickerknappen i spelet.
 * Efter 'click' som är händelsen vi lyssnar på så anges en callback som kommer
 * att köras vi varje klick. I det här fallet så använder vi en anonym funktion.
 * Koden som körs innuti funktionen är att vi lägger till moneyPerClick till
 * money.
 * Läs mer: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
 */
clickerButton.addEventListener(
    'click',
    () => {
        // vid click öka score med 1
        money += moneyPerClick;
        // console.log(clicker.score);
    },
    false
);

/* För att driva klicker spelet så kommer vi att använda oss av en metod som heter
 * requestAnimationFrame.
 * requestAnimationFrame försöker uppdatera efter den refresh rate som användarens
 * maskin har, vanligtvis 60 gånger i sekunden.
 * Läs mer: https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
 * funktionen step används som en callback i requestanaimationframe och det är
 * denna metod som uppdaterar webbsidans text och pengarna.
 * Sist i funktionen så kallar den på sig själv igen för att fortsätta uppdatera.
 */
function step(timestamp) {
    moneyTracker.textContent = Math.round(money);
    mpsTracker.textContent = moneyPerSecond;
    mpcTracker.textContent = moneyPerClick;

    if (timestamp >= last + 1000) {
        money += moneyPerSecond;
        last = timestamp;
    }

    // exempel på hur vi kan använda värden för att skapa tex 
    // achievements. Titta dock på upgrades arrayen och gör något rimligare om du
    // vill ha achievements.
    // på samma sätt kan du även dölja uppgraderingar som inte kan köpas
    if (moneyPerClick >= 10 && !achievementTest) {
        achievementTest = true;
        money += 300;
        message('Uncommon Monster Slain!', 'achievement');
    }
    if (moneyPerClick >= 100 && !achievementTest2) {
        achievementTest2 = true;
        money += 10000
        message('Rare Monster Slain!', 'achievement2');
    }
    if (moneyPerClick >= 1000 && !achievementTest3) {
        achievementTest3 = true;
        money += 45000
        message('Epic Monster Slain!', 'achievement3');
    }
    if (moneyPerClick >= 10000 && !achievementTest4) {
        achievementTest4 = true;
        money += 300000
        message('Legendary Monster Slain!', 'achievement4');
    }
    if (moneyPerClick >= 1000000 && !achievementTest5) {
        achievementTest5 = true;
        money += 50000000
        message('Mythical Monster Slain!', 'achievement5');
    }
    if (moneyPerClick >= 10000000 && !achievementTest6) {
        achievementTest6 = true;
        money += 300000000
        message('Eldritch Monster Slain!', 'achievement6');
    }
    if (moneyPerClick >= 100000000 && !achievementTest7) {
        achievementTest7 = true;
        money += 6000000000
        message('Void Lord Slain!', 'achievement7');
    }
    if (moneyPerClick >= 1000000000 && !achievementTest8) {
        achievementTest8 = true;
        money += 90000000000
        message('Demi-god Slain!', 'achievement8');
    }
    if (moneyPerClick >= 5000000000 && !achievementTest9) {
        achievementTest9 = true;
        money = Infinity
        message('God Monster Slain!', 'achievement9');
    }
    if (moneyPerClick >= Infinity && !achievementTest10) {
        achievementTest10 = true;
        money = NaN
        message('YOU ARE THE MOST POWERFUL CREATURE IN THE KNOWN UNIVERSE!', 'achievement10');
    }
    window.requestAnimationFrame(step);
}

/* Här använder vi en listener igen. Den här gången så lyssnar iv efter window
 * objeket och när det har laddat färdigt webbsidan(omvandlat html till dom)
 * När detta har skett så skapar vi listan med upgrades, för detta använder vi
 * en forEach loop. För varje element i arrayen upgrades så körs metoden upgradeList
 * för att skapa korten. upgradeList returnerar ett kort som vi fäster på webbsidan
 * med appendChild.
 * Läs mer:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
 * https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild
 * Efter det så kallas requestAnimationFrame och spelet är igång.
 */
window.addEventListener('load', (event) => {
    console.log('page is fully loaded');
    upgrades.forEach((upgrade) => {
        upgradeList.appendChild(createCard(upgrade));
    });
    window.requestAnimationFrame(step);
});

/* En array med upgrades. Varje upgrade är ett objekt med egenskaperna name, cost
 * och amount. Önskar du ytterligare text eller en bild så går det utmärkt att
 * lägga till detta.
 * Läs mer:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer
 */
upgrades = [
    {
        name: '. . . . . . . . . . .[Fists]', 
        class: 'fists',
        cost: 10,
        clicks: 1,
    },
    {
        name: '. . . . . . . . . . .[Strength]', 
        class: 'str',
        cost: 10,
        amount: 10
    },
    {
        name: '. . . . . . . . . . .[Wooden Sword]',
        class: 'wood-sword',
        cost: 100,
        clicks: 5,
    },
    {
        name: '. . . . . . . . . . .[Metal blade]',
        class: 'metal-blade',
        cost: 2500,
        clicks: 30,
    },
    {
        name: '. . . . . . . . . . .[Sharpness]',
        class: 'sharpness',
        cost: 3000,
        amount: 30,
    },
    {
        name: '. . . . . . . . . . .[Sappy Slappy]',
        class: 'slap',
        cost: 30000,
        clicks: 100,
    },
    {
        name: '. . . . . . . . . . .[Eldritch blade]',
        class: 'eldritch-blade',
        cost: 450000,
        clicks: 720,
    },
    {
        name: '. . . . . . . . . . .[Star Slasher]',
        class: 'star-slash',
        cost: 4500000,
        clicks: 10000,
    },
    {
        name: '. . . . . . . . . . .[Nuke]',
        class: 'nuke',
        cost: 45000000,
        clicks: 100000,
    },
    {
        name: '. . . . . . . . . . .[EXTERMINATUS]',
        class: 'exterm',
        cost: 950000000,
        clicks: 100000000,
    },
];

/* createCard är en funktion som tar ett upgrade objekt som parameter och skapar
 * ett html kort för det.
 * För att skapa nya html element så används document.createElement(), elementen
 * sparas i en variabel så att vi kan manipulera dem ytterligare.
 * Vi kan lägga till klasser med classList.add() och text till elementet med
 * textcontent = 'värde'.
 * Sedan skapas en listener för kortet och i den hittar vi logiken för att köpa
 * en uppgradering.
 * Funktionen innehåller en del strängar och konkatenering av dessa, det kan göras
 * med +, variabel + 'text'
 * Sist så fäster vi kortets innehåll i kortet och returnerar elementet.
 * Läs mer:
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
 * https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
 * https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
 */
function createCard(upgrade) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.classList.add(upgrade.class);
    const header = document.createElement('p');
    header.classList.add('title');
    const cost = document.createElement('p');
    if (upgrade.amount) {
        header.textContent = `${upgrade.name}, +${upgrade.amount} Souls/Second.`;
    } else {
        header.textContent = `${upgrade.name}, +${upgrade.clicks} Souls/Click.`;
    }
    cost.textContent = `Buy For ${upgrade.cost} Souls.`;
    card.addEventListener('click', (e) => {
        if (money >= upgrade.cost) {
            moneyPerClick++;
            money -= upgrade.cost;
            upgrade.cost *= 1.2
            cost.textContent = 'Buy For ' + Math.round(upgrade.cost) + ' Souls';
            moneyPerSecond += upgrade.amount ? upgrade.amount : 0;
            moneyPerClick += upgrade.clicks ? upgrade.clicks : 0;
            message('Congratulations, you feel stronger!', 'success');
        } else {
            message('You are broke.', 'warning');
        }
        if (moneyPerClick >= 100000000000) {
            moneyPerClick += Infinity
    }
    });

    card.appendChild(header);
    card.appendChild(cost);
    return card;
}

/* Message visar hur vi kan skapa ett html element och ta bort det.
 * appendChild används för att lägga till och removeChild för att ta bort.
 * Detta görs med en timer.
 * Läs mer:
 * https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild
 * https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout
 */
function message(text, type) {
    const p = document.createElement('p');
    p.classList.add(type);
    p.textContent = text;
    msgbox.appendChild(p);
    setTimeout(() => {
        p.parentNode.removeChild(p);
    }, 2000);
}
