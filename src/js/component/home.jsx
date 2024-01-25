import React from "react";
import { Todolist } from "./Todolist";


//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	return (
		<div className="text-center">
			<Todolist />
		</div>
	);
};

export default Home;
