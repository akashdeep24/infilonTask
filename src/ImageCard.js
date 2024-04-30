import { View, Text, StyleSheet, Switch, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { addImage, addDislikedImage } from "./store/imageSlice";
import { useDispatch, useSelector } from "react-redux";

const ImageCard = ({image}) => {
	const dispatch = useDispatch();
	const [dislike, setDislike] = useState(false);

	const toggleSwitch = (id) => {
		setDislike(true)
		dispatch(addDislikedImage(id));
	};
	return (
		<View style={styles.imageContainer}>
			<Image source={{ uri: image.item.url }} style={styles.image} />
			<View style={styles.detailsContainer}>
				<Text style={styles.id}>Id: {image.item.id}</Text>
				<Text style={styles.title}>Title:{image.item.title}</Text>
			</View>
            <Switch
				trackColor={{ false: "#767577", true: "#81b0ff" }}
				thumbColor={dislike ? "#f5dd4b" : "#f4f3f4"}
				ios_backgroundColor="#3e3e3e"
				onValueChange={() => toggleSwitch(image.item.id)}
				value={dislike}
                style={{position:'absolute', zIndex:1, alignSelf:'flex-end', marginHorizontal:20}}
			/>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		paddingVertical: 10,
		paddingHorizontal: 5,
	},
	imageContainer: {
		alignItems: "center",
		marginBottom: 10,
		padding: 10,
		backgroundColor: "#f0f0f0",
		borderRadius: 8,
		height: 280,
        position:'relative'
	},
	input: {
		width: "50%",
		height: 40,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
		marginBottom: 10,
	},
	image: {
		width: "100%",
		height: 200,
		borderRadius: 8,
	},
	detailsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
	},
	title: {
		fontSize: 16,
		width: "80%",
	},
	id: {
		fontSize: 14,
		color: "#555",
	},
});


export default ImageCard;
