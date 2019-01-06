// this code was given to me by 1988_YumChocolate from the ROBLOX API Server, all credits (as far as I know) go to him



const roblox = require('noblox.js')
const Discord = require('discord.js')
const client = new Discord.Client();
var token = process.env.token;

client.login(token)


var cookie = "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_5D98CF6D3072C7B544CCD7713B9D4715B0AFA2092A4905D5E7FF53311625D0D37445D8204F7206EF81CA69825EFB601DA77D090250F734C81C4A9FEE4A75DFA1A6468A165F6F4AFF00883AE57C87B453B657510D43BA608FE04F1D09BDA9A539E4D9D6A863F2B2DB508AAD4F2E2EA9ABECF99340F927CB18A548C92E15011C32FCC7C0D557140DE7E40D2F5A16800B82977FEDD16D67E72CA863DF631D0DCB0408B4BC1A3C882C16802B3CD6183679109C6BF5D02009A4A47329318B01C3DB28A4A6C4B5C0C61087A7A6DA1BF403CC8F43974103EC0074BF77314DF8D93CE6F02DAC2C5C03E68C8358F6DEAFC20FF98B062A8E9C067BD337B9373E986C4FFA537E05113953B573DD8573637769923EA599A518ECF0FECA86DC02E17BCADC3DC1F1A9F8ED";
var prefix = '!';
var groupId = 4404346;
var maximumRank = 253;

function login() {
    return roblox.cookieLogin(cookie);
}

login() // Log into ROBLOX
    .then(function() { // After the function has been executed
        console.log('Logged in.') // Log to the console that we've logged in
    })
    .catch(function(error) { // This is a catch in the case that there's an error. Not using this will result in an unhandled rejection error.
        console.log(`Login error: ${error}`) // Log the error to console if there is one.
    });
 
function isCommand(command, message){
    var command = command.toLowerCase();
    var content = message.content.toLowerCase();
    return content.startsWith(prefix + command);
}
 
client.on('message', (message) => {
    if (message.author.bot) return; // Dont answer yourself.
    var args = message.content.split(/[ ]+/)
   
    if(isCommand('rank', message)){
       if(!message.member.roles.some(r=>["Rank Commander"].includes(r.name)) ) // OPTIONAL - Checks if the sender has the specified roles to carry on further
        return message.reply("You can't use this command.");
        var username = args[1]
        var rankIdentifier = Number(args[2]) ? Number(args[2]) : args[2];
        if (!rankIdentifier) return message.channel.send("Please enter a rank");
        if (username){
            message.channel.send(`Checking ROBLOX for ${username}`)
            roblox.getIdFromUsername(username)
            .then(function(id){
                roblox.getRankInGroup(groupId, id)
                .then(function(rank){
                    if(maximumRank <= rank){
                        message.channel.send(`${id} is rank ${rank} and not promotable.`)
                    } else {
                        message.channel.send(`${id} is rank ${rank} and promotable.`)
                        roblox.setRank(groupId, id, rankIdentifier)
                        .then(function(newRole){
                            message.channel.send(`Changed rank to ${newRole.Name}`)
                        }).catch(function(err){
                            console.error(err)
                            message.channel.send("Failed to change rank.")
                        });
                    }
                }).catch(function(err){
                    message.channel.send("Couldn't get that player in the group.")
                });
            }).catch(function(err){
                message.channel.send(`Sorry, but ${username} doesn't exist on ROBLOX.`)
           });
       } else {
           message.channel.send("Please enter a username.")
       }
       return;
	   
   }
})