import React, { useState, useEffect } from "react";
import {
	View,
	ActivityIndicator,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import * as SecureStore from "expo-secure-store";

import Container from "../components/layouts/Container";
import api from "../utils/api";
import PostItem from "../components/posts/PostItem";
import baseStyles from "../styles/common/baseStyles";
import PostList from "../components/posts/PostList";

interface IFeedScreenProps {
	navigation: {
		navigate: (screenName: string, data?: any) => void;
	};
}
export default (props: IFeedScreenProps) => {
	const [posts, setPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

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
				setPosts(res.data.memipedia_posts);
				setIsLoading(false);
			})
			.catch((err) => {
				console.log("error from posts", err);
				setIsLoading(false);
			});
	};

	return (
		<Container navigate={props.navigation.navigate}>
			<View>
				{isLoading ? (
					<ActivityIndicator />
				) : (
					<PostList posts={posts} navigate={props.navigation.navigate} />
				)}
			</View>
		</Container>
	);
};
