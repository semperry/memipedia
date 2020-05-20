import React, { useState } from "react";
import {
	Text,
	View,
	TextInput,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import Ionicons from "react-native-vector-icons/Ionicons";

import Container from "../components/layouts/Container";
import api from "../utils/api";
import PostList from "../components/posts/PostList";
import searchStyles from "../styles/stacks/posts/searchStyles";
import postFormStyles from "../styles/stacks/posts/postFormStyles";

const { searchFormContainer, searchTextInput, searchIcon } = searchStyles;

interface ISearchScreenProps {
	navigation: {
		navigate: (arg: string) => void;
	};
}
export default (props: ISearchScreenProps) => {
	const [query, setQuery] = useState("");
	const [posts, setPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [emptyQuery, setEmptyQuery] = useState(false);

	const handleSearch = async () => {
		const token = await SecureStore.getItemAsync("memipedia_secure_token");
		setIsLoading(true);
		setEmptyQuery(false);

		const params = { query };

		const headers = { Authorization: `Bearer: ${token}` };

		api
			.get("memipedia_queries", {
				params,
				headers,
			})
			.then((res) => {
				setIsLoading(false);
				if (res.data.memipedia_posts.length === 0) {
					setEmptyQuery(true);
				} else {
					setPosts(res.data.memipedia_posts);
				}
			})
			.catch((err) => {
				setIsLoading(false);
				alert("Error running query");
			});
	};

	const searchBar = (
		<View style={searchFormContainer}>
			<TextInput
				value={query}
				onChangeText={(val) => setQuery(val)}
				placeholder="Search for a meme"
				onSubmitEditing={handleSearch}
				style={searchTextInput}
			/>

			<TouchableOpacity style={searchIcon} onPress={handleSearch}>
				<Ionicons name="md-search" color="white" size={30} />
			</TouchableOpacity>
		</View>
	);

	const queryRenderer = () => {
		if (isLoading) {
			return <ActivityIndicator />;
		} else if (emptyQuery) {
			return (
				<View style={{ paddingRight: 15, paddingLeft: 15 }}>
					<Text style={{ color: "white" }}>
						There were no posts matching your search
					</Text>
				</View>
			);
		} else if (posts && posts.length > 0) {
			return <PostList posts={posts} navigate={props.navigation.navigate} />;
		}
	};

	return (
		<Container navigate={props.navigation.navigate}>
			{searchBar}

			{queryRenderer()}
		</Container>
	);
};
