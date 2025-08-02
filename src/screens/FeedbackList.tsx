// src/screens/FeedbackList.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Button
} from 'react-native';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../services/firebase';
import FeedbackCard from '../components/FeedbackCard';
import { signOut } from 'firebase/auth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/stack';

type Props = NativeStackScreenProps<RootStackParamList, 'List'>;

type Feedback = {
  id: string;
  name: string;
  imageUrl: string | null;
  rating: number;
  comment: string;
  date: Date;   // agora já um Date
};

export default function FeedbackList({ navigation }: Props) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, 'feedbacks'),
      where('userId', '==', auth.currentUser?.uid)
    );

    const unsub = onSnapshot(q, snap => {
      const data: Feedback[] = snap.docs.map(doc => {
        const d = doc.data() as any;
        // converte para Date com fallback
        const date = d.createdAt?.toDate
          ? d.createdAt.toDate()
          : new Date(0);

        return {
          id: doc.id,
          name: d.name,
          imageUrl: d.imageUrl,
          rating: d.rating,
          comment: d.comment,
          date,
        };
      })
        // ordena por date decrescente
        .sort((a, b) => b.date.getTime() - a.date.getTime());

      setFeedbacks(data);
    });

    return () => unsub();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Feedbacks</Text>
      <FlatList
        data={feedbacks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <FeedbackCard
            name={item.name}
            imageUrl={item.imageUrl}
            rating={item.rating}
            comment={item.comment}
            date={item.date}
          />
        )}
        ListEmptyComponent={<Text>Sem feedbacks ainda.</Text>}
      />
      <View style={styles.footer}>
        <View style={styles.buttonWrapper}>
          <Button
            title="Novo Feedback"
            onPress={() => navigation.navigate('Form')}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            title="Sair"
            onPress={async () => {
              try {
                await signOut(auth);
                navigation.replace('Login');
              } catch (error) {
                console.log('Erro ao sair:', error);
              }
            }}
            color="#FB4C00"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
  footer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 4,
  },
});
