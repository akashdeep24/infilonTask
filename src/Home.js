import {
	View,
	Text,
	FlatList,
	Image,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	StatusBar,
	Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addImage, addDislikedImage } from "./store/imageSlice";
import ImageCard from "./ImageCard";
const Home = () => {
	const dispatch = useDispatch();
	const [searchedImage, setSearchedimage] = useState([]);
	const [id, setId] = useState("");
	const [refreshing, setRefreshing] = useState(false);
	const refreshedNum = useSelector((state)=>state.refreshedNum)
	const images = useSelector((state) => state.images)
	useEffect(() => {
		fetchImages();
	}, []);

	const fetchImages = async () => {
		setRefreshing(true);
		try {
			const response = await fetch(
				"https://jsonplaceholder.typicode.com/photos/"
			);
			if (!response) {
				throw new Error("Failed to fetch images");
			}
			const data = await response.json();
			dispatch(addImage(data.slice(0,500)))
		} catch (error) {
			console.error(error);
		}finally {
			setRefreshing(false);
		  }
	};
	const handleChangeText = (text) => {
		setSearchedimage([]);
		setId(text);
	};

	const handleButtonPress = () => {
		const searchedImage = images.filter((item) => String(item.id) === id);
		if (searchedImage) {
			setSearchedimage(searchedImage);
		} else {
			Alert.alert(`no image found with Id ${id}`);
		}
	};
	const renderItem = (image) => {
		return (
			<ImageCard image={image}/>
		);
	};

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-evenly",
				}}>
				<TextInput
					style={styles.input}
					placeholder="Type id..."
					onChangeText={handleChangeText}
					value={id}
				/>
				<TouchableOpacity
					onPress={handleButtonPress}
					style={{
						backgroundColor: "steelblue",
						height: 40,
						borderRadius: 3,
						padding: 10,
						marginBottom: 10,
					}}>
					<Text>Search</Text>
				</TouchableOpacity>
			</View>
			{searchedImage.length > 0 ? (
				<FlatList
					data={searchedImage}
					renderItem={renderItem}
					keyExtractor={(item) => item?.id?.toString()}
					contentContainerStyle={styles.container}
				/>
			) : (
				<FlatList
					refreshing={refreshing}
					data={images}
					renderItem={renderItem}
					keyExtractor={(item) => item?.id?.toString()}
					contentContainerStyle={styles.container}
					onRefresh={fetchImages}
				/>
			)}
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
		height: 250,
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

export default Home;
