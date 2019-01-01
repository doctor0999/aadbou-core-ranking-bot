// this code was given to me by 1988_YumChocolate from the ROBLOX API Server, all credits (as far as I know) go to him



const roblox = require('noblox.js')
const Discord = require('discord.js')
const client = new Discord.Client();
var token = "NDU2Mzc5NzY3MjI3Mjg1NTA2.DwyodQ.YCbNiRtRrHdKuTR-NAOXEh-KD0E";

client.login(token)


var cookie = "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_0783CB5CAEC7CDC8BD1EB4E232F2946878CFF8804EB64FF4C694C60D46D2A97E79F8E836852C13BEF5E1FE1F1BBDEA4C58F0592234435FFA0FB4FC167EE5FAB1F4EAC0B83C39300FD251DDA3D6A24993534DC451024A22464BD159296A0B7EFF446809ED6B5751F818DCE19E058FB5F127CB4406A06F31FDAAE5BEF6816629E6074683A99EB6AEEC0E3E417DAAB64FB21112688D2C805FBFFC69C613C718090CFCDFFD73A9A151A45BAD039A79C514977BA69A3B1782C6859F0C3A47629DE343406367A6511307226AAC42F4C2BE8746596BD39FF3977FF9A27660B9784FB95B7779E7E7292AB4B409DD691C9ACEDF081745361773FFF8FCD8033499AC94BE1189446DAB880E1655A12DBE19C6ED09BB33A2528879802A4198CE41736126594B57552B20";
var prefix = 'a!';
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