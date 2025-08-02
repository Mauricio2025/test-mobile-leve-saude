import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../services/firebase';
import Rating from '../components/Rating';
import { useAuth } from '../contexts/AuthContext';
import Toast from 'react-native-toast-message';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/stack';

type Props = NativeStackScreenProps<RootStackParamList, 'Form'>;

export default function FeedbackForm({ navigation }: Props) {
  const { profile } = useAuth();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!profile) {
      return Toast.show({ type: 'error', text1: 'Usuário não autenticado.' });
    }
    if (rating < 1) {
      return Toast.show({ type: 'error', text1: 'Selecione uma nota de 1 a 5 estrelas.' });
    }
    if (comment.length < 10) {
      return Toast.show({ type: 'error', text1: 'Comentário mínimo de 10 caracteres.' });
    }

    try {
      setLoading(true);

      await addDoc(collection(db, 'feedbacks'), {
        userId: auth.currentUser?.uid,
        name: profile.name,
        rating,
        comment,
        createdAt: serverTimestamp(),
      });

      Toast.show({ type: 'success', text1: 'Feedback enviado com sucesso!' });
      setRating(0);
      setComment('');
      setTimeout(() => navigation.replace('List'), 1000);
    } catch (err) {
      Toast.show({ type: 'error', text1: (err as Error).message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.wrapper}>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Enviando feedback...</Text>
        </View>
      )}
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Envie seu feedback</Text>

        <View style={styles.field}>
          <Text style={styles.label}>Nome</Text>
          <Text style={styles.value}>{profile?.name}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Nota</Text>
          <Rating value={rating} onChange={setRating} />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Comentário</Text>
          <TextInput
            style={[styles.input, styles.textarea]}
            placeholder="Escreva seu comentário..."
            value={comment}
            onChangeText={setComment}
            multiline
            placeholderTextColor="#888"
          />
        </View>

        <View style={styles.buttonWrapper}>
          <Button title="Enviar Feedback" onPress={handleSubmit} disabled={loading} color="#FB4C00" />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(252, 249, 236, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  loadingText: { marginTop: 8, fontSize: 16, color: '#191970' },

  container: {
    backgroundColor: '#FCF9EC',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#191970',
    marginBottom: 16,
    textAlign: 'center',
  },
  field: { marginBottom: 16 },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#FB4C00',
    borderWidth: 1,
    color: '#191970',
  },
  input: {
    borderWidth: 1,
    borderColor: '#FB4C00',
    borderRadius: 6,
    padding: 12,
    color: '#333333',
    backgroundColor: '#fff',
  },
  textarea: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonWrapper: {
    marginTop: 8,
  },
});
