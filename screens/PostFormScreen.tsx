import React from "react";
import { View, Text } from "react-native";

import PostImagePicker from "../components/posts/PostImagePicker";

interface IPostFormScreenProps {
	navigation: {
		navigate: (arg: string) => void;
	};
}
export default (props: IPostFormScreenProps) => {
	return (
		<View style={{ height: "100%" }}>
			<Text>Form Screen</Text>

			<View style={{ marginTop: 40, height: 100 }}>
				<PostImagePicker />
			</View>
		</View>
	);
};
