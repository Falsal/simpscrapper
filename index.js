import * as cheerio from 'cheerio';
import fetch from 'node-fetch';
import fs from 'fs';


async function getDrivers(){

   try {

    const response = await fetch('https://www.formula1.com/en/drivers.html');
    const body = await response.text();
    const $ = cheerio.load(body);
    const test1 = $('body > div.site-wrapper > main > div.container.listing-header > fieldset > div > div > h1').text();
    console.log(test1); // result  -> "F1 Drivers 2022"
    const test2 = $('.f1-app-download__heading');
    console.log(test2.text()); // result  -> "Download the Official F1 App"

    // iterating over the items inside the class "listing-item--wrapper"
    let items= [];

    $('.listing-items--wrapper > .row > .col-12 ').map((i, el)=>{

        let rank = $(el).find('.rank').text();
        let points = $(el).find('.points > .f1-wide--s').text();
        let firstName = $(el).find('.listing-item--name > span:first').text();
        let lastName = $(el).find('.listing-item--name > span:last').text();
        let team = $(el).find('.listing-item--team').text();
        let pic = $(el).find('.listing-item--photo img').attr('data-src');

        items.push({rank, points, firstName, lastName, team, pic}); 
    })

    fs.writeFile('driversfile.json', JSON.stringify(items), function(err, data) {
        if(err) { return console.log(err)};
        if(data) console.log("drivers list saved in file : driversfile.json");
    })

   } catch (error) {
        console.error(error);
   }
}

getDrivers();