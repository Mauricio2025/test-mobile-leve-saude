// src/components/FeedbackCard.tsx
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Rating from './Rating';

type Props = {
  name: string;
  imageUrl?: string | null;
  rating: number;
  comment: string;
  date: Date;
};

export default function FeedbackCard({ name, imageUrl, rating, comment, date }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.placeholderAvatar]}>
            <Text style={styles.initial}>{name.charAt(0)}</Text>
          </View>
        )}
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.date}>{date.toLocaleString()}</Text>
        </View>
      </View>
      <Rating value={rating} onChange={() => {}} size={18} />
      <Text style={styles.comment}>{comment}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 12,
  },
  placeholderAvatar: {
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initial: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#324FBE',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
  comment: {
    marginTop: 8,
    fontSize: 14,
    color: '#333',
  },
});
