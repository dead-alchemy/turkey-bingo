import { useEffect, useState } from "react";

// 1. import `ChakraProvider` component
import {
	ChakraProvider,
	Heading,
	Box,
	TableContainer,
	Table,
	Thead,
	Tr,
	Td,
	Tbody,
	Button,
} from "@chakra-ui/react";

import { options } from "./rawList";

function App() {
	const [card, setCard] = useState([]);

	useEffect(() => {
		const array = [];
		const newOptions = Array.from(options);

		const oldMaybe = JSON.parse(localStorage.getItem("card"));
		if (oldMaybe.length === 25) {
			setCard(oldMaybe);
		} else {
			for (let index = 0; index < 25; index++) {
				if (index === 12) {
					array.push({
						text: "Free",
						checked: true,
					});
				} else {
					const newIndex = Math.floor(
						Math.random() * newOptions.length
					);
					const newItem = newOptions[newIndex];

					array.push({
						text: newItem,
						checked: false,
					});
					newOptions.splice(newIndex, 1);
				}
			}
			localStorage.setItem("card", JSON.stringify(array));
			setCard(array);
		}
	}, []);

	const toggleClicked = (index) => {
		const newArray = [...card];

		newArray[index].checked = !newArray[index].checked;
		localStorage.setItem("card", JSON.stringify(newArray));
		setCard(newArray);
	};

	const clearCard = () => {
		const array = [];
		const newOptions = Array.from(options);
		for (let index = 0; index < 25; index++) {
			if (index === 12) {
				array.push({
					text: "Free",
					checked: true,
				});
			} else {
				const newIndex = Math.floor(Math.random() * newOptions.length);
				const newItem = newOptions[newIndex];

				array.push({
					text: newItem,
					checked: false,
				});
				newOptions.splice(newIndex, 1);
			}
		}
		localStorage.setItem("card", JSON.stringify(array));
		setCard(array);
	};

	return (
		<ChakraProvider>
			<title>Turkey Bingo</title>
			<Heading textAlign={"center"}>Turkey Bingo</Heading>
			<Box
				display={"grid"}
				gridTemplateColumns={"repeat(5, 1fr)"}
				gridTemplateRows={"repeat(5, 1fr)"}
			>
				{card.map((element, index) => {
					return (
						<Box
							key={index}
							py={".5rem"}
							display={"flex"}
							justifyContent={"center"}
							alignItems={"center"}
							backgroundColor={element.checked && "yellow"}
							onClick={() => {
								toggleClicked(index);
							}}
						>
							<Box textAlign={"center"}>{element.text}</Box>
						</Box>
					);
				})}
			</Box>

			<Box py={".5rem"}>
				<Button
					my={".5rem"}
					float={"right"}
					colorScheme={"red"}
					onClick={() => clearCard()}
				>
					Clear Card
				</Button>
			</Box>
		</ChakraProvider>
	);
}

export default App;
