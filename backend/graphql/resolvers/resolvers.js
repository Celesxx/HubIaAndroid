const Player = require("../../components/models/player.model.js");

const resolvers = {
        players: async () => await Player.find(),
        player: async ({_id}) => await Player.findById(_id),

        createPlayer: async ({input}) => {
            const player = new Player({
                input,
            })
            const newPlayer = await player.save();
            return newPlayer;
        },

        // updateScorePlayer: async ({_id, score}) => await Player.findByIdAndUpdate(_id, {score: score}),
        updateUsernamePlayer: async ({_id, username}) => await Player.findByIdAndUpdate(_id, {username: username}),
        updatePlayer: async ({_id, input}) => await Player.findByIdAndUpdate(_id, {username: input.username, score: input.score}),
        deletePlayer: async ({_id}) => await Player.findByIdAndDelete(_id),
};

module.exports = resolvers;