import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import * as SecureStore from "expo-secure-store";

import Container from "../components/layouts/Container";
import api from "../utils/api";

interface IFeedScreenProps {
	navigation: {
		navigate: (arg: string) => void;
	};
}
export default (props: IFeedScreenProps) => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		getPosts();
	}, []);

	const getPosts = async () => {
		const token = await SecureStore.getItemAsync("memipedia_secure_token");

		api
			.get("memipedia_posts", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				console.log("res from posts", res.data);
				setPosts(res.data.memipedia_posts);
			})
			.catch((err) => {
				console.log("error from posts", err);
			});
	};

	return (
		<Container navigate={props.navigation.navigate}>
			<Text>Feed Screen</Text>
			<View style={{ marginTop: 20 }}>
				<Text>{JSON.stringify(posts)}</Text>
			</View>
		</Container>
	);
};
