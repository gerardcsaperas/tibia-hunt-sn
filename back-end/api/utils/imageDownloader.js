'use strict'

const fs = require('fs')  
const Path = require('path')  
const axios = require('axios')

const Ammunition = require('../assets/items/Ammunition.json')
const Amulets_and_Necklaces = require('../assets/items/Amulets_and_Necklaces.json')
const Armors = require('../assets/items/Armors.json')
const Axe_Weapons = require('../assets/items/Axe_Weapons.json')
const Boots = require('../assets/items/Boots.json')
const Club_Weapons = require('../assets/items/Club_Weapons.json')
const Distance_Weapons = require('../assets/items/Distance_Weapons.json')
const Helmets = require('../assets/items/Helmets.json');
const Legs = require('../assets/items/Legs.json')
const Potions = require('../assets/items/Potions.json')
const Quivers = require('../assets/items/Quivers.json')
const Rings = require('../assets/items/Rings.json')
const Rods = require('../assets/items/Rods.json')
const Runes = require('../assets/items/Runes.json')
const Shields = require('../assets/items/Shields.json')
const Spellbooks = require('../assets/items/Spellbooks.json')
const Sword_Weapons = require('../assets/items/Sword_Weapons.json')
const Wands = require('../assets/items/Wands.json')

const ItemArrays = [
    Ammunition,
    // Amulets_and_Necklaces,
    // Armors, Axe_Weapons, 
    // Boots, 
    // Club_Weapons, 
    // Distance_Weapons, 
    // Helmets, 
    // Legs, 
    // Potions, 
    // Quivers, 
    // Rings,
    // Rods, 
    // Runes, 
    // Shields, 
    // Spellbooks, 
    // Sword_Weapons,
    // Wands
]

async function imageDownloader() {
    for (let itemArray of ItemArrays) {
        for (let item of itemArray) {
    
            const { image, name, type } = item;
            
            let nameWithoutSpace = '';
            for (let letter of name) {
                if (letter !== ' ') {
                    nameWithoutSpace += letter
                } else {
                    nameWithoutSpace += '_'
                }
            }
            // 1. Create folder for each item type if it does not exist
            const path = Path.resolve(__dirname, '..', 'assets', 'images', `${type}`)
            if (!fs.existsSync(path)){
                fs.mkdirSync(path);
            }
    
            // 2. Convert url to correct url (erase &amp;)
            const url = image.replace('&amp;', '&');
    
            // 3. Download image and put Item_Name.jpg
            await downloadImage(type, nameWithoutSpace, url)
        }
    }
}


async function downloadImage (itemType, itemName, url) {  
    try {
        const path = Path.resolve(__dirname, '..', 'assets', 'images', `${itemType}`, `${itemName}.jpg`)
        const writer = fs.createWriteStream(path)

        const response = await axios({
            url,
            method: 'GET',
            responseType: 'stream'
        })
    
        response.data.pipe(writer)
    
        return new Promise((resolve, reject) => {
            writer.on('finish', resolve)
            writer.on('error', reject)
        })
    } catch(e) {
        console.log(e)
    }
} 

imageDownloader()