function solve(input){
    const heroes = {};

    const numberOfCharacters = Number(input.shift());

    for (let i = 0; i < numberOfCharacters; i++) {
        let [heroName, hp, bullets] = input[i].split(" ");
        if (!heroes.hasOwnProperty(heroName)){
            heroes[heroName] = {hp, bullets}
        }
       
    }

    input = input.slice(numberOfCharacters);
    
    let command = input.shift();
    while (command !== 'Ride Off Into Sunset'){
        const [action, charName, ...args] = command.split(" - ");

        if (action === 'FireShot'){
            const target = args[0];
            
            if (heroes[charName].bullets > 0){
                heroes[charName].bullets -= 1;
                console.log(`${charName} has successfully hit ${target} and now has ${heroes[charName].bullets} bullets!`);
            }else{
                console.log(`${charName} doesn't have enough bullets to shoot at ${target}!`);
            }

        }else if (action === 'TakeHit'){
            const [damage, attacker] = args;
            let hpHero = heroes[charName].hp
            hpHero -= damage;
            
            if (hpHero > 0){
                heroes[charName].hp -= Number(damage);
                console.log(`${charName} took a hit for ${damage} HP from ${attacker} and now has ${hpHero} HP!`);
            }else{
                delete heroes[charName];
                console.log(`${charName} was gunned down by ${attacker}!`);
            } 

        }else if (action === 'Reload'){
            const maxBullets = 6;
            const currentBullets = heroes[charName].bullets;

            if(heroes[charName].bullets < maxBullets){
                heroes[charName].bullets = 6;
                console.log(`${charName} reloaded ${maxBullets - currentBullets} bullets!`);
            }else{
                console.log(`${charName}'s pistol is fully loaded!`);
            }

        }else if (action === 'PatchUp'){
            const amount = Number(args[0]);
            let currentHp = heroes[charName].hp;

            if (amount + currentHp > 100){
                heroes[charName].hp = 100;
                console.log(`${charName} patched up and recovered ${heroes[charName].hp - currentHp} HP!`);
            }else if (currentHp === 100){
               console.log(console.log(`${charName} is in full health!`));
            }else{
                heroes[charName].hp += amount;
                console.log(`${charName} patched up and recovered ${amount} HP!`);
            }
            
        }

        command = input.shift();
    }

    for (const [hero, info] of Object.entries(heroes)) {
        console.log(`${hero}\n  HP: ${info.hp}\n  Bullets: ${info.bullets}`);
        
    }

}

solve(["2",
"Gus 100 0",
"Walt 100 6",
"FireShot - Gus - Bandit",
"TakeHit - Gus - 100 - Bandit",
"Reload - Walt",
"Ride Off Into Sunset"])




