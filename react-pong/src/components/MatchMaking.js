import React, { useEffect, useState } from "react";
import { socket } from "../App";
import Error from "./Error";

const MatchMaking = (props) => {
	const [username, setUsername] = useState("test");
	const [opponent, setOpponent] = useState(null);
	const [opponentPic, setOpponentPic] = useState("https://toppng.com/uploads/preview/oint-interrogation-point-d-interrogation-115628635697ubaj1toa2.png");
	const [queue, setQueue] = useState(false);


	useEffect(() => {
		if (['ranked','quickplay','footpong'].indexOf(props.match.params.matchtype) >= 0) {
		if (!username)
			setUsername(prompt("enter username"))
		else {
			socket.emit('startMatchmaking', {
				matchtype: props.match.params.matchtype,
				username: username,
			});}}
	}, [username, props.match.params.matchtype])

	useEffect(() => {
		if (opponent)
				setOpponentPic("https://image.shutterstock.com/image-vector/found-grunge-rubber-stamp-on-260nw-197028626.jpg")
	}, [opponent])

	useEffect(() => {
		console.log('socket.id=',socket.id);
	}, [])

	socket.on("opponentFound", (socket) => {
		setOpponent(socket.name);
	});

	socket.on("inQueue", (socket) => {
		setQueue(true);
	});
	useEffect(() => {
		if (queue)
			console.log("Subscribed to queue");
	}, [queue]);

	if (['ranked','quickplay','footpong'].indexOf(props.match.params.matchtype) < 0) {
		return (
			<div id="Error">
				<Error />
			</div>
		);}
	return (
		<div id="GameMenu">
			<div id="profile1">
				<img src= "https://static-s.aa-cdn.net/img/ios/899287106/45820b5b6bba46c7fcd853a46d554a34?v=1" alt="you" width="40vw" height="40vh"/>
				{ username }
			</div>
			<div id="profile1">
				<img src= {opponentPic} alt="opponent" width="40vw" height="40"/>
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
