import React from "react";

const GameMenu = () => {

	return (
		<div id="GameMenu">
			<a div="start" href="/matchmaking/ranked"><button>Ranked Game</button></a>
			<a div="start" href="/matchmaking/quickplay"><button>Quick Play</button></a>
			<a div="start" href="/matchmaking/footpong"><button>Footpong</button></a>
			<div className="liveGames">
			<div className='liveGame1'>Game1</div>
			<div className='liveGame2'>Game2</div>
			<div className='liveGame3'>Game3</div>
			<div className='liveGame4'>Game4</div>
			<div className='liveGame5'>Game5</div>
			<div className='liveGame6'>Game6</div>
			</div>
		</div>

	);
};

export default GameMenu;
