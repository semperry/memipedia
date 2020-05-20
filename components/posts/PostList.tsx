import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";

import PostItem from "./PostItem";
import baseStyles from "../../styles/common/baseStyles";

interface IPostListProps {
	posts: any;
	navigate: (screenName: string, data: any) => void;
}

export default (props: IPostListProps) => {
	const handleItemPress = (post: any) => {
		props.navigate("PostDetail", { post });
	};

	const postRenderer = () => {
		if (props.posts.length > 0) {
			return props.posts.map((post: any) => (
				<TouchableOpacity key={post.id} onPress={() => handleItemPress(post)}>
					<PostItem post={post} />
				</TouchableOpacity>
			));
		} else {
			return null;
		}
	};

	return (
		<ScrollView style={baseStyles.containerWithBottomTabBar}>
			{postRenderer()}
		</ScrollView>
	);
};
