import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import * as SecureStore from "expo-secure-store";

import Container from "../components/layouts/Container";
import api from "../utils/api";

interface ISearchScreenProps {
	navigation: {
		navigate: (arg: string) => void;
	};
}
export default (props: ISearchScreenProps) => {
	const [query, setQuery] = useState("");

	const handleSearch = async () => {
		const token = await SecureStore.getItemAsync("memipedia_secure_token");

		const params = { query };

		const headers = { Authorization: `Bearer: ${token}` };

		api
			.get("memipedia_queries", {
				params,
				headers,
			})
			.then((res) => console.log("res from query", res.data))
			.catch((err) => console.log("error in query", err));
	};

	const searchBar = (
		<View>
			<TextInput
				value={query}
				onChangeText={(val) => setQuery(val)}
				placeholderTextColor="white"
				placeholder="Search for a meme"
				onSubmitEditing={handleSearch}
			/>

			<TouchableOpacity style={{ marginTop: 20 }} onPress={handleSearch}>
				<Text style={{ color: "white" }}>Search</Text>
			</TouchableOpacity>
		</View>
	);

	return (
		<Container navigate={props.navigation.navigate}>
			<Text>Search Screen</Text>
			{searchBar}
		</Container>
	);
};
