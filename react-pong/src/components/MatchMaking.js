import React, { useEffect, useState } from "react";
import { socket } from "../App";

const MatchMaking = (props) => {
	const [username/*, setUsername*/] = useState("test");
	const [opponent/*, setOpponent*/] = useState(null);

	//to change with real username and real picture below
	// useEffect(() => {
	// 	if (!username)
	// 		setUsername(prompt("enter username"))
	// 	else {
	// 		socket.emit('startMatchmaking', {
	// 			matchtype: "ranked",
	// 			username: username,
	// 		});}
	// }, [username])
	// useEffect(() => {
	// }, [opponent])
	useEffect(() => {
		console.log('socket.id=',socket.id);
	}, [socket])
	// socket.on('receiveOpponent')
	console.count('render');
	return (
		<div id="GameMenu">
			<div id="profile1">
				<img src= "https://static-s.aa-cdn.net/img/ios/899287106/45820b5b6bba46c7fcd853a46d554a34?v=1" alt="you" width="40vw" height="40vh"/>
				{ username }
			</div>
			<div id="profile1">
				<img src= "https://toppng.com/uploads/preview/oint-interrogation-point-d-interrogation-115628635697ubaj1toa2.png" alt="opponent" width="40vw" height="40vh" />
				{ opponent ? opponent : "???" }
			</div>
		</div>

	);
};

export default MatchMaking;

// export default class MatchMaking extends React.Component {
//   render() {
//     return(
//       <div>
//         <h2>{this.props.match.params.matchtype}</h2>
//       </div>
//     )
//   }
// }
