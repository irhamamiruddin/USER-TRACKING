import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import IO from "./lib/socketio";
import { Input, Space, Button } from "antd";
import checkIdle from "./hooks/checkIdle";

function App() {
	// State
	const [lastActivityTime, setLastActivityTime] = useState<any>(null);
	const [user, setUser] = useState<any>(null);

	const idle = checkIdle();

	// // Socket IO
	// const socketController = () => {
	// 	IO.on("connect", () => {
	// 		setInterval(() => {
	// 			const start = Date.now();

	// 			IO.emit("ping", () => {
	// 				const duration = Date.now() - start;
	// 			});
	// 		}, 1000);
	// 	});
	// };

	useEffect(() => {
		// When the application starts, set the last activity time to the current time
		setLastActivityTime(Date.now());
	}, []);

	// If user is idle, send a message to the server
	useEffect(() => {
		console.log("idle", idle);
		if (idle && user) {
			IO.emit("user-idle", user);
		}
	}, [idle]);

	// // When Last Activity Time is set, set timeout to check for idle
	// useEffect(() => {
	// 	const idleThreshold = 5000; // 5 seconds in milliseconds

	// 	const timeout = setTimeout(() => {
	// 		console.log("User is idle");
	// 		setIdle(true);
	// 	}, idleThreshold);

	// 	return () => clearTimeout(timeout);
	// }, [lastActivityTime]);

	// // Reset idle state when the user is active
	// const resetIdle = () => {
	// 	console.log("Event fired");
	// 	setIdle(false);
	// 	// Set Last Activity Time whenever the user is active
	// 	setLastActivityTime(Date.now());
	// };

	// // Check whether the user is idle or not from mousemove and keypress events
	// useEffect(() => {
	// 	document.addEventListener("mousemove", resetIdle);
	// 	document.addEventListener("keypress", resetIdle);

	// 	return () => {
	// 		document.removeEventListener("mousemove", resetIdle);
	// 		document.removeEventListener("keypress", resetIdle);
	// 	};
	// }, []);

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>User Tracking</p>
				<div className="user-input">
					<Space.Compact style={{ width: "100%" }}>
						<Input
							placeholder="Enter your name"
							value={user}
							onChange={(e: any) => {
								setUser(e.target.value);
							}}
						/>
						{/* <Button type="primary">Submit</Button> */}
					</Space.Compact>
				</div>
				{user && <div className="user">Hi, {user}</div>}
				<div>
					{idle ? <p>You are idle.</p> : <p>You are active.</p>}
				</div>
			</header>
		</div>
	);
}

export default App;
