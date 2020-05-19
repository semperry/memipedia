import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, ScrollView } from "react-native";
import * as SecureStore from "expo-secure-store";

import Container from "../components/layouts/Container";
import api from "../utils/api";
import PostItem from "../components/posts/PostItem";
import baseStyles from "../styles/common/baseStyles";

interface IFeedScreenProps {
	navigation: {
		navigate: (arg: string) => void;
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
				console.log("res from posts", res.data);
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
					<ScrollView style={baseStyles.containerWithBottomTabBar}>
						{posts.map((post: any) => (
							<PostItem key={post.id} post={post} />
						))}
					</ScrollView>
				)}
			</View>
		</Container>
	);
};
