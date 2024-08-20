import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TextComponent from '../texts/TextComponent';
import SectionComponent from './SectionComponent';
import StarComponent from './StarComponent';
import { colors } from '../../constants/colors';
import RowComponent from './RowComponent';
import { handleDate } from '../../utils/handleDate';

interface Props {
    userName: string;
    userImage: string;
    rating: number;
    reviewDate: Date;
    reviewText: string;
    arrImage: string[];
}

const UserReview: React.FC<Props> = ({ userName, userImage, rating, reviewDate, reviewText, arrImage }) => {
    const [isHelpful, setIsHelpful] = useState(false); 

    const toggleHelpful = () => {
        setIsHelpful(!isHelpful);
    };

    const isNewReview = handleDate.handleIsNewProduct(reviewDate);

    const formattedDate = isNewReview 
        ? "New" 
        : reviewDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        }).replace(/(\d{1,2}) (\w{3}) (\d{4})/, '$2 $1, $3');

    return (  
        <SectionComponent style={styles.container}>
            <SectionComponent style={styles.imageContainer}>
                <Image source={{ uri: userImage }} style={styles.userImage} />
            </SectionComponent>
            <SectionComponent style={styles.header}>
                <SectionComponent style={styles.userInfo}>
                    <TextComponent style={styles.userName} text={userName} />
                    <RowComponent style={styles.row}>
                        <StarComponent star={rating} />
                        <TextComponent style={styles.reviewDate} text={formattedDate}/>
                    </RowComponent> 
                </SectionComponent>
            </SectionComponent>
            <TextComponent style={styles.reviewText} text={reviewText} />
            <FlatList
                data={arrImage}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Image source={{ uri: item }} style={styles.reviewImage} />
                )}
                contentContainerStyle={styles.imageList}
            />
            <TouchableOpacity style={styles.helpfulButton} onPress={toggleHelpful}>
                <TextComponent style={styles.helpfulText} text='Helpful' />
                <Icon
                    name="thumbs-up"
                    size={16}
                    color={isHelpful ? colors.Secondary_Text_Color : colors.Star_Color}
                    style={{ marginLeft: 4 }}
                />
            </TouchableOpacity>
        </SectionComponent>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0,
        backgroundColor: colors.White_Color,
        borderRadius: 8,
        padding: 22,
        marginVertical: 8,
    },
    imageContainer: {
        position: 'relative',
        marginBottom: 10,
    },
    userImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        position: 'absolute',
        top: -40,
        left: -40,
    },
    header: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    userInfo: {
        flex: 0,
    },
    userName: {
        color: colors.Text_Color,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    reviewDate: {
        fontSize: 12,
        color: colors.Secondary_Text_Color,
    },
    reviewText: {
        fontSize: 14,
        color: colors.Text_Color,
        marginBottom: 12,
        lineHeight: 20,
    },
    reviewImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginRight: 10,
    },
    imageList: {
        marginBottom: 12,
    },
    helpfulButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    helpfulText: {
        marginRight: 5,
        fontSize: 14,
        color: colors.Secondary_Text_Color,
    },
});

export default UserReview;
