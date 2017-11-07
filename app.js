const Discord = require("discord.js");
const express = require('express');
const imgur = require('imgur');
const _ = require('lodash');
let app = express();
let port = process.env.PORT ? process.env.PORT : 8080;

app.get('/*', function(req, res){
  res.send('Hello World');
});

let server = app.listen(port, function(){
  console.log('Basic server is listening on port ' + port);
});

const client = new Discord.Client();

const config = require("./config.json");

imgur.setClientId(config.imgur);
imgur.setAPIUrl('https://api.imgur.com/3/');

client.on("ready", () => {
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
    client.user.setGame(`FON`);
  });
  
  client.on("guildCreate", (guild) => {
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    client.user.setGame(`FON`);
  });
  
  client.on("guildDelete", (guild) => {
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    client.user.setGame(`FON`);
  });

  client.on("message", (message) => {
      
      if(message.author.bot) return;
    
      if(message.content.indexOf(config.prefix) !== 0) return;
    
      const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
      const command = args.shift().toLowerCase();
      randomObjFromArray = (array) =>{
         return array[Math.floor(Math.random()*array.length)]
      }
      switch(command){
        case "random":
            imgur.getAlbumInfo(randomObjFromArray(config.Albums)).then(function(json) {
                const album = json.data;
                const img = randomObjFromArray(album.images);
                const catchPhrase = randomObjFromArray(config.catchPhrase);
                return  message.channel.send(`${catchPhrase}, ${img.link}`);                
            })
            .catch(function (err) {
                console.error(err.message);
            });
        break;
        
        case "axt":
            return  message.channel.send('https://i.imgur.com/BIUKUNh.png');                
        break;
        }

  })


client.login(config.API_KEY);
